import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import {Observable} from 'rxjs'
import {Injectable} from '@angular/core'
import { UserService } from "./user.service";

const TOKEN_HEADER = "Authorization"

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private userService: UserService
    ) {}

    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let authReq = req
        const token = this.userService.getToken()
        console.log(token)
        if (token != null) {
            authReq = authReq.clone({
                setHeaders: {"Authorization": `Bearer ${token}`}
            })
        }
        return next.handle(authReq)
    }
}

export const authInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }
]