import {Injectable} from '@angular/core';
import * as moment from 'moment'
import {BehaviorSubject} from 'rxjs';
import {LogService} from './log.service';

@Injectable({
    providedIn: 'root'
})

export class DateService {

   constructor(private logService: LogService){}
   private date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());

   public getData(): BehaviorSubject<moment.Moment> {

    return  this.date;

    }

    public changeMonth(dir: number) {
      const value = this.date.value.add(dir, 'month')
      this.date.next(value);

    }

    public changeDate(date: moment.Moment) {
      const value = this.date.value.set({
        date: date.date(),
        month: date.month()
      });
      this.date.next(value);
    }
  }
