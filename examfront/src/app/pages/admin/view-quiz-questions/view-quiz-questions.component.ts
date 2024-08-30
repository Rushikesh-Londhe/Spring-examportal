import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionServiceService } from 'src/app/services/question-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit{

  qId:any;
  qTitle:any;
  questions :any[]=[];
  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionServiceService,
    private _snack:MatSnackBar


  ){}
  ngOnInit(): void {
   this.qId=this._route.snapshot.params['qid'];
   this.qTitle=this._route.snapshot.params['title'];
   console.log(this.qId);
   console.log(this.qTitle);
   
   this._question.getQuestionsOfQuiz(this.qId).subscribe(
    (data:any)=>{
      console.log(data);
      this.questions=data;
    },
    (error:any)=>{
      console.log(error);
    }
   );
  }

  //delete question
  deleteQuestion(questionId:any){
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure?'
    }).then(
      (result)=>{
        if(result.isConfirmed){
          this._question.deleteQuestion(questionId).subscribe(
            (data:any)=>{
                this._snack.open('Qustion Deleted','',{duration:3000});
                this.questions=this.questions.filter((q)=>q.quesId!=questionId);
            },
            (error:any)=>{
              this._snack.open('Error in deleting question','',{duration:3000});
              console.log(error);
            }
          );
        }
      }
    );
  }

}
