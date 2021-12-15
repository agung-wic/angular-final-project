import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private payment: PaymentService, private route: Router) { }

  ngOnInit(): void {
  }

  addForm = new FormGroup({
    cardOwnerName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    cardNumber: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern("[0-9]+")]),
    expirationDate: new FormControl('', [Validators.required]),
    securityCode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern("[0-9]+")])
  })

  get cardOwnerName() {
    return this.addForm.get('cardOwnerName')
  }
  get cardNumber() {
    return this.addForm.get('cardNumber')
  }
  get expirationDate() {
    return this.addForm.get('expirationDate')
  }
  get securityCode() {
    return this.addForm.get('securityCode')
  }

  addPayment() {
    const paymentData = this.addForm.value

    console.log(paymentData)
    this.payment.createData(paymentData).subscribe((response) => {
      this.addForm.reset()
      this.route.navigate(['/home'])
    })
  }
}
