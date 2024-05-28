import { UserAuthService } from './../../../services/user-auth.service';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ThemeService } from '../../../services/theme.service';
import { User } from '../../../model/user';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, NgClass, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  hideMenu: boolean = true;
  user: User | null = null;
  private userAuthService = inject(UserAuthService);
  private themeService = inject(ThemeService);
  private cartService = inject(CartService);
  cartItemsCount: number = 0;

  ngOnInit(): void {
    this.user = this.userAuthService.getUser();
    if (this.user) {
      this.cartService.getCartDetails();
      this.cartService.cartData$.subscribe((data) => {
        this.cartItemsCount = data.length;
      });
    }
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
