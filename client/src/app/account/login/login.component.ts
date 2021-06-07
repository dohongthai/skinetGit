import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFrom: FormGroup;
  returnUrl: string;

  constructor(private accountService: AccountService,private router:Router,private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.returnUrl=this.activateRoute.snapshot.queryParams.returnUrl || '/shop' ;
    this.createLoginFrom();
  }
  createLoginFrom() {
    this.loginFrom= new FormGroup({
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    });
  }
  onSubmit()  {
    this.accountService.login(this.loginFrom.value).subscribe(()=> {
     this.router.navigateByUrl(this.returnUrl);
    },error =>{
      console.log(error);
      
    });
    
  }

}
