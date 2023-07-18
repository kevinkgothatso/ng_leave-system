import { Component } from '@angular/core';
import { ApiRequestService } from './services/api-request.service';
import { Irequest } from './interfaces/irequest';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

const endDateType: Date = new Date();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  //varaiable to hold data temporarily
  req: Irequest[] = [];

  //anual leave
  annualLeaveDays: number = 15;

  invalid: boolean = false;


  constructor(private request: ApiRequestService) {
    this.appGetRequests();
  }


  requestGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    surname: new FormControl(null, Validators.required),
    start_date: new FormControl(null, Validators.required),
    end_date: new FormControl(null, Validators.required),
    days_taken: new FormControl(null),
    days_left: new FormControl(null),
    leave_type: new FormControl("Type Of Leave...", Validators.required),
    reason: new FormControl(null, Validators.required)
  });


  //end date
  endDateType = this.requestGroup.controls.end_date.value;

  //getting form data
  appGetRequests() {
    this.request.getRequests().subscribe(
      (data: Irequest[]) => {
        this.req = data;
      }
    );
  }



  //posting form data
  appPostRequests() {
    let data: Irequest = {
      name: this.getName().value, surname: this.getSurname().value, start_date: this.getStartDate().value,
      end_date: this.getEndDate().value, days_taken: this.calculateDaysTaken(), days_left: this.calcDaysLeft(),
      leave_type: this.getLeaveType().value, reason: this.getReason().value
    };

    if (this.formValid()) {
      this.request.postRequest(data).subscribe();
      this.requestGroup.reset();
    }
    else {
      this.invalid = true;
    }

  }

  formValid(): boolean {
    if (this.requestGroup.valid) {
      return true;
    }
    else {
      return false;
    }
  }

  //getters
  getName(): AbstractControl {
    return this.requestGroup.controls.name;
  }
  getSurname(): AbstractControl {
    return this.requestGroup.controls.surname;
  }
  getReason(): AbstractControl {
    return this.requestGroup.controls.reason;
  }
  getStartDate(): AbstractControl {
    return this.requestGroup.controls.start_date;
  }
  getEndDate(): AbstractControl {
    return this.requestGroup.controls.end_date;
  }

  getLeaveType(): AbstractControl {
    return this.requestGroup.controls.leave_type;
  }

  //Calculating Days taken
  calculateDaysTaken(): number {
    const msInDay = 24 * 60 * 60 * 1000;

    let endDate = new Date(this.getEndDate().value);
    let startDate = new Date(this.getStartDate().value);

    return Math.round(Math.abs(Number(endDate) - Number(startDate)) / msInDay)
  }


  //Calculating Days  Left
  calcDaysLeft(): number {
    return (this.annualLeaveDays - this.calculateDaysTaken());
  }


  //test if end date and start date are null
  isDateNull(): boolean {
    if (this.getEndDate().dirty && this.getStartDate().dirty) {
      return true;
    }
    else { return false }
  }


  //checking wether end date is greater than start date
  isDateGreater(): boolean {

    let endDate = new Date(this.getEndDate().value);
    let startDate = new Date(this.getStartDate().value);

    if (endDate > startDate) {
      return true;
    }
    else {
      return false;
    }
  }

  isDaysLeftNeg(): boolean {

    if (this.calcDaysLeft() <= -1) {
      return true;
    }
    else {
      return false;
    }
  }

}

