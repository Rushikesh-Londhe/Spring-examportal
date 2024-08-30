import { Component, OnInit } from '@angular/core';
import baseUrl from 'src/app/services/helper';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizes',
  templateUrl: './view-quizes.component.html',
  styleUrls: ['./view-quizes.component.css']
})
export class ViewQuizesComponent implements OnInit{
  quizes: any[] = [];
constructor(private _quiz:QuizService){}

ngOnInit(): void {
  this._quiz.quizes().subscribe(

    (data:any)=>{
      this.quizes=data;
      console.log(this.quizes);
    },
    (error)=>{
      console.log(error);
      Swal.fire('Error!!','Error in loading data','error');
    }
  )
}
// Delete quiz
deleteQuiz(qId: number) {
  console.log('Deleting quiz with ID:', qId);
  Swal.fire({
    icon: 'info',
    title: 'Are you sure ?',
    confirmButtonText: 'Delete',
    showCancelButton: true,
  }).then((result) => { // Fix the arrow function here
    if (result.isConfirmed) {
      this._quiz.deleteQuiz(qId).subscribe(
        (data: any) => {
          this.quizes = this.quizes.filter((quiz) => quiz.qId !== qId);
          console.log('Quiz deleted successfully', data);
          Swal.fire('Success!!', 'Quiz deleted', 'success');
        },
        (error: any) => {
          console.error('Error deleting quiz', error);
          Swal.fire('Error!!', 'Error in deleting quiz', 'error');
        }
      );
    }
  });
}



}


