import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',

  styles: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: Observable<any[]>;
  constructor(public db: AngularFireDatabase) {
    db.list('perfomace').valueChanges().subscribe(item => {
      console.log(item);
    })
  }
  ngOnInit() {
  }

}
