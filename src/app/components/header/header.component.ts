import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { AuthStorageService } from 'src/app/services/auth-storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { Language } from './language.model';
import { Page } from './page.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  @Input() pageName: string;

  public username: string;
  public pages: Page[] = [
  {
    url: 'tasks',
    name: 'Tasks'
  },
  {
    url: 'users',
    name: 'Users'
  }];
  public languageList: Language[] = [
    { code: 'en', label: 'English' },
    { code: 'ua', label: 'Ukraine' }
  ];

  constructor(private authStorageService: AuthStorageService,
              private authService: AuthService,
              @Inject(LOCALE_ID) protected localeId: string
              ) { }

  public ngOnInit(): void {
    this.username = this.authStorageService.getCurrentUser().firstName;
  }

  public logout(): void {
    this.authService.logout();
  }

}
