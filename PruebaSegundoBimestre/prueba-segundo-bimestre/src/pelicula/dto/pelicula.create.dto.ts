import {IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class PeliculaCreateDto {

    @IsEmpty()
    id?:number;

    @IsNotEmpty()
    @IsString()
    nombrePelicula:string;

    @IsNotEmpty()
    @IsNumber()
    anioLanzamientoPelicula:number;

    @IsNumber()
    @IsOptional()
    ratingPelicula:number;

    @IsNumber()
    precioPelicula:number;

    @IsString()
    @IsOptional()
    actoresPrincipalesPelicula:string;

    @IsString()
    @IsOptional()
    sinopsisPelicula:string;

}