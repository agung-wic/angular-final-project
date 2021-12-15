import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment } from 'src/app/Models/payment.model';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  
  constructor(public activatedRoute: ActivatedRoute, private payment: PaymentService, private route: Router) { }

  paymentEdit: Payment = {} as Payment
  
  ngOnInit(): void {
    this.getOnePayment(this.activatedRoute.snapshot.paramMap.get('id'))
    // this.editPayment(this.paymentEdit)
  }

  getOnePayment(id: any) {
    // const newId = Number(id)
    this.payment.getDataByID(id).subscribe((res) => {
      this.paymentEdit = res.data[0]
      console.log(this.paymentEdit)
      this.id?.setValue(this.paymentEdit.id)
      this.cardOwnerName?.setValue(this.paymentEdit.cardOwnerName)
      this.cardNumber?.setValue(this.paymentEdit.cardNumber)
      this.expirationDate?.setValue(this.paymentEdit.expirationDate)
      this.securityCode?.setValue(this.paymentEdit.securityCode)
    },
      error => {
        console.log(error);
      }
    )
  }

  // editPayment(payment: Payment){
  //   this.id?.setValue(payment.id)
  //   this.cardOwnerName?.setValue(payment.cardOwnerName),
  //   this.cardNumber?.setValue(payment.cardNumber),
  //   this.expirationDate?.setValue(payment.expirationDate),
  //   this.securityCode?.setValue(payment.securityCode)
  // }

  editForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    cardOwnerName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    cardNumber: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('[0-9]+')]),
    expirationDate: new FormControl('', [Validators.required]),
    securityCode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^[0-9]*$')])
  })

  get id() {
    return this.editForm.get('id')
  }
  get cardOwnerName() {
    return this.editForm.get('cardOwnerName')
  }
  get cardNumber() {
    return this.editForm.get('cardNumber')
  }
  get expirationDate() {
    return this.editForm.get('expirationDate')
  }
  get securityCode() {
    return this.editForm.get('securityCode')
  }

  // editPayment(payment: Payment){
  //   this.editForm.patchValue({
  //     id: this.paymentEdit.id,      
  //     cardOwnerName: this.paymentEdit.cardOwnerName,      
  //     cardNumber: this.paymentEdit.cardNumber,      
  //     expirationDate: this.paymentEdit.expirationDate,      
  //     securityCode: this.paymentEdit.securityCode      
  //   })
  // }

  updatePayment(id: number) {
    const paymentData = this.editForm.value

    console.log(id)
    console.log(paymentData)

    this.payment.updateData(id, paymentData).subscribe((response) => {
      this.editForm.reset()
      this.route.navigate(['/home'])
    })
  }

}
