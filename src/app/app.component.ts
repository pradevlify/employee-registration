import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ServiceService } from './service/service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'crud';
  allproducts: any[] = [];
  isfetching: boolean = false;
  @ViewChild('myForm') form: NgForm;
  edit: boolean = false;
  productid: string;
  default = 'java';
  constructor(private http: HttpClient, private service: ServiceService) {}
  ngOnInit(): void {
    this.fetch();
  }
  onfetch() {
    this.fetch();
  }
  ondelete(id: string) {
    this.service.delete(id);
  }
  deleteall() {
    this.service.deleteAll();
  }

  onsubmit(product: NgForm) {
    console.log(product);
    if (!this.edit) {
      this.service.creatProduct(product);
    } else {
      this.service.update(this.productid, product);
    }
    this.form.reset();
  }
  private fetch() {
    this.isfetching = true;
    return this.service.getProduct().subscribe((res) => {
      this.allproducts = res;
      this.isfetching = false;
    });
  }
  onedit(id: any) {
    this.productid = id;
    const currentproduct = this.allproducts.find((a) => a.id === id);
    console.log(currentproduct);
    this.form.setValue({
      fname: currentproduct.fname,
      lname: currentproduct.lname,
      email: currentproduct.email,
      birthdate: currentproduct.birthdate,
      gender: currentproduct.gender,
      course: currentproduct.course,
    });
    this.edit = true;
  }
}
