require("reflect-metadata");
const express = require("express");
const helmet = require("helmet");
const authRoutes = require("./routes/auth.routes");
const ticketRoutes = require("./routes/ticket.routes");
const passport = require("passport");
const { middlewareLogger } = require("./middlewares/logger.middleware");
const { errorHandler } = require("./errors/errorHandler");
const cors = require("cors");
const hpp = require("hpp");
const { globalLimiter } = require("./middlewares/rateLimiter");
const sanitizerMiddleware = require("./middlewares/sanitizer");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const app = express();

// --- CONFIGURATION MORGAN POUR LOGS EN FICHIER (PRODUCTION) ---
// Création d'un stream d'écriture pour le fichier access.log en mode 'append' (ajout)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "..", "access.log"),
  { flags: "a" }
);

// En développement : logs dans la console
// En production : logs dans le fichier access.log
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined", { stream: accessLogStream }));
} else {
  app.use(morgan("dev"));
}

// --- CORS ---

const whitelist = ["http://localhost:5500", "http://localhost:4200", "null"]; // "null" pour fichiers HTML locaux
const corsOptions = {
  origin: function (origin, callback) {
    // Cas 1 : L'origine est dans la whitelist -> OK
    // Cas 2 : !origin signifie requête serveur-à-serveur (Postman, curl) ou fichier local -> OK
    // Pour être ultra-strict et bloquer Postman, retirez "|| !origin"
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Bloqué par CORS : Domaine non autorisé"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// --- SÉCURITÉ ---
// Configuration Helmet avec CSP désactivée pour le TP XSS
app.use(helmet({
  contentSecurityPolicy: false, // DÉSACTIVÉ pour la démonstration XSS
}));
app.use(cors(corsOptions));
app.use(globalLimiter);

// --- MIDDLEWARES ---

app.use(express.json());
app.use(hpp());
app.use(sanitizerMiddleware);
app.use(middlewareLogger);

// Servir les fichiers statiques (pour le HTML de test)
//app.use(express.static('src'));


app.use(passport.initialize());
require("./config/passport")(passport);

// --- ROUTES TEMPORAIRES POUR TP XSS (À RETIRER EN PRODUCTION) ---
// Stockage temporaire en mémoire (pour la démo)
// const messages = [];

// app.get('/messages', (req, res) => res.json(messages));

// app.post('/messages', (req, res) => {
//   // Faille : On stocke directement ce qu'on reçoit sans nettoyer
//   const { content } = req.body;
//   messages.push({ content, date: new Date() });
//   res.json({ status: 'success' });
// });
// --- FIN ROUTES TEMPORAIRES ---

app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);

app.use(errorHandler);

module.exports = app;
