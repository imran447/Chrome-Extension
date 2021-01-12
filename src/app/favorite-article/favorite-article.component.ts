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
  ngOnInit(): void {
      this.articleService.getFavoriteArticle(localStorage.getItem("userId")).subscribe(data=>{
       this.articles=data.data;
      });
  }

}
