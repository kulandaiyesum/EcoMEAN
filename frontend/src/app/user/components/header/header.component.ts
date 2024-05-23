import { UserAuthService } from './../../../services/user-auth.service';
import { NgClass, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  hideMenu: boolean = true;
  userSubscription: Subscription = new Subscription();
  user: any = {};
  private userAuthService = inject(UserAuthService);
  private themeService = inject(ThemeService);
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.userAuthService.getUserByToken().subscribe();
      this.userSubscription = this.userAuthService.userObserver$.subscribe(
        (user: any) => {
          this.user = user;
        }
      );
    }
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
  changeTheme() {
    this.themeService.changeTheme();
  }
  isDark(): boolean {
    return localStorage.getItem('theme') === 'dark' ? true : false;
  }

  showMenus() {
    this.hideMenu = !this.hideMenu;
  }

  isUser(): boolean {
    return this.userAuthService.isUser();
  }

  logout() {
    this.userAuthService.logout();
  }
}
