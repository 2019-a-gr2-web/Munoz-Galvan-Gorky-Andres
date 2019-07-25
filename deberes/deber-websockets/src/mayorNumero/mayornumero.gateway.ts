import {SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets'
import {Client} from "socket.io";

@WebSocketGateway(3001,
    {namespace: '/websockets'
    })
export class MayornumeroGateway {
    @WebSocketServer() server;

    @SubscribeMessage('holaMundo')
    findAll(client:Client | any,data:any){
        console.log(data);
        console.log('Nos hacen la petición');
        console.log(this.server);
        client.broadcast.emit('saludaron',data);
        return 'Hola '+ data.nombre;
    }
}