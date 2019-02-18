import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Chart } from 'angular-highcharts';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: []
})
export class LayoutComponent implements OnInit {
  cpu: Chart;
  ram: Chart;
  hidden = false;
  cpuValue = [];
  ramValue = [];
  timeValue = [];


  constructor(private _authService: AuthService, public db: AngularFireDatabase) {

  }
  getValues() {
    this.db.list('logs').valueChanges().subscribe(item => {
      this.cpuValue = [];
      this.ramValue = []
      console.log(item);
      for (let i = 0; i < item.length; i++) {
        let time = new Date(item[i]['time']);
        let year = time.getFullYear();
        let date = time.getDate();
        let month = time.getMonth();
        let hour = time.getHours();
        let minutes = time.getMinutes();
        let seconds = time.getSeconds();
        console.log(time);
        this.cpuValue.push([Date.UTC(year, month, date, hour, minutes, seconds), item[i]["cpuUsage"]]);
        this.ramValue.push([time, item[i]["memUsage"]["usedMemMb"]]);
        this.timeValue.push(item[i]["time"]);
      }
      console.log(this.ramValue);
      this.drawCPUchart(this.cpuValue, "CPU");
      this.drawRAMchart(this.ramValue, 'RAM')
    })
  }
  ngOnInit() {
    this.getValues();
  }
  toggle() {
    this.hidden = !this.hidden;
  }
  drawCPUchart(data, label) {
    this.cpu = new Chart({
      chart: {
        type: 'spline'
      },
      title: {
        text: 'CPU Chart'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150

      },
      plotOptions: {
        spline: {
          marker: {
            radius: 4,
            lineColor: '#666666',
            lineWidth: 1
          }
        }
      },
      series: [
        {
          name: label,
          data: data,
          type: 'spline'
        }
      ]
    });
  }

  drawRAMchart(data, label) {
    this.ram = new Chart({
      chart: {
        type: 'spline'
      },
      title: {
        text: 'RAM Chart'
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        spline: {
          marker: {
            radius: 4,
            lineColor: '#666666',
            lineWidth: 1
          }
        }
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150

      },

      series: [
        {
          name: label,
          data: data,
          type: 'spline'
        }
      ]
    });
  }
  // add() {
  //   this.cpu.addPoint(Math.floor(Math.random() * 10));
  // }

  logout() {
    this._authService.logout();
  }

}