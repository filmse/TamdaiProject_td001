import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PointZNetService} from "../services/PointZNetService";

@Component({
  selector: 'app-pointznet',
  templateUrl: './pointznet.component.html',
  styleUrls: ['./pointznet.component.css']
})
export class PointznetComponent implements OnInit {

  PUser: any = {};
  ImgLogo: string;

  constructor(private router: Router,
              private pointService: PointZNetService,
              private route: ActivatedRoute) {
    this.ImgLogo = '../../../assets/images/pointznet.png';
  }

  deviceObjects = [{id: 0, name: 100, description: 'ได้ 100 แต้ม', amount: '100'}, {
    id: 1,
    name: 300,
    description: 'ได้ 350 แต้ม', amount: '350'
  }, {id: 2, name: 500, description: 'ได้ 600 แต้ม', amount: '600'}];

  selectedDeviceObj = this.deviceObjects[0];

  onChangeObj(newObj) {
    console.log(newObj);
    this.selectedDeviceObj = newObj;
  }

  ngOnInit() {
    this.PUser.current = this.route.snapshot.params['currentPoint'];
    this.PUser.userId = this.route.snapshot.params['userId'];
  }

  Confirm() {
    this.PUser.money = this.selectedDeviceObj.name;
    this.PUser.point = this.selectedDeviceObj.amount;
    this.PUser.userId = this.route.snapshot.params['userId'];
    this.PUser.status = "1";

    this.pointService.createPayment(this.PUser)
      .subscribe(
        data => {
          //alert('create success');
          this.router.navigate(['/PointZNet/PaymentOrder', this.PUser.userId]);
        },
        error => {
          alert('create Failed!!');
        });
  }


}
