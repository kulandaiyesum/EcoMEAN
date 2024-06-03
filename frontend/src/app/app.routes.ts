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
import { ProductViewComponent } from './user/pages/product-view/product-view.component';
import { BuyProductComponent } from './user/pages/buy-product/buy-product.component';
import { productResolver } from './utils/product.resolver';
import { buyProductResolver } from './utils/buy-product.resolver';
import { SuccessComponent } from './user/pages/success/success.component';
import { FailedComponent } from './user/pages/failed/failed.component';
import { OrdersComponent } from './admin/orders/orders.component';

export const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'Home - EcoMEAN' },
      {
        path: 'contact-us',
        component: ContactUsComponent,
        title: 'Contact Us - EcoMEAN',
      },
      {
        path: 'cart',
        component: CartComponent,
        title: 'Cart - EcoMEAN',
        canActivate: [routeGuard],
        data: { role: 'USER' },
      },
      {
        path: 'product/:id',
        component: ProductViewComponent,
        canActivate: [routeGuard],
        data: { role: 'USER' },
        resolve: {
          product: productResolver,
        },
      },
      {
        path: 'buyProduct',
        component: BuyProductComponent,
        canActivate: [routeGuard],
        data: { role: 'USER' },
        resolve: {
          productDetails: buyProductResolver,
        },
      },
      {
        path: 'success',
        component: SuccessComponent,
        title: 'Payment success - EcoMEAN',
      },
      {
        path: 'failure',
        component: FailedComponent,
        title: 'Payment failed -EcoMEAN',
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
      { path: 'orders', component: OrdersComponent },
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
