import { Server } from 'socket.io'
import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
    setup(options, nuxt) {
        nuxt.hook('listen', async (server) => {
            const io = new Server(server)

            nuxt.hook('close', () => io.close())

            let historyMessages: any = [];

            io.on('connection', (socket) => {
                console.log('Novo cliente conectado')

                // Evento para lidar com o envio de mensagens
                io.emit('historyMessages', historyMessages);

                socket.on('message', (message) => {
                    console.log('Mensagem recebida:', message);
                    historyMessages = [...historyMessages, message]
                    // Você pode adicionar lógica para enviar a mensagem para todos os clientes conectados
                    io.emit('message', message);
                });

                // Evento para lidar com a desconexão de um cliente
                socket.on('disconnect', () => {
                    console.log('Cliente desconectado');
                });
            })
        })
    }
})