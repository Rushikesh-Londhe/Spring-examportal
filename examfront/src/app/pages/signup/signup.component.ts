import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private userService: UserService,private snack:MatSnackBar) { }
  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  }
  formSubmit() {
    // alert('submit');
    if (this.user.username.trim() == '' || this.user.username.trim() == null) {
     // alert('User is required');
     this.snack.open('Username is required!!',' ',{
      duration:3000,
      // verticalPosition:'top',
      // horizontalPosition:'right'
     })
      return;
    }
    // validate

    //adduser:userservice
    this.userService.addUser(this.user).subscribe(
      (data:any) => {
        //success
        console.log(data)
       // alert("success");
       Swal.fire('Success done!!','User id is '+data.id,'success');
      }, 
      (error:any) => {
        //error
        console.log(error)
       // alert("something went wrong");
      //  this.snack.open('something went wrong!!','',{
      //   duration:3000.
      //  })
      Swal.fire('Something went wrong !!','User is already exists','error');
      }
    )
  }



}
