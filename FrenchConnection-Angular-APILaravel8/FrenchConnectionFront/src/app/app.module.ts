import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatSelectModule,} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminUsersComponent } from './admin/board-admin-users/board-admin-users.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from '../_helpers/auth.interceptor';
import { ProductPageComponent } from './product-page/product-page.component';
import { AddUserComponent } from './admin/user/add-user/add-user.component';
import { UserDetailsComponent } from './admin/user/user-details/user-details.component';
import { UsersListComponent } from './admin/user/users-list/users-list.component';
import { ProductDetailsComponent } from './admin/product/product-details/product-details.component';
import { ProductsListComponent } from './admin/product/products-list/products-list.component';
import { AddProductComponent } from './admin/product/add-product/add-product.component';
import { CartDetailsComponent } from './admin/cart/cart-details/cart-details.component';
import { CartsListComponent } from './admin/cart/carts-list/carts-list.component';
import { AddCartComponent } from './admin/cart/add-cart/add-cart.component';
import { CategoryDetailsComponent } from './admin/category/category-details/category-details.component';
import { CategoriesListComponent } from './admin/category/categories-list/categories-list.component';
import { AddCategoryComponent } from './admin/category/add-category/add-category.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { CategoryButtonComponent } from './components/category-button/category-button.component';
import { ProductsResultComponent } from './products-result/products-result.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TutorialsListComponent } from './tutorials-list/tutorials-list.component';
import { BoardAdminProductsComponent } from './admin/board-admin-products/board-admin-products.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminUsersComponent,
    BoardUserComponent,
    ProductPageComponent,
    AddUserComponent,
    UserDetailsComponent,
    UsersListComponent,
    ProductDetailsComponent,
    ProductsListComponent,
    AddProductComponent,
    CartDetailsComponent,
    CartsListComponent,
    AddCartComponent,
    CategoryDetailsComponent,
    CategoriesListComponent,
    AddCategoryComponent,
    NavbarComponent,
    CategoryButtonComponent,
    ProductsResultComponent,
    ProductCardComponent,
    TutorialsListComponent,
    BoardAdminProductsComponent,
    FooterComponent,
    
  ],
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
