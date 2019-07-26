import {IsBoolean, IsDate, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class ActorCreateDto {

    @IsEmpty()
    idActor:number;

    @IsNotEmpty()
    @IsString()
    nombresActor: string;

    @IsNotEmpty()
    @IsString()
    apellidosActor: string;

    @IsDate()
    @IsOptional()
    fechaNacimientoActor: Date;

    @IsNumber()
    @IsOptional()
    numeroPeliculasActor: number;

    @IsBoolean()
    @IsOptional()
    estaRetiradoActor: boolean;
}