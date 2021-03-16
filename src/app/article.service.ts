import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  baseUrl:String = "http://localhost:8000/api";
  // baseUrl:string ="api";
  private pageNo=0;

  data;
  constructor(private http: HttpClient) { }
  getArticles(id):Observable<any>{
    return this.http.get<[]>(this.baseUrl+"/article/"+id+"/"+this.pageNo);
  }
  getFavoriteArticle(id):Observable<any>{
    return this.http.get<[]>(this.baseUrl+"/article/favorite/article/"+id);
  }
  addVisitor(id){
    this.http.post(this.baseUrl+"/article/add-visitor",{id:id}).toPromise().then((data:any)=>{
    })
  }
  getSourceArticle():Observable<any>{
    return this.http.get<[]>(this.baseUrl+"/article/uniqueSource");
  }
  getUniSourceArticle():Observable<any>{
    return this.http.get<[]>(this.baseUrl+"/article/uniqueSourceArticle");
  }
  selectedSource():Observable<any>{
    return this.http.get<[]>(this.baseUrl+"/auth/userSelectedSources/"+localStorage.getItem("userId"));
  }
  unSelectedSource():Observable<any>{
    return this.http.get<[]>(this.baseUrl+"/auth/userunSelectedSources/"+localStorage.getItem("userId"));
  }
  selectSources(value){
    return this.http.put(this.baseUrl+"/auth/selectSources/"+localStorage.getItem("userId")+"/"+value,{});
  }
  unSelectSources(value){
    return this.http.put(this.baseUrl+"/auth/unSelectSources/"+localStorage.getItem("userId")+"/"+value,{});
  }
  upvoteArticle(id,userId) {
    return this.http.get(this.baseUrl + "/auth/upvoteArticle/" + id + "/" + userId, {});
  }
  addFavoriteArticle(id,user_Id){
    this.http.post(this.baseUrl+"/article/favorite-article",{userId:user_Id,article:id}).toPromise().then((data:any)=>{
    });
  }
  applyFilter(filter,userId):Observable<any>{
    return this.http.get<[]>(this.baseUrl+"/article/filterArticle/"+userId+"/"+filter);
  }
  sourceApplyFilter(filter,userId):Observable<any>{
    return this.http.get<[]>(this.baseUrl+"/article/filterSourceArticle/"+userId+"/"+filter);
  }
  mostViewedAticles():Observable<any>{
    return this.http.get<[]>(this.baseUrl+"/article/most/Viewed/"+localStorage.getItem("userId")+"/"+this.pageNo);
  }
  mostUpvoteAticles():Observable<any>{
    return this.http.get<[]>(this.baseUrl+"/article/most/Upvote/"+localStorage.getItem("userId")+"/"+this.pageNo);
  }
  hideArticle(articleId,userId){
    return this.http.put(this.baseUrl+"/auth/hideArticle/"+articleId,{"userId":userId}).toPromise();
  }
  paginatePage(){
    this.pageNo++;
  }
  resetPaginate(){
    this.pageNo=0;
  }
  getNewsApi():Observable<any>{
    return this.http.get<[]>("http://newsapi.org/v2/everything?q=tesla&from=2021-01-02&sortBy=publishedAt&apiKey=2ca184e92cad4bbaa2e422011ca10cc9");
  }
  getHigherArticles():Observable<any>{
    return this.http.get<[]>(this.baseUrl+"/article/getHigherArticle");
  }
}
