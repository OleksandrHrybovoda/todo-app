import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {

  @Input() pageName: string;

  public username: string = this.authService.getLoggedInUser();

  constructor(private authService: AuthService) { }

  public logout(): void {
    this.authService.logout();
  }

}
