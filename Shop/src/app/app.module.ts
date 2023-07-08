import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from "ngx-pagination";
import { NgSelectModule } from '@ng-select/ng-select';



import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import { HomPageComponent } from './page/pageUser/hom-page/hom-page.component';
import { SignupComponent } from './page/pageUser/signup/signup.component';
import { SigninComponent } from './page/pageUser/signin/signin.component';
import { DashBroadComponent } from './page/pageAdmin/dash-broad/dash-broad.component';
import { ListProductsComponent } from './page/pageAdmin/products/list-products/list-products.component';
import { AddProductsComponent } from './page/pageAdmin/products/add-products/add-products.component';
import { EditProductsComponent } from './page/pageAdmin/products/edit-products/edit-products.component';
import { ErrorPagesComponent } from './page/error-pages/error-pages.component';
import { ProductDetailComponent } from './page/pageUser/product-detail/product-detail.component';
import { DetailProductComponent } from './page/pageAdmin/products/detail-product/detail-product.component';
import { ListCategoryComponent } from './page/pageAdmin/categorys/list-category/list-category.component';
import { AddCategoryComponent } from './page/pageAdmin/categorys/add-category/add-category.component';
import { EditCategoryComponent } from './page/pageAdmin/categorys/edit-category/edit-category.component';
import { DetailCategoryComponent } from './page/pageAdmin/categorys/detail-category/detail-category.component';
import { ListUserComponent } from './page/pageAdmin/users/list-user/list-user.component';
import { EditUserComponent } from './page/pageAdmin/users/edit-user/edit-user.component';
import { CartComponent } from './page/pageUser/cart/cart.component';
import { CheckoutComponent } from './page/pageUser/checkout/checkout.component';
import { OrderSuccessComponent } from './page/pageUser/order-success/order-success.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    UserLayoutComponent,
    HomPageComponent,
    SignupComponent,
    SigninComponent,
    DashBroadComponent,
    ListProductsComponent,
    AddProductsComponent,
    EditProductsComponent,
    ErrorPagesComponent,
    ProductDetailComponent,
    DetailProductComponent,
    ListCategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    DetailCategoryComponent,
    ListUserComponent,
    EditUserComponent,
    CartComponent,
    CheckoutComponent,
    OrderSuccessComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDropzoneModule,
    NgxPaginationModule,
    NgSelectModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
