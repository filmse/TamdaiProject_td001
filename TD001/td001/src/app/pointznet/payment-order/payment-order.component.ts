import {Component, OnInit} from '@angular/core';
import {Order} from "../../models/Order";
import {PointZNetService} from "../../services/PointZNetService";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-payment-order',
  templateUrl: './payment-order.component.html',
  styleUrls: ['./payment-order.component.css']
})
export class PaymentOrderComponent implements OnInit {

  orderPayments: Order[] = [];
  confirm = 'รอยืนยันการโอนเงิน';
  WConfirm = 'ระบบกำลังตรวจสอบ';
  SConfirm = 'เติมแต้มเรียบร้อยแล้ว';

  constructor(private pointService: PointZNetService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    if (this.getPaymentList !== undefined) {
      this.getPaymentList(this.route.snapshot.params['id']);
    }

    console.log(this.route.snapshot.params['id']);
  }

  private getPaymentList(id) {
    this.pointService.getOrdersId(this.route.snapshot.params['id']).subscribe(payments => {
      this.orderPayments = payments;
    });
  }

  confirmClick(id) {
    this.router.navigate(['/PointZNet/PaymentConfirm', id]);
  }


}
