import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'momo-keep-records',
  templateUrl: './keep-records.component.html',
  styleUrls: ['./keep-records.component.scss']
})
export class KeepRecordsComponent implements OnInit {
  param: {[key: string]: any} = {
    value: 'Dojo'
  };
  today: Date = new Date;
  price: number = null;
  name: string = '';

  constructor() { }

  ngOnInit() {
  }

}
