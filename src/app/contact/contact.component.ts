import { Component, OnInit } from '@angular/core';
import { CommonService } from './../shared/common.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [CommonService]  
})
export class ContactComponent implements OnInit {

  constructor(public commonService: CommonService) { }  
  updateTopCart:boolean=true;
  user: any = {
    "name": "",
    "email": "",
    "mobile": "",
    "address": ""
  }
  validForm: boolean = false;
  sendMailSuccess: boolean = false;
  validationMessage: string = "";
  IsProgressing:boolean = false;
  // sendMailSuccess:boolean = false;
  ngOnInit() {
  }
  confirm_order() {
    if (!this.isFormValid()) {
      setTimeout(() => {
        this.validForm = false;
        this.validationMessage = "";
      }, 7000);
      return;
    }
    this.sendMailSuccess = false;
 
    let address = this.user.address.replace(/\r\n|\n|\n\r\|r\r/g, "<br>");
   
    let message: string = `
    <p>Dear SRKK,</p>
    <p>Mail from Contact Page,</p>
    <p>Name : ${this.user.name}</p>
    <p>Email : ${this.user.email}</p>
    <p>Mobile  : ${this.user.mobile}</p>
    <p>Message : </p>
    <p>${address}</p>
    
    <p>&nbsp;</p>
    <p>Regards,</p>
    <p>SRKK</p>`;
    let jsonEmail = {
      "From": this.user.email,
      "Subject": this.user.name + " Contacted you via : SRKK",
      "Message": message
    };
    this.IsProgressing = true;
    this.commonService.postMethod(jsonEmail).subscribe(
      data => {
        // console.log(data);
        this.sendMailSuccess = true;
        this.IsProgressing = false;
        this.updateTopCart = false;
        setTimeout(() => {
          this.updateTopCart = true;
        }, 200)

      }
    )
  }
  isFormValid() {
    if (this.user.name == "" || this.user.name.trim() == "" ||
      this.user.email == "" || this.user.email.trim() == "" ||
      this.user.mobile == "" || this.user.mobile.trim() == "" ||
      this.user.address == "" || this.user.address.trim() == "") {
      this.validForm = true;
      this.validationMessage = "Please file the details";
      return false;
    }
    else if (!this.validateEmail(this.user.email)) {
      this.validForm = true;
      this.validationMessage = "Please enter valid Email";
      return false;
    }
    else if (!this.validateMobile(this.user.mobile)) {
      this.validForm = true;
      this.validationMessage = "Please enter valid Mobile";
      return false;
    }
    this.validForm = false;
    this.validationMessage = "";
    return true;
  }
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateMobile(mobile) {
    let re = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    return re.test(mobile);
  }
}
