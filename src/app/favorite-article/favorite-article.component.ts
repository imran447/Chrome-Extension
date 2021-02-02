import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../article.service";

@Component({
  selector: 'app-favorite-article',
  templateUrl: './favorite-article.component.html',
  styleUrls: ['./favorite-article.component.css']
})
export class FavoriteArticleComponent implements OnInit {

  constructor(private articleService: ArticleService) { }
  public articles =[];
  public activate:boolean=false;

  ngOnInit(): void {
      this.articleService.getFavoriteArticle(localStorage.getItem("userId")).subscribe(data=>{
       this.articles=data.data;
      });
  }
  hideArticle=(articleId)=>{
    this.articleService.hideArticle(articleId,localStorage.getItem("userId")).then((data)=>{
      this.articleService.getFavoriteArticle(localStorage.getItem("userId")).subscribe(data=>{
        this.articles=data.data;
      });
    })
  }
  activateOption=(e)=>{
    if(!this.activate){
      document.getElementById(e).classList.remove('display-none');
    }
    else{
      document.getElementById(e).classList.add('display-none')
    }
    this.activate=!this.activate;
  }
}
