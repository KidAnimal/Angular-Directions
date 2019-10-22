import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams, Response, Http, RequestOptions } from '@angular/http';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private jsonp: Jsonp) { }


  getDirections(origin: string, destination: string): Observable<any> {
    // origin = "Boston, MA";
    // destination = "New York, NY";
    let url: string = `https://open.mapquestapi.com/directions/v2/route?key=rjYh2jPBO4Pj1uZwLVyEIGtIO4xTn50O&from=${origin}&to=${destination}`;
    let params = new URLSearchParams();
    let option = new RequestOptions();
    params.set('callback', "JSONP_CALLBACK");
    option.params =params; 
    return this.jsonp.get(url, option);
      }
    }
