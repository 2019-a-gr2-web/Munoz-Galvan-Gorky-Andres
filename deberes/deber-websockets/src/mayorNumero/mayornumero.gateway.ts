import {SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets'
import {Client} from "socket.io";

@WebSocketGateway(3001,
    {namespace: '/websockets'
    })
export class MayornumeroGateway {
    @WebSocketServer() server;

    @SubscribeMessage('jugar')
    findAll(client:Client | any,data:any){
        const numeroJugadores = [];
        console.log('Nos hacen la petición');
        client.broadcast.emit('ingresoNumero',data);
        return 'Ingresaste el numero '+ data;
    }
}