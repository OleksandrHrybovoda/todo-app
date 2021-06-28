import { Component, Input, OnInit } from '@angular/core';
import { AuthStorageService } from 'src/app/services/auth-storage.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  @Input() pageName: string;

  public username: string;

  constructor(private authStorageService: AuthStorageService,
              private authService: AuthService
              ) { }

  public ngOnInit(): void {
    this.username = this.authStorageService.getCurrentUser().firstName;
  }

  public logout(): void {
    this.authService.logout();
  }

}
