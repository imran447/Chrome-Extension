import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginUser={
    email: String,
    name: String,
    picture: String,
  };
   apiURL: string = 'http://localhost:8000/api';
   constructor(private httpClient: HttpClient) { }
   public registerUser(user:any){

       this.loginUser.email=user.email;
       this.loginUser.name=user.name;
       this.loginUser.picture=user.photoUrl;
       this.httpClient.post(this.apiURL+"/auth/register",this.loginUser).toPromise().then((data:any)=>{
         localStorage.setItem("userId",data.data._id);
       });
  }
}
