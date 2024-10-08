import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit{
  categories: any[] = [];

  quizData:any={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuetions:'',
    active:true,
    category:{
      id:''
    }

  }  

  constructor(private _category:CategoryService,private _snack:MatSnackBar,private _quiz:QuizService ){}
  ngOnInit(): void {
    this._category.categories().subscribe(
      (data:any)=>{
        this.categories=data;
          console.log(this.categories)
      },
      (error:any)=>{
        console.log(error);
        Swal.fire('Error!!','error in loading data','error');
      }
    );
  }
 
//add quiz
addQuiz(){
if(this.quizData.title.trim()==''||this.quizData.title.trim()==null){
this._snack.open("Title required",'',{duration:3000});
return;
}
//call server
this._quiz.addQuiz(this.quizData).subscribe(
  (data:any)=>{
    Swal.fire('Success','Quiz Added Successfully','success');
    this.quizData={
      title:'',
      description:'',
      maxMarks:'',
      numberOfQuetions:'',
      active:true,
      category:{
        id:''
      }
  
    } ; 
    
  },
  (error:any)=>{
    Swal.fire('Error','internal server error','error');
  }
);
}

}
