const lblNuevoTicket = document.querySelector('#lblNuevoTicket')
const btnCrear = document.querySelector('button');

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    btnCrear.disabled=false;

});
socket.on('ultimo-ticket', (ultimo) => {
    // console.log('Desconectado del servidor');
    if(ultimo===0){
        lblNuevoTicket.innerText = 'No hay Tickets';
    }else{
        lblNuevoTicket.innerText = 'Ticket ' + ultimo;
    }
    
});
socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnCrear.disabled = true;
});


btnCrear.addEventListener('click', () => {

    socket.emit('siguiente-ticket', null, (ticket) => {
        lblNuevoTicket.innerText=ticket;
    });

});