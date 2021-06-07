import { Component, OnInit } from '@angular/core';
import { AsyncValidator, AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  errors: string [];

  constructor( private fb: FormBuilder, private accountServices: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }
  createRegisterForm () {
    this.registerForm =this.fb.group({
      displayName: [null, [Validators.required]],
      email: [null, [Validators.required],
      // [this.validateEmailNotTaken()] //xac thuc dang ki 
    ],
      password: [null,Validators.required]
    });
}
onSubmit() {
  this.accountServices.register(this.registerForm.value).subscribe(response => {
    this.router.navigateByUrl('/shop');
  
  },error => {
    console.log(error);
    this.errors= error.errors;
    
  });
}
  // validateEmailNotTaken(): AsyncValidatorFn{
  //   return control => {
  //     return timer(500).pipe(
  //       switchMap(() => {
  //         if(!control.value){
  //           return of(null);
  //         }
  //         return this.accountServices.checkEmailExists(control.value).pipe(
  //           map( res => {
  //             return res ? {emailExists: true} :null;
  //           })
  //         );
  //       })
  //     );
  //     };
  //   }
}
