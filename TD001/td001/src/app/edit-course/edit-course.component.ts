import { Component, OnInit } from '@angular/core';
import { Course } from '../models/Course';
import { CourseService } from '../services/CourseService';
import { UserService } from '../services/User.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/User';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  courses: Course[] = [];
  currentUser: User;
  users: User[] = [];
  userId: any;
  textPublic = 'true';

  constructor(private courseService: CourseService,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getCourseList();
    // this.getUserList();
    this.courses.sort(function (id1, id2) {
      if (id1.id < id2.id) {
        return -1;
      } else if (id1.id > id2.id) {
        return 1;
      } else {
        return 0;
      }
    });

    // this.getUserList();
  }


  RobomindCreate() {
    this.router.navigate(['/RobomindCreate']);
  }

  RoboticName() {
    console.log('ddddddddddd');
    this.router.navigate(['/createRobotic']);
  }

  private getCourseList() {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  private getUserList() {
    this.userService.getAll().subscribe(users => {
      this.users = users;
    });
  }

  EditCourse(id) {
    console.log('Edit');
    this.router.navigate(['/EditCourse', id]);
  }

  DeleteCourse(id) {
    console.log(id);
    this.courseService.DeleteCourse(id).subscribe(
      data => {
        alert('Success');
        location.reload();
      },
      error => {
        alert('Error');
      });
  }

  click(id) {
    this.router.navigate(['/CourseLists', id]);
  }

}
