import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { DateService } from '../shared/date.service';
import { FormGroup, FormControl, Validators} from "@angular/forms";
import { Task, TaskService } from '../shared/tasks.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  date: BehaviorSubject<moment.Moment>;
  form: FormGroup;
  tasks: Task[] = [];



  ModalTitle: string;
  ActiveForm: boolean=false;
  formData: any;


  constructor(private dateService: DateService,
    private taskService: TaskService) { }

  ngOnInit(): void {

    this.date = this.dateService.getData();

    this.date.pipe(
      switchMap( (value) => {
         return  this.taskService.loadTasksByDay(value); })
      ).subscribe( tasks => {
        this.tasks = tasks;
     })

    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  submit(){

    const {title} = this.form.value;

    const task: Task = {
      title,
      date: this.dateService.getData().value.format("DD-MM-YYYY"),
      isRead: false
      }


    this.taskService.create(task).subscribe(task =>{
      this.form.reset();
      this.tasks.push(task);
    },
      err =>{  console.error(err);
    })
  }

  remove(task: Task){
   this.taskService.remove(task).subscribe(()=>{
   this.tasks=this.tasks.filter( t=> t.id !== task.id)
   } , err=>{ console.error(err) })
  }



addClick()
{

  this.ModalTitle = "Title...Some..NNNNNN"

}


addClose()
{


}

}
