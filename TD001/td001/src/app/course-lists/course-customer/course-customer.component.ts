import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { CourseService } from '../../services/CourseService';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/User.service';
import { Http } from '@angular/http';
import { User } from '../../models/User';
import { AppComponent } from '../../app.component';

import { BSModalContext, Modal } from 'angular2-modal/plugins/bootstrap';
import { overlayConfigFactory } from 'angular2-modal';
import { CustomModalContextComponent } from '../../alertContent/custom-modal-context/custom-modal-context.component';

@Component({
  selector: 'app-course-customer',
  templateUrl: './course-customer.component.html',
  styleUrls: ['./course-customer.component.css'],
  providers: [Modal]
})
export class CourseCustomerComponent implements OnInit {

  url = AppComponent.API_URL;

  @ViewChild('iframe') iframe: ElementRef;
  @ViewChild('videoPlayer') videoplayer: any;
  jsonp: any;
  courses: any = [];
  course: any = {};
  coursesList: any = [];
  coursesPurchaseed: any = [];
  users: any = [];
  image = 'image';
  video = 'video';
  text = 'text';
  truePreview = 'true';
  falsePreivew = 'false';
  statusInstructor = 'instructor';
  statusActive = 'active';
  admin = 'admin';
  // users: User[] = [];
  currentUser: User;
  userId: any;
  purchaseCart: any = {};
  carts: any = [];
  pathId = this.route.snapshot.params['id'];
  userBalance: any;
  coursePrice = 30;
  result: any;
  balance: any;
  empty = 'null';
  historyIns: any = [];
  userIdPurchase: any;
  zero = '0';
  one = '1';
  ipObj: any = [];
  textPublic = 'true';
  nullText = 'null';
  textNull = 'null';
  value: any;

  loading = true;
  show = false;

  sources: Array<Object>;
  controls: boolean = false;
  autoplay: boolean = false;
  loop: boolean = false;
  preload: string = 'auto';
  nativeFs: boolean = true;

  id = 'qDuKsiwS5xw';
  private player;
  private ytEvent;
  private stEvent;

  ShowIp = false;
  pdfUrl;

  // public version = config.map['ngx-youtube-player'].split('@')[1];

  constructor(private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private http: Http,
    public modal: Modal, private sanitizer: DomSanitizer) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  onStateChange(event) {
    this.ytEvent = event.data;
    this.stEvent = this.player.getVideoUrl();
  }

  savePlayer(player) {
    this.player = player;
  }

  playVideo() {
    this.player.playVideo();
  }

  pauseVideo() {
    this.player.pauseVideo();
  }

  open() {
    this.http.get('//api.ipify.org?format=json')
      .subscribe(response => {
        this.ipObj = response;
        console.log(this.ipObj);
      });
    //     // this.http.get(this.url + 'getClientIp')
    //     //   .subscribe(response => {
    //     //     this.ipObj = response;
    //     //     //console.log(this.ipObj);
    //     //   });
  }

  PauseYoutube(videoPath) {
    console.log('Close Video Youtube: ' + videoPath);
    const frame: HTMLIFrameElement = <HTMLIFrameElement>document.getElementById(videoPath);
    // console.log(myVideo);
    // const frame = document.getElementById('player');
    // console.log(frame);
    frame.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
  }

  playPause(id) {
    console.log('Close Video : ' + id);
    // let inputFields = document.getElementsByClassName('settings') as HTMLInputElement
    const myVideo: HTMLVideoElement = <HTMLVideoElement>document.getElementById(id);
    if (myVideo.paused) {
      myVideo.pause();
    } else {
      myVideo.pause();
    }
  }

  ngOnInit() {
    // this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://github.com/Paritasshai/TD001/blob/master/td001/README.md');
    setTimeout(() => {
      this.loading = false;
      this.show = true;
    }, 3000);

    this.getCoursesById();
    this.getUserList();
    this.getCourseList();
    this.open();
  }

  openCustom() {
    return this.modal.open(CustomModalContextComponent, overlayConfigFactory({ num1: 2, num2: 3 }, BSModalContext));
  }

  getUserList() {
    this.userService.getAll().subscribe(users => {
      this.users = users;
    });
  }

  getCourseList() {
    this.courseService.getCourseItemsByPublic(this.textPublic).subscribe(courses => {
      this.coursesList = courses;
    });
  }

  getCoursesById() {
    this.courseService.getCoursesById(this.route.snapshot.params['id']).subscribe(courses => {
      this.courses = courses;
    });
  }

  TeacherHistory(email) {
    // console.log(email);
    // console.log('Get Teacher History');
    this.courseService.getTeacherHistory(email)
      .subscribe(historyIns => {
        this.historyIns = historyIns;
        // console.log(this.historyIns);
      });
  }

  click(id) {
    this.router.navigate(['/CourseLists', id]);
    location.reload();
  }

  buyyy() {
    return this.modal.open(CustomModalContextComponent, overlayConfigFactory({ num1: 2, num2: 3 }, BSModalContext));
  }

  insProfile(id) {
    console.log(id);
    this.router.navigate(['/insProfile', id]);
  }

}
