import { Routes } from '@angular/router';
import { HomeComponent } from './user/pages/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotpasswordComponent } from './auth/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './auth/resetpassword/resetpassword.component';
import { InformationComponent } from './auth/information/information.component';
import { ForbiddenComponent } from './errors/forbidden/forbidden.component';
import { UserComponent } from './layout/user/user.component';
import { AdminComponent } from './layout/admin/admin.component';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { ContactUsComponent } from './user/pages/contact-us/contact-us.component';
import { routeGuard } from './utils/route.guard';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProductsComponent } from './admin/products/products.component';
import { CategoryComponent } from './admin/category/category.component';
import { CartComponent } from './user/pages/cart/cart.component';

export const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'Home' },
      {
        path: 'contact-us',
        component: ContactUsComponent,
        title: 'Contact Us',
      },
      {
        path: 'cart',
        component: CartComponent,
        title: 'Cart',
        // canActivate: [routeGuard],
        // data: { role: 'USER' },
      },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [routeGuard],
    data: { role: 'ADMIN' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'category', component: CategoryComponent },
    ],
  },

  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent,
    title: 'Forgot Password?',
  },
  {
    path: 'password_reset',
    component: ResetpasswordComponent,
    title: 'Reset Password',
  },
  {
    path: 'password_reset/:token',
    component: ResetpasswordComponent,
    title: 'Reset Password',
  },
  {
    path: 'info',
    component: InformationComponent,
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
    title: 'Forbidden',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: 'Page Not Found',
  },
];