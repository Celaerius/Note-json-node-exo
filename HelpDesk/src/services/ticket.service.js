const { ValidationError, NotFoundError } = require('../errors/ApiErrors');
const AppDataSource = require('../config/data-source');

class TicketService {

    //Récupérer les data de ticket
    static get repository() {
        return AppDataSource.getRepository('Ticket');
    }

    //Récupérer les data de user
    static get userRepository() {
        return AppDataSource.getRepository('User');
    }

    //Méthode pour GET tous les tickets
    static async getAllTickets() {
        return await this.repository.find({ relations: ['user'] });
    }

    //Méthode pour GET un ticket par ID
    static async findById(id) {
        return await this.repository.findOne({
            where: { id },
            relations: ['user'],
        });
    }

    //Méthode pour créer un ticket
    static async createTicket(ticket) {
        let userData = {};

        console.log("ticket service:", ticket);

        if (ticket.userId) {
            const user = await this.userRepository.findOneBy({ id: ticket.userId });
            if (!user) {
                throw new NotFoundError(`Utilisateur avec l'ID ${ticket.userId} non trouvé`);
            }
            userData = { user };
        }

        const newTicket = this.repository.create({
            title: ticket.title,
            description: ticket.description,
            status: ticket.status || 'OPEN',
            tags: ticket.tags ? await this.tagRepository.findByIds(ticket.tags) : [],
        });

        return await this.repository.save(newTicket);
    }

    static async updateTicket(id, updatedData) {
        const ticket = await this.repository.findOneBy({ id });

        if (!ticket) {
            throw new NotFoundError(`Ticket avec l'ID ${id} non trouvé`);
        }

        Object.assign(ticket, updatedData);

        return await this.repository.save(ticket);

    }

}

module.exports = TicketService;
