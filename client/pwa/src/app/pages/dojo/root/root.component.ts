import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'momo-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {
  param: {[key: string]: any} = {
    value: 'Dojo'
  };

  constructor() { }

  ngOnInit() {
  }

}
