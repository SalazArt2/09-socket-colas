// ! const { TicketControls } = require("../models");

const TicketControl = require("../models/ticketControl");

const ticketControl = new TicketControl();

const socketController = (socket) => {
    socket.emit('ultimo-ticket', ticketControl.ultimo);
    socket.emit('estado-actual', ticketControl.ultimos4);
    socket.emit('tickets-pendientes', ticketControl.tickets.length);
    socket.on('disconnect', () => {
    });

    socket.on('siguiente-ticket', (payload, callback) => {

        const siguiente = ticketControl.siguiente();
        callback(siguiente);
        //TODO Notificar que hay un nuevo ticket pendiente de asignar
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);
    })
    socket.on('atender-ticket', ({escritorio}, callback) => {
        if(!escritorio){
            callback({
                ok:false,
                msg:'El escritorio es obligatorio'
            });
        }
        const ticket = ticketControl.atenderTicket(escritorio);
        if(!ticket){
            callback({
                ok: false,
                msg: 'No hay tickets pendientes'
            });
        }else{
            callback({
                ok: true,
                ticket
            });
        }
        //TODO Notificar que hay un nuevo ticket pendiente de asignar
        socket.emit('tickets-pendientes', ticketControl.tickets.length);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);
        socket.broadcast.emit('estado-actual', ticketControl.ultimos4);
    })

}



module.exports = {
    socketController
}

