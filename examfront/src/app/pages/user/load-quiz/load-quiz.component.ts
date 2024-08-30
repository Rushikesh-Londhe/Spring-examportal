import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit{
catId:any;
quizes:any;
  constructor(
    private _route:ActivatedRoute,
    private _quiz:QuizService

  ){}
  ngOnInit(): void {
 
 this._route.params.subscribe(
  (params:any)=>{
    this.catId= params['catId'];
    if(this.catId==0){
      //load all quizes
      this._quiz.getActiveQuizes().subscribe(
        (data:any)=>{
          this.quizes=data;
          console.log(this.quizes);
        },(error:any)=>{
          console.log(error);
          alert('error in loading all quizes');
        }
      )
    }else{
      //load specific quiz
      this._quiz.getActiveQuizesOfCategory(this.catId).subscribe(
        (data:any)=>{
            this.quizes=data;
        },
        (error:any)=>{
            console.log(error);
            alert('error in loading data');
        }
      )
    }
  }
 );
 
  }

}
