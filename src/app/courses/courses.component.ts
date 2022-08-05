import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../common/models/course';
import { CoursesService } from '../common/services/courses.service';

const emptyCourse: Course = {
  id: null,
  title: '',
  description: '',
  favorite: false,
  percentComplete: 0,
};

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  //1. render courses in a list
  // 2. Select a course
  // 3. Render Selected course
  constructor(private coursesService: CoursesService) {}

  courses = [];
  courses$: any; //Observable<Course[]>;

  selectedCourse = { ...emptyCourse };
  originalTitle = '';

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses() {
    this.courses$ = this.coursesService.all();

    // this.coursesService
    //   .all()
    //   .subscribe((result: any) => (this.courses = result));
  }

  selectCourse(course) {
    this.originalTitle = course.title;
    this.selectedCourse = course;
  }

  saveCourse(course) {
    console.log(course);
    if (course.id) {
      this.updateCourse(course);
    } else {
      this.createCourse(course);
    }
  }

  createCourse(course) {
    this.coursesService
      .create(course)
      .subscribe((result) => this.fetchCourses());
  }
  updateCourse(course) {
    this.coursesService
      .update(course)
      .subscribe((result) => this.fetchCourses());
  }

  deleteCourse(courseId: number) {
    console.log('DELETE COURSE', courseId);
  }

  reset() {
    this.selectCourse({ ...emptyCourse });
  }
}
