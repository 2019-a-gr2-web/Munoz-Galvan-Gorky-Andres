import {Injectable} from '@nestjs/common';

@Injectable()
export class AppService {

    revisarCookieSegura(req):boolean{
        const cookieSegura = req.signedCookies.nombreUsuario;
        return !!cookieSegura;
    }
}
