import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs";
export class AuthInterceptorService implements HttpInterceptor{
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({headers: req.headers.append('auth', 'abcxyz')})
    console.log('Interceptor Called');
    return next.handle(modifiedReq).pipe(tap((event) => {
        if(event.type === HttpEventType.Response)
        {
            console.log('Response has arrived. Response Data: ')
            console.log(event.body)
        }
    }));
}
}