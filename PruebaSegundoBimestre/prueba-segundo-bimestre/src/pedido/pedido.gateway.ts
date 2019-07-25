// ws://localhost:3001/websockets
import {SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Client} from "socket.io";

@WebSocketGateway(3001,{
    namespace:'/websockets'
})
export class PedidoGateway {

    @WebSocketServer() server;
    constructor(){
        console.log(this.server)
    }

    @SubscribeMessage('holaMundo')
    findAll(client:Client | any,data:any){
        console.log(data);
        console.log('Nos hacen la petición');
        console.log(this.server);
        client.broadcast.emit('jugar',data);
        return 'Hola '+ data.nombre;
    }

}