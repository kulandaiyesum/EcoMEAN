import { UserAuthService } from './../../../services/user-auth.service';
import { NgClass, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../../services/theme.service';
import { User } from '../../../model/user';

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
  user: User | null = null;
  private userAuthService = inject(UserAuthService);
  private themeService = inject(ThemeService);
  ngOnInit(): void {
    this.user = this.userAuthService.getUser();
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
