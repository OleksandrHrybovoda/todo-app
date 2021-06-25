import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  @Input() pageName: string;

  public username: string;

  constructor(private authService: AuthService) { }

  public ngOnInit(): void {
    this.username = this.authService.getLoggedInUser();
  }

  public logout(): void {
    this.authService.logout();
  }

}
