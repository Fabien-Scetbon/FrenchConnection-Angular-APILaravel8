import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';

import { BoardAdminUsersComponent } from './admin/board-admin-users/board-admin-users.component';
import { BoardAdminProductsComponent } from './admin/board-admin-products/board-admin-products.component';

import { ProductPageComponent } from './product-page/product-page.component';
import { AddUserComponent } from './admin/user/add-user/add-user.component';
import { UsersListComponent } from './admin/user/users-list/users-list.component';
import { UserDetailsComponent } from './admin/user/user-details/user-details.component';

import { ProductsListComponent } from './admin/product/products-list/products-list.component';
import { ProductDetailsComponent } from './admin/product/product-details/product-details.component';
import { AddProductComponent } from './admin/product/add-product/add-product.component';

import { CartsListComponent } from './admin/cart/carts-list/carts-list.component';
import { CartDetailsComponent } from './admin/cart/cart-details/cart-details.component';
import { AddCartComponent } from './admin/cart/add-cart/add-cart.component';

import { CategoriesListComponent } from './admin/category/categories-list/categories-list.component';
import { CategoryDetailsComponent } from './admin/category/category-details/category-details.component';
import { AddCategoryComponent } from './admin/category/add-category/add-category.component';

import { ProductsResultComponent } from './products-result/products-result.component';

import { TutorialsListComponent } from './tutorials-list/tutorials-list.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'tutorials', component: TutorialsListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'admin/board/users', component: BoardAdminUsersComponent },
  { path: 'admin/board/products', component: BoardAdminProductsComponent },

  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'admin/users_list', component: UsersListComponent },
  { path: 'admin/add_user', component: AddUserComponent },
  { path: 'admin/user_detail/:id', component: UserDetailsComponent },
  { path: 'admin/products', component: ProductsListComponent },
  { path: 'admin/products/:id', component: ProductDetailsComponent },
  { path: 'admin/addproduct', component: AddProductComponent },
  { path: 'admin/carts', component: CartsListComponent },
  { path: 'admin/carts/:id', component: CartDetailsComponent },
  { path: 'admin/addcart', component: AddCartComponent },
  { path: 'admin/categories', component: CategoriesListComponent },
  { path: 'admin/categories/:id', component: CategoryDetailsComponent },
  { path: 'admin/addcategory', component: AddCategoryComponent },

  { path: 'product_page/:id', component: ProductPageComponent },
  { path: 'product_result', component: ProductsResultComponent },


  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
