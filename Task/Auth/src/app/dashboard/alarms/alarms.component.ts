import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-alarms',
  templateUrl: './alarms.component.html',
  styleUrls: ['./alarms.component.css']
})
export class AlarmsComponent implements OnInit {
  alarms = [];
  constructor(private _authService: AuthService, public db: AngularFireDatabase) {
  }

  ngOnInit() {
    this.db.list('alarms').valueChanges().subscribe(item => {
      item.forEach(alarm => {
        alarm['time'] = new Date(alarm['time'])
      })
      this.alarms = item;
      console.log(item);
    })
  }
  logout() {
    this._authService.logout();
  }
}
