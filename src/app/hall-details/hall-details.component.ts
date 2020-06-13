import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hall-details',
  templateUrl: './hall-details.component.html',
  styleUrls: ['./hall-details.component.scss']
})
export class HallDetailsComponent implements OnInit {

  hallData = [];
  tHeads = ['Room Name', 'Status', 'Customer Name', 'Date', 'Start Time', 'End Time', 'Price'];
  tData = ['room_name', 'booked_status', 'customer_name', 'date', 'start_time', 'end_time', 'price'];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('https://hallbooking-nodejs.herokuapp.com/bookedData')
    .subscribe((respData) => {
      this.hallData = respData
    })
  }

}
