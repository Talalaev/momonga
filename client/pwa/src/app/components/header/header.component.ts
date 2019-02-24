import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'momo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
