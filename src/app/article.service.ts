import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  baseUrl:String = "http://localhost:8000/api";
  constructor(private http: HttpClient) { }
  getArticles():Observable<any>{
    return this.http.get<[]>(this.baseUrl+"/article");
  }
  getFavoriteArticle(id):Observable<any>{
    return this.http.get<[]>(this.baseUrl+"/article/favorite-article/"+id);
  }
  addVisitor(id){
    this.http.post(this.baseUrl+"/article/add-visitor",{id:id}).toPromise().then((data:any)=>{
    });
  }
  addFavoriteArticle(id,user_Id){
    this.http.post(this.baseUrl+"/article/favorite-article",{userId:user_Id,article:id}).toPromise().then((data:any)=>{
    });
  }
}
