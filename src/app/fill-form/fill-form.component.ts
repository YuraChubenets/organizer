import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-fill-form',
  templateUrl: './fill-form.component.html',
  styleUrls: ['./fill-form.component.scss']
})
export class FillFormComponent implements OnInit {

  constructor() { }

  @Input() formData:any;

  FormId: string;
  FormName: string;

  ngOnInit(): void {

  }

}
