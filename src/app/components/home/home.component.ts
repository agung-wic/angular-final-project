import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  payments: any[] = [];

  constructor(private payment: PaymentService, private route: Router) { }

  ngOnInit(): void {
    this.GetAllPayment()
  }

  GetAllPayment(){
    this.payment.GetAll().subscribe((response: any)=>{
      this.payments = response.data
      console.log(response)
    })
  }

  add(){
    this.route.navigate(['add'])
  }
  toEdit(id: number){
    this.route.navigate([`edit/${id}`])
  }

  confirmDelete(id: number){
    if(confirm(`Are you sure to delete staff data with Id ${id}`))
      this.delete(id)
  }

  delete(id: number){
    this.payment.deleteData(id).subscribe((response)=>{
      this.GetAllPayment()
    })
  }

}
