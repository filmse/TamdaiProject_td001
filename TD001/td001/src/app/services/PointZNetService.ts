import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response, Headers} from '@angular/http';
import {AppComponent} from '../app.component';
import {PUser} from "../models/PUser";
import {Order} from "../models/Order";
import {Observable} from "rxjs/Observable";
import {User} from "../models/User";
import {BankStatement} from "../models/BankStatement";

@Injectable()
export class PointZNetService {

  constructor(private http: Http) {
  }

  createPayment(pUser: PUser) {
    const headers = new Headers({'Authorization': 'Bearer '});
    const options = new RequestOptions({headers: headers});

    return this.http.post(AppComponent.API_URL + 'pUser/order', pUser, options).map((response: Response) => response.json());
  }

  getOrders(): Observable<Order[]> {
    const headers = new Headers({'Authorization': 'Bearer '});
    const options = new RequestOptions({headers: headers});

    return this.http.get(AppComponent.API_URL + 'oderList', options).map((response: Response) => response.json());
  }

  getOrdersId(id): Observable<Order[]> {
    const headers = new Headers({'Authorization': 'Bearer '});
    const options = new RequestOptions({headers: headers});

    return this.http.get(AppComponent.API_URL + 'oderListById/' + '?userId=' + id, options).map((response: Response) => response.json());
  }

  getOrdersByStatus(status): Observable<Order[]> {
    const headers = new Headers({'Authorization': 'Bearer '});
    const options = new RequestOptions({headers: headers});

    return this.http.get(AppComponent.API_URL + 'getOrdersByStatus/' + '?status=' + status, options).map((response: Response) => response.json());
  }

  getPaymentsById(id): Observable<Order[]> {
    const headers = new Headers({'Authorization': 'Bearer '});
    const options = new RequestOptions({headers: headers});

    return this.http.get(AppComponent.API_URL + 'getPayment/' + id, options).map((response: Response) => response.json());
  }

  updatePayment(id, point, money, statementDate, statementTime, bankName) {
    const headers = new Headers({'Authorization': 'Bearer '});
    const options = new RequestOptions({headers: headers});

    return this.http.put(AppComponent.API_URL + 'updatePayment/' + id + '/' + '?point=' + point + '&' + 'money=' + money + '&' + 'statementDate=' + statementDate + '&' + 'statementTime=' + statementTime + '&' + 'bankName=' + bankName, options).map((response: Response) => response.json());
  }

  confirmBankStatement(id, userId, point, status) {
    const headers = new Headers({'Authorization': 'Bearer '});
    const options = new RequestOptions({headers: headers});

    return this.http.put(AppComponent.API_URL + 'confirmBankStatement/' + id + '/' + '?userId=' + userId + '&' + 'point=' + point + '&' + 'status=' + status, options).map((response: Response) => response.json());
  }

}
