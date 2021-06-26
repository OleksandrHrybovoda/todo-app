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
  public pages: string[] = ['tasks', 'users'];

  constructor(private authService: AuthService) { }

  public ngOnInit(): void {
    this.username = this.authService.getCurrentUser().firstName;
  }

  public logout(): void {
    this.authService.logout();
  }

}
