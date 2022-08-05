import { Component, OnInit } from '@angular/core';
import { LessonsService } from '../common/services/lessons.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  courseLessons$;
  courseLessons = [];

  selectedLesson: any;

  constructor(private lessonsService: LessonsService) {}

  ngOnInit() {
    this.courseLessons = this.lessonsService.lessons;
    this.courseLessons$ = Array.of(this.lessonsService.lessons$);
  }

  selectLesson(lesson) {
    this.selectedLesson = lesson;
  }

  deleteLesson(lesson) {}
}
