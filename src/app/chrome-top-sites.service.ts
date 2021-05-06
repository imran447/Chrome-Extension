import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChromeTopSitesService {

   baseUrl:string = "http://localhost:8000/api";
  // baseUrl:string ="api";
  constructor(private http: HttpClient) { }
  addChromeTopSites(url,user_Id){
   return this.http.post(this.baseUrl+"/auth/addChromeSites",{userId:user_Id,url:url});
  }
  getChromeTopSites(id):Observable<any>{
    return this.http.get<[]>(this.baseUrl+"/auth/getChromeSites/"+id);
  }

  removeChromeTopSites(id){
    return this.http.delete(this.baseUrl+"/auth/deleteChromeSites/"+id);
  }
}
