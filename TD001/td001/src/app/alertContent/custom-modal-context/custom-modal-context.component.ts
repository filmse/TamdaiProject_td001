import {Component} from '@angular/core';

import {DialogRef, ModalComponent, CloseGuard} from 'angular2-modal';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap';

export class CustomModalContext extends BSModalContext {
}

/**
 * A Sample of how simple it is to create a new window, with its own injects.
 */
@Component({
  selector: 'modal-content',
  templateUrl: './custom-modal-context.component.html',
  styleUrls: ['./custom-modal-context.component.css']
  // //TODO: [ngClass] here on purpose, no real use, just to show how to workaround ng2 issue #4330.
  // // Remove when solved.
  // /* tslint:disable */ template: `
  //       <div class="container-fluid custom-modal-container">
  //           <div class="row custom-modal-header">
  //               <div class="col-sm-12">
  //                   <h1>A Custom modal design</h1>
  //               </div>
  //           </div>
  //           <div class="row" [ngClass]="{'myclass' : shouldUseMyClass}">
  //               <div class="col-xs-12">
  //                   <div class="jumbotron">
  //                       <h1>Do the math to quit:</h1>
  //                       <p class="lead">I received an injection of the number <strong>{{context.num1}}</strong> and the number <strong>{{context.num2}}</strong></p>
  //                       <span>What is the sum?</span>
  //                        <input class="form-control" type="text" #answer (keyup)="onKeyUp(answer.value)" autofocus>
  //                   </div>
  //               </div>
  //           </div>
  //       </div>`
})

export class CustomModalContextComponent implements CloseGuard, ModalComponent<CustomModalContext> {

  context: CustomModalContext;

  constructor(public dialog: DialogRef<CustomModalContext>) {
    this.context = dialog.context;
    dialog.setCloseGuard(this);
  }

  beforeDismiss(): boolean {
    return true; // prevent closing modal by using Esc
  }
}
