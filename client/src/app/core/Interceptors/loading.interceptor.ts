import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BusyService } from "../services/busy.service";
import { Observable, delay, finalize } from "rxjs";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor{
    constructor(private busyService:BusyService){}
    intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
        if(req.method === 'Post' && req.url.includes('orders')){
            return next.handle(req);
        }
        if(req.url.includes('emailexists')){
            return next.handle(req);
        }
        this.busyService.busy();

        return next.handle(req).pipe(
            // delay(10000),
            finalize(()=>{
                this.busyService.idle();
            })
        );
    }
}