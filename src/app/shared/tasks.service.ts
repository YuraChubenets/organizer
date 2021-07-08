import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { map} from 'rxjs/operators';
import { Observable } from 'rxjs';


export interface Task{
id?: string;
title: string;
date?: string;
isRead?: boolean;
}

interface CreateResponse{
  name: string;
}


@Injectable( {providedIn: 'root'} )

export class TaskService{

static url="https://angular-practice-calenda-18390.firebaseio.com/tasks";

constructor( private _http: HttpClient){
}


loadTasks() {
  return this._http
  .get<Task[]>(`${TaskService.url}.json`)
  .pipe(map(tasks => {
    if (!tasks) {
      return []
    }
    return tasks
  }))
}


loadTasksByDay(date: moment.Moment): Observable<Task[]> {
  return this._http
    .get<Task[]>(`${TaskService.url}/${date.format('DD-MM-YYYY')}.json`)
    .pipe( map(tasks => {

      if (!tasks) {
        return []
      }
      return Object.keys(tasks).map(key => ({...tasks[key], id: key }))
    }))
}


create(task: Task): Observable<Task> {
  return this._http
    .post<CreateResponse>(`${TaskService.url}/${task.date}.json`, task)
    .pipe(map(res => {
      return {...task, id: res.name }
    }))
}


remove(task: Task): Observable<void> {
  return this._http
    .delete<void>(`${TaskService.url}/${task.date}/${task.id}.json`)
}

}
