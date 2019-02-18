import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private message: string;

    constructor(private _router: Router, public afAuth: AngularFireAuth) { }

    clear(): void {
        localStorage.clear();
    }

    isAuthenticated(): boolean {
        return localStorage.getItem('user') != null && !this.isTokenExpired();
    }

    isTokenExpired(): boolean {
        return false;
    }

    loginAdmin(): void {
        localStorage.setItem('token', `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzMyNzM5NjksImV4cCI6MTU2NDgxMDAwNSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiVGVzdCBHdWFyZCIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJyb2xlIjoiQWRtaW4ifQ.rEkg53_IeCLzGHlmaHTEO8KF5BNfl6NEJ8w-VEq2PkE`);

        this._router.navigate(['/dashboard']);
    }
    login(): void {
        this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((data) => {
            localStorage.setItem('user', JSON.stringify(data));
            this._router.navigate(['/dashboard']);
        })



    }
    logout(): void {
        this.clear();
        this._router.navigate(['/login']);
    }

    decode() {
        return true;
    }
}



