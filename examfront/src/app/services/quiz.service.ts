import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http:HttpClient) { }
//get all quizes
  public quizes(){
   return this._http.get(`${baseUrl}/quiz/`);
  }

  //add quiz
  public addQuiz(quiz:any){
   return this._http.post(`${baseUrl}/quiz/`,quiz);
  }

  //delete the single quiz
  deleteQuiz(qId:number){
    return this._http.delete(`${baseUrl}/quiz/${qId}`) ;
   }
   
   //get the single quiz
   public getQuiz(qId: any){
    return this._http.get(`${baseUrl}/quiz/${qId}`);
   }

   //update quiz
   public updateQuiz(quiz:any){
    return this._http.put(`${baseUrl}/quiz/`,quiz);
   }
   //get quizes of category admin
   public getQuizesOfCategory(cid:any){
    return this._http.get(`${baseUrl}/quiz/category/${cid}`);
   }

   //get active quizes
   public getActiveQuizes(){
    return this._http.get(`${baseUrl}/quiz/active`);
   }
  //get active quizes of category user
  public getActiveQuizesOfCategory(cid:any){
    return this._http.get(`${baseUrl}/quiz/category/active/${cid}`);
   }

}
