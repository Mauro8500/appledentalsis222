import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AppuserService {
  private API_SERVER = "http://localhost:8080/appuser/"
  private appuser;

  constructor(private httpClient: HttpClient) { }
  public getLogedAppuser(){
    return this.appuser;
  }
  public setLogedAppuser(item: any){
    this.appuser = item;
  }

  public getAllUser(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }

  public saveAppuser(appuser: any): Observable<any>{
    return this.httpClient.post(this.API_SERVER, appuser);
  }

  public deleteAppuser(id:any): Observable<any>{
    return this.httpClient.delete(this.API_SERVER+"delete/"+id);
  }

  public loginUser(appuser:any):Observable<any>{
    this.appuser = appuser
    return this.httpClient.post(this.API_SERVER+"login",appuser);
  }
}