import {Component, OnInit} from '@angular/core';
import {IMyDpOptions} from "mydatepicker";
import {PointZNetService} from "../../services/PointZNetService";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-payment-confirm',
  templateUrl: './payment-confirm.component.html',
  styleUrls: ['./payment-confirm.component.css']
})
export class PaymentConfirmComponent implements OnInit {

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mm-yyyy',
  };

  ImgKTB: string;
  ImgBBL: string;
  ImgSCB: string;
  ImgKB: string;

  bankStatement: any = {};
  orderPaymentsIds: any = {};
  radioItems = 'KBANK KTB BBK SCB'.split(' ');
  model = {options: ''};
  modelDate: any;

  get debug() {
    return JSON.stringify(this.model);
  }

  constructor(private pointService: PointZNetService,
              private route: ActivatedRoute,
              private router: Router) {
    this.ImgKTB = '../../../assets/images/KTB.jpg';
    this.ImgBBL = '../../../assets/images/bbl.png';
    this.ImgSCB = '../../../assets/images/scb.jpg';
    this.ImgKB = '../../../assets/images/Kb.jpg';
  }

  ngOnInit() {
    this.getPaymentId(this.route.snapshot.params['id']);
  }

  private getPaymentId(orderDetail) {
    this.pointService.getPaymentsById(orderDetail).subscribe(payments => {
      this.orderPaymentsIds = payments;
    });
  }

  Submit() {
    this.bankStatement.id = this.orderPaymentsIds.id;
    this.bankStatement.point = this.orderPaymentsIds.point;
    this.bankStatement.money = this.orderPaymentsIds.money;
    this.bankStatement.statementDate = this.modelDate.formatted;
    this.bankStatement.statementTime = this.orderPaymentsIds.statementTime;
    this.bankStatement.bankName = this.model.options;
    console.log(this.bankStatement);

    this.pointService.updatePayment(this.route.snapshot.params['id'], this.bankStatement.point, this.bankStatement.money, this.bankStatement.statementDate, this.bankStatement.statementTime, this.bankStatement.bankName)
      .subscribe(
        data => {
          alert('แจ้งโอนเงินเรียบร้อยแล้วระบบกำลังตรวจสอบ');
          this.router.navigate(['/PointZNet/PaymentOrder', this.orderPaymentsIds.userId]);
        },
        error => {
          alert('Error');
        });
  }

}
