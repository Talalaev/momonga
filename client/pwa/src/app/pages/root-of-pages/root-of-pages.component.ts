import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../shared/auth/auth.service';


@Component({
  selector: 'momo-root-of-pages',
  templateUrl: './root-of-pages.component.html',
  styleUrls: ['./root-of-pages.component.css']
})
export class RootOfPagesComponent implements OnInit {
  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {}

  checkLogin() {}
}
