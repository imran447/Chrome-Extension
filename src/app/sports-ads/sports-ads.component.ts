import {Component, Input, OnInit} from '@angular/core';
import {ArticleService} from "../article.service";

@Component({
  selector: 'app-sports-ads',
  templateUrl: './sports-ads.component.html',
  styleUrls: ['./sports-ads.component.css']
})
export class SportsAdsComponent implements OnInit {
  public articles =[];
  constructor(private articleService: ArticleService) { }
  @Input() favoriteArticle;
  ngOnInit(): void {
   this.articleService.getArticles().subscribe(data=>{
     this.articles=data.data
   });

  }
    addVisitor=(id: String)=>{
      this.articleService.addVisitor(id);
      this.articleService.getArticles().subscribe(data=>{
        this.articles=data.data
      });
  }

  addFavoriteArticle=(id: String) =>{
    console.log(localStorage.getItem("userId"));
    this.articleService.addFavoriteArticle(id, localStorage.getItem("userId"));
  }
}
