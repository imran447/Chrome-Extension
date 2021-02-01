import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  // baseUrl:String = "http://localhost:8000/api";
  baseUrl:string ="api";
  private pageNo=0;
  constructor(private http: HttpClient) { }
  getArticles(id):Observable<any>{
    return this.http.get<[]>(this.baseUrl+"/article/"+id+"/"+this.pageNo);
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
  applyFilter(filter,userId):Observable<any>{
    return this.http.get<[]>(this.baseUrl+"/article/filterArticle/"+userId+"/"+filter);
  }
  hideArticle(articleId,userId){
    return this.http.put(this.baseUrl+"/auth/hideArticle/"+articleId,{"userId":userId}).toPromise();
  }
  paginatePage(){
    this.pageNo++;
  }
}
