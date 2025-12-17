const { join } = require("path");
const { EntitySchema } = require("typeorm");

const TicketEntity = new EntitySchema({
  name: "Ticket",
  tableName: "tickets",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    title: {
      type: "varchar",
      nullable: false,
    },
    description: {
      type: "text",
      nullable: false,
    },
    status: {
      type: "varchar",
      default: "OPEN", // Statuts existants : OPEN, IN_PROGRESS, DONE
    },
    priority: {
      type: "varchar",
      default: "LOW", // Priorités existantes : LOW, HIGH
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: true,
      inverseSide: "tickets",
    },
    tags: {
      type: "many-to-many",
      target: "Tag",
      inverseSide: "tickets",
    },
  },
});

module.exports = TicketEntity;
