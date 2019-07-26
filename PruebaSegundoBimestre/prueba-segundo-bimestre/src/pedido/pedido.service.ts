import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {PedidoEntity} from "./pedido.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Pedido} from "./interfaces/pedido";
import {PeliculasSeleccionadas} from "./interfaces/peliculasSeleccionadas";


@Injectable()
export class PedidoService {

    constructor(@InjectRepository(PedidoEntity)
                private readonly _pedidosRepository: Repository<PedidoEntity>){
    }

    peliculasSeleccionadas:PeliculasSeleccionadas[] = [];

    crearPedido(nuevoPedido:Pedido):Promise<PedidoEntity>{

        const objetoEntidad = this._pedidosRepository.create(nuevoPedido); //Crea una nueva instancia de la entidad
        this.peliculasSeleccionadas = [];
        return this._pedidosRepository.save(objetoEntidad);
    }

    consultarPedidos():Promise<PedidoEntity[]>{
        return this._pedidosRepository.find();
    }

    consultarTodosPedidos():Promise<PedidoEntity[]>{
        return this._pedidosRepository.find({where:{estadoPedido:'Por despachar'}});
    }

    async modificarPedido(idPedido:number):Promise<PedidoEntity[]>{
        const objetoEntidad = await this._pedidosRepository.findOne(idPedido);
        objetoEntidad.estadoPedido = 'Despachado';
        this._pedidosRepository.save(objetoEntidad);
        return this._pedidosRepository.find();
    }

    modificarPeliculaSeleccionada(pelicula:PeliculasSeleccionadas){
        const index = this.peliculasSeleccionadas.indexOf(pelicula);
        this.peliculasSeleccionadas[index].cantidadPelicula = this.peliculasSeleccionadas[index].cantidadPelicula+1;
        this.calcularTotalSinImpuesto();
        this.calcularTotalConImpuesto();
    }

    calcularTotalSinImpuesto(){
        this.peliculasSeleccionadas.map((pelicula) => {
            return pelicula.totalSinImpuesto = pelicula.precioPelicula * pelicula.cantidadPelicula
        })
    }

    calcularTotalConImpuesto(){
        this.peliculasSeleccionadas.map((pelicula) => {
            return pelicula.totalConImpuesto = pelicula.totalSinImpuesto*1.12
        })
    }

    calcularPrecioTotal(){
        let totalSinImpuesto = 0;
        let totalConImpuesto = 0;

        this.peliculasSeleccionadas.forEach(
            (pelicula)=>{
                totalSinImpuesto = totalSinImpuesto + pelicula.totalSinImpuesto;
                totalConImpuesto = totalConImpuesto + pelicula.totalConImpuesto;
            }
        )
        return {
            totalConImpuesto,
            totalSinImpuesto
        };
    }


}
