export interface Pedido {
    idPedido?:number;
    nombreUsuario:string;
    direccionUsuario:string;
    telefonoUsuario:string;
    ciUsuario:string;
    totalSinImpuesto:number;
    totalConImpuesto:number;
    estadoPedido: 'Iniciado' | 'Por despachar' | 'Despachado'
}