import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginUser={
    email: String,
    name: String,
    picture: String,
    provider:String
  };
  // apiURL: string = 'http://localhost:8000/api';
  apiURL:string ="api";
   constructor(private httpClient: HttpClient) { }
   public registerUser(user:any){
      this.loginUser.email=user.email;
      this.loginUser.name=user.name;
      this.loginUser.picture=user.photoUrl;
      this.loginUser.provider=user.provider;
       this.httpClient.post(this.apiURL+"/auth/register",this.loginUser).toPromise().then((data:any)=>{
         localStorage.setItem("userId",data.data._id);
       });
  }
  public logedUser(id):Observable<any>{
    return this.httpClient.get<{}>(this.apiURL+"/auth/"+id);
  }
}
