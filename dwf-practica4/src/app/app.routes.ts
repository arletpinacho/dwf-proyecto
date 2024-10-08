import { Routes } from '@angular/router';
import { CategoryComponent } from './modules/product/component/category/category.component';
import { LoginComponent } from './modules/auth/component/login/login.component';

export const routes: Routes = [
    { path: "categoria", component: CategoryComponent },
    { path: "log-in", component: LoginComponent }
];