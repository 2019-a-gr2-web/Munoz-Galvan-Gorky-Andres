import {WebSocketGateway, WebSocketServer} from '@nestjs/websockets'

@WebSocketGateway(3001,
    {namespace: '/websockets'
    })
export class MayornumeroGateway {
    @WebSocketServer() server;
}