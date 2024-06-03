import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable, map, shareReplay } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { UserAuthService } from '../../services/user-auth.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  private breakpointObserver = inject(BreakpointObserver);
  private userAuthService = inject(UserAuthService);
  private router = inject(Router);
  private themeService = inject(ThemeService);

  links = [
    { name: 'Dashboard', link: 'dashboard' },
    { name: 'Category', link: 'category' },
    { name: 'Products', link: 'products' },
    { name: 'Orders', link: 'orders' },
  ];

  constructor() {}
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result: any) => result.matches),
      shareReplay()
    );

  logout() {
    this.userAuthService.logout();
    this.router.navigate(['login']);
  }

  changeTheme() {
    this.themeService.changeTheme();
  }
  isDark(): boolean {
    return localStorage.getItem('theme') === 'dark' ? true : false;
  }
}
