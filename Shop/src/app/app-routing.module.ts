import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomPageComponent } from './page/pageUser/hom-page/hom-page.component';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import { SigninComponent } from './page/pageUser/signin/signin.component';
import { SignupComponent } from './page/pageUser/signup/signup.component';
import { ErrorPagesComponent } from './page/error-pages/error-pages.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { DashBroadComponent } from './page/pageAdmin/dash-broad/dash-broad.component';
import { ListProductsComponent } from './page/pageAdmin/products/list-products/list-products.component';
import { ProductDetailComponent } from './page/pageUser/product-detail/product-detail.component';
import { AddProductsComponent } from './page/pageAdmin/products/add-products/add-products.component';
import { EditProductsComponent } from './page/pageAdmin/products/edit-products/edit-products.component';
import { DetailProductComponent } from './page/pageAdmin/products/detail-product/detail-product.component';
import { AuthGuard } from './auth.guard';
import { ListCategoryComponent } from './page/pageAdmin/categorys/list-category/list-category.component';
import { AddCategoryComponent } from './page/pageAdmin/categorys/add-category/add-category.component';
import { EditCategoryComponent } from './page/pageAdmin/categorys/edit-category/edit-category.component';
import { DetailCategoryComponent } from './page/pageAdmin/categorys/detail-category/detail-category.component';
import { ListUserComponent } from './page/pageAdmin/users/list-user/list-user.component';
import { EditUserComponent } from './page/pageAdmin/users/edit-user/edit-user.component';
import { CartComponent } from './page/pageUser/cart/cart.component';
import { CheckoutComponent } from './page/pageUser/checkout/checkout.component';
import { OrderSuccessComponent } from './page/pageUser/order-success/order-success.component';

const routes: Routes = [
  {
    path: '', component: UserLayoutComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomPageComponent },
      { path: 'detail/:id', component: ProductDetailComponent },
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'oder/:id', component: OrderSuccessComponent },



    ]
  },
  {
    path: 'admin', component: AdminLayoutComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashBroadComponent },
      { path: 'products', component: ListProductsComponent },
      { path: 'products/add', component: AddProductsComponent },
      { path: 'products/:id/edit', component: EditProductsComponent },
      { path: 'products/:id/detail', component: DetailProductComponent },
      { path: 'category', component: ListCategoryComponent },
      { path: 'category/add', component: AddCategoryComponent },
      { path: 'category/:id/edit', component: EditCategoryComponent },
      { path: 'category/:id/detail', component: DetailCategoryComponent },
      { path: 'user', component: ListUserComponent },
      { path: 'user/:id/edit', component: EditUserComponent },

    ]
  },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: '**', component: ErrorPagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
