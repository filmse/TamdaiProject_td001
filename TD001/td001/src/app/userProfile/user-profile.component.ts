import {Component, OnInit} from '@angular/core';
import {User} from '../models/User';
import {UserService} from '../services/User.service';
import {BankStatement} from '../models/BankStatement';
import {BankStatementService} from '../services/BankStatementService';
import {PointZNetService} from "../services/PointZNetService";
import {Order} from "../models/Order";
import {Router} from "@angular/router";

@Component({
  selector: 'app-top-up-page',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  admin = 'admin';
  active = 'active';
  instructor = 'instructor';
  ImageUserProfile: string;
  ImageUserCover: string;
  bankStatements: BankStatement[] = [];
  bankStatement: any = {};
  userId: any;
  amount: any;
  result: any;
  paymentId: any;
  statementAmount: any;
  confirm = 'confirm';

  fifty = 50;
  hundred = 100;

  show1 = true;
  show2 = false;
  show3 = false;
  show4 = false;

  status = "2";
  CStatus = "3";
  WConfirm = 'รอการตรวจสอบ';
  SConfirm = 'เติมแต้มเรียบร้อยแล้ว';

  orderPayments: Order[] = [];

  constructor(private userService: UserService,
              private bankStatementService: BankStatementService,
              private pointService: PointZNetService,
              private router: Router) {

    this.ImageUserProfile = '../../assets/images/003.jpg';
    this.ImageUserCover = '../../assets/images/001.jpg';
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  public showU() {
    this.show1 = true;
    this.show2 = false;
    this.show3 = false;
    this.show4 = false;
  }

  public showO() {
    this.show1 = false;
    this.show2 = true;
    this.show3 = false;
    this.show4 = false;
  }

  public showC() {
    this.show1 = false;
    this.show2 = false;
    this.show3 = true;
    this.show4 = false;
  }

  public showD() {
    this.show1 = false;
    this.show2 = false;
    this.show3 = false;
    this.show4 = true;
  }

  ngOnInit() {
    if (this.currentUser !== null) {
      this.getUserList();
    }
    this.getBankStatementList();

    if (this.getOrdersByStatus !== undefined) {
      this.getOrdersByStatus();
    }

  }

  private getUserList() {
    this.userService.getAll().subscribe(users => {
      this.users = users;
    });
  }

  private getBankStatementList() {
    this.bankStatementService.getBankStatements().subscribe(bankStatements => {
      this.bankStatements = bankStatements;
      if (bankStatements[0] !== undefined) {
        this.amount = bankStatements[0].statementAmount;
        this.userId = bankStatements[0].id;
      }
    });
  }

  ConfirmPayment(id, email, paymentId, statementAmount, balance, bankOrderId) {
    // console.log(id);
    // console.log(email);
    // console.log(statementAmount);
    // console.log(balance);
    // console.log(paymentId);

    this.result = parseFloat(statementAmount) + parseFloat(balance);
    // console.log(this.result);

    this.bankStatementService.confirmBankStatements(id, email, paymentId, statementAmount, bankOrderId, this.bankStatement, this.userId, this.result)
      .subscribe(
        data => {
          alert('Success');
          location.reload();
        },
        error => {
          alert('Error');
        });
  }

  private getOrdersByStatus() {
    this.pointService.getOrdersByStatus(this.status).subscribe(orderPayments => {
      this.orderPayments = orderPayments;
    });
  }

  ConfirmPointNetPayment(id, userId, point) {
    console.log("=============================: " + id);
    console.log("=============================: " + userId);
    console.log("=============================: " + point);
    console.log("=============================: " + this.CStatus);

    this.pointService.confirmBankStatement(id, userId, point, this.CStatus)
      .subscribe(
        data => {
          alert('Success');
          this.router.ngOnDestroy();
          window.location.href = 'http://tamdai.net/home';
        },
        error => {
          alert('Error');
        });
  }

}
