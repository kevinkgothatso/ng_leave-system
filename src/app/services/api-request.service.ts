import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { Irequest } from '../interfaces/irequest';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {
  constructor(private http: HttpClient){
  }

  url: string = "http://localhost:8080";

  getRequests(): Observable<Irequest[]>{
     return this.http.get<Irequest[]>(this.url);
  }

  postRequest(Requestdata: Irequest): Observable<Irequest>{
    console.log('service:');
    console.log(Requestdata);
     return this.http.post<Irequest>(`${this.url}/post`,Requestdata);
  }
}
