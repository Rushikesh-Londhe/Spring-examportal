import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionServiceService } from 'src/app/services/question-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit{


  qid:any;
  questions:any;
  marksGot:any=0;
  correctAnswers:any=0;
  attempted:any=0;
  isSubmit=false;
  timer:any;
  // q = {
  //   givenAnswer: '' 
  // };
  constructor(private _locationSt:LocationStrategy,
    private _route:ActivatedRoute,
    private _question:QuestionServiceService
    ){}
  ngOnInit(): void {
    this.preventBackButton();
   this.qid= this._route.snapshot.params['qId'];
   console.log(this.qid);
   this.loadQuestions();
  }
  loadQuestions() {
   this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
    (data:any)=>{
     
      this.questions=data;
      this.timer=this.questions.length*2*60;
      // this.questions.forEach((q:any)=>{
      // q['givenAnswer']='';
      // q = {
      //   givenAnswer: '' as string // Using type assertion to enforce string type
      // };
      
    
     // });
      console.log(this.questions);
      this.startTimer();
    },(error:any)=>{
      console.log(error);
      Swal.fire('Error','error in loading data','error');
    }
    );
   
  }
    preventBackButton(){
      history.pushState({ page: 1 }, "", location.href);
      this._locationSt.onPopState(()=>{
        history.pushState({ page: 1 }, "", location.href);
      })
  }

submitQuiz(){
  Swal.fire({
    title: "Do you want to submit the quiz?",
  
    showCancelButton: true,
    confirmButtonText: "Submit",
    icon:'info'
   
  }).then((e)=>{
    if(e.isConfirmed){
      this.evalQuiz();
      // //calculation
      // this.isSubmit=true;
      // console.log(this.questions);
      
      // this.questions.forEach((q: { givenAnswer: any; answer: any; })=>{
      //   if(q.givenAnswer==q.answer){
      //     this.correctAnswers++;
      //     let marksSingle =this.questions[0].quiz.maxMarks/this.questions.length;
      //     this.marksGot+=marksSingle;
      //   }
      //   if(q.givenAnswer.trim()!=''){
      //     this.attempted++;
      //   }
          
          
      // });
      // console.log(this.correctAnswers);
      // console.log(this.marksGot);
      // console.log(this.attempted);
      
    }
  })
}

startTimer(){
 let t:any= window.setInterval(()=>{
    //code
    if(this.timer<=0){
      this.evalQuiz();
      clearInterval(t);
    }
    else{
      this.timer--;
    }
  },1000)
}

getFormattedTime(){
  let mm:any=Math.floor(this.timer/60);
  let ss:any=this.timer-mm*60;
  return `${mm} min : ${ss} seconds`;

}
evalQuiz(){
   //calculation
   //call to server to check questions

   this._question.evalQuiz(this.questions).subscribe(
    (data:any)=>{
      console.log(data);
      this.marksGot=data.marksGot;
      this.correctAnswers=data.correctAnswers;
      this.attempted=data.attempted;
      this.isSubmit=true;
    },
    (error:any)=>{
      console.log(error);
      
    }
   );
   //this.isSubmit=true;
  //  console.log(this.questions);
   
  //  this.questions.forEach((q: { givenAnswer: any; answer: any; })=>{
  //    if(q.givenAnswer==q.answer){
  //      this.correctAnswers++;
  //      let marksSingle =this.questions[0].quiz.maxMarks/this.questions.length;
  //      this.marksGot+=marksSingle;
  //    }
  //    if(q.givenAnswer.trim()!=''){
  //      this.attempted++;
  //    }
       
       
  //  });
  //  console.log(this.correctAnswers);
  //  console.log(this.marksGot);
  //  console.log(this.attempted);


  
  }

  printPage(){
    window.print();
}

}
