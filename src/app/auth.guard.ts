import { BackendapiService } from './backendapi.service';
import { AppComponent } from './app.component';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private app:AppComponent,private route:Router,private backend:BackendapiService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     if(localStorage.getItem("username")!=null)
     {
         return true;
     }
     else{
       this.route.navigateByUrl('http://localhost:4200')
     }

  }

}
