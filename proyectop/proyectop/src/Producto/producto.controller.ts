import {Controller, Get, Res} from "@nestjs/common";

@Controller('/api/producto')
export class ProductoController {
    @Get('verProductos')
    verProductos(@Res() res) {
        res.render('producto')
    }
}