import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer-data',
  templateUrl: './customer-data.component.html',
  styleUrls: ['./customer-data.component.scss']
})
export class CustomerDataComponent implements OnInit {
  customerData:any[] = []
  tHeads = ['Customer Name', 'Age', 'Room Name', 'Date', 'Start Time', 'End Time'];
  tData = ['customer_name', 'age', 'room_name', 'Date', 'start_time', 'end_time'];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('https://hallbooking-nodejs.herokuapp.com/customerData')
    .subscribe((respData) => {
      this.customerData = respData
    })
  }

}
