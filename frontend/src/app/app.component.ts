import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './user/components/footer/footer.component';
import { HeaderComponent } from './user/components/header/header.component';
import { NgIf } from '@angular/common';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'my-app';
  private themeService = inject(ThemeService);
  ngOnInit(): void {
    this.checkTheme();
  }
  private checkTheme() {
    this.themeService.checkTheme();
  }

  // router = inject(Router);
  // activatedRoute = inject(ActivatedRoute);
  // routesToAviod = [
  //   '/login',
  //   '/register',
  //   '/forgotpassword',
  //   '/password_reset',
  //   '/info',
  //   '/forbidden',
  //   '/404',
  // ];
  // hideHeaderFooter: boolean = false;

  // ngOnInit(): void {
  // this.router.events.subscribe((event) => {
  //   if (event instanceof NavigationEnd) {
  //     const urlSegments = event.url.split('?')[0].match(/\/?[^\/]+/g) || '';
  //     this.hideHeaderFooter = this.routesToAviod.includes(urlSegments[0]);
  //   } else {
  //     this.hideHeaderFooter = false;
  //   }
  // });
  // }
}
