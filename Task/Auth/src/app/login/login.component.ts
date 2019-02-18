import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
//import { AngularFireDatabaseModule } from '@angular/fire/database';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this._authService.login();
  }

  loginAdmin() {
    this._authService.loginAdmin();
  }

}