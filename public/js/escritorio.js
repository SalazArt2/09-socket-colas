// - Referencias HTML
const lblEscritorio = document.querySelector('h1')
const btnAtender = document.querySelector('button');
const lblAtendiendo = document.querySelector('small');
const divAlert = document.querySelector('.alert');
const spanAlert = document.querySelector('span');
const lblPendientes = document.querySelector('#lblPendientes');
const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio')
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;

divAlert.style.display = 'none'

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    btnAtender.disabled = false;

});
socket.on('tickets-pendientes', (cola) => {
    lblPendientes.innerText = cola;
});
socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAtender.disabled = true;
});


btnAtender.addEventListener('click', () => {

    socket.emit('atender-ticket', { escritorio }, ({ ok, msg, ticket }) => {
        if (!ok) {
            lblAtendiendo.innerText = `Nadie`;
            spanAlert.innerText = msg;
            return divAlert.style.display = '';
        }

        lblAtendiendo.innerText = `Ticket ${ticket.numero}`;

    });

});