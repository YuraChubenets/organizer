import { Component, OnInit } from '@angular/core';
import { DateService } from '../shared/date.service';
//import {LogService} from "../shared/log.service";
import * as moment from 'moment';
import { Task, TaskService } from '../shared/tasks.service';
import { BehaviorSubject, interval, pipe, from } from 'rxjs';
import { filter, map, reduce, switchMap, take } from 'rxjs/operators';


interface Day{
  value: moment.Moment;
  active: boolean;
  disabled: boolean;
  selected: boolean;
  isRead: number;
}

interface Week {
  days: Day[]
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {

  tasks: Task [];
  calendar: Week[];
  date: BehaviorSubject<moment.Moment>;

  constructor( private dateService: DateService ,
    private taskService: TaskService) { }

    ngOnInit(): void {

     this.dateService.getData().subscribe((m) => {this.generate(m)});
    }

  generate(now: moment.Moment) {
    const startDay = now.clone().startOf('month').startOf('week')
    const endDay = now.clone().endOf('month').endOf('week')
    const date = startDay.clone().subtract(0, 'day');
    const calendar = [];

    //----------------------
    this.taskService.loadTasksByDay(now)
    .pipe(
       reduce((count, tasks)=>{
        this.tasks=tasks;
        for(var i in tasks){
            if(tasks[i].isRead===false)
            count++
        }
      return count
     }, 0)
    ).subscribe(d=> console.log(d));
//----------------------------------
    while (date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {

            const value = date.add(1, 'day').clone()
            const active = moment().isSame(value, 'date')
            const disabled = !now.isSame(value, 'month')
            const selected = now.isSame(value, 'date')

            return {
              value, active, disabled, selected
            }

          })
      })
    }

    this.calendar = calendar
  }

  select(day: moment.Moment) {
    this.dateService.changeDate(day)
  }

}
