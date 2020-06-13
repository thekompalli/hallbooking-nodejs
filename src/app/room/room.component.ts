import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  constructor(private fb:FormBuilder,  private http:HttpClient, private router:Router) { }

  bookingForm;

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    })

    this.http.get('https://hallbooking-nodejs.herokuapp.com/room')
    .subscribe((item) => {
      console.log(item["message"])
    })

  }
  onSubmit(){
    this.router.navigate(["/customer-data"])
    console.log(this.bookingForm.value)
    this.http.post('https://hallbooking-nodejs.herokuapp.com/room', this.bookingForm.value)
    .subscribe((respData) => {
      console.log(respData)
    })

  }

  getData(){
    this.http.get('https://hallbooking-nodejs.herokuapp.com/customerData')
    .subscribe((respData) => {
      console.log(respData)
    })
  }

}
