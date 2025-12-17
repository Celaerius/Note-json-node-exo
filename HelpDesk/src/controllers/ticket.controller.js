const TicketService = require('../services/ticket.service');
const { asyncHandlers } = require('../utils/asyncHandlers');

class TicketController {

    static getAllTickets = asyncHandlers(async (req, res) => {
        const tickets = await TicketService.getAllTickets();
        res.status(200).json(tickets);
    });

    static getTicketById = asyncHandlers(async (req, res) => {
        const ticket = await TicketService.findById(parseInt(req.params.id, 10));
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.status(200).json(ticket);
    });

    static createTicket = asyncHandlers(async (req, res) => {
        const newTicket = await TicketService.createTicket(req.body);
        res.status(201).json(newTicket);
    });

    static updateTicket = asyncHandlers(async (req, res) => {
        const updatedTicket = await TicketService.updateTicket(parseInt(req.params.id, 10), req.body);
        res.status(200).json(updatedTicket);
    });
}

module.exports = TicketController;