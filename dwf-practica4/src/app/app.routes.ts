import { Routes } from '@angular/router';

import { ProductImageComponent } from './modules/product/component/product-image/product-image.component';
import { CategoryComponent } from './modules/product/component/category/category.component';
import { RegionComponent } from './modules/customer/component/region/region.component';
import { LoginComponent } from './modules/auth/component/login/login.component';
import { RegisterComponent } from './modules/auth/component/register/register.component';
import { SecuredComponent } from './modules/auth/component/secured/secured.component';
import { adminGuard, authenticationGuard } from './modules/auth/authentication.guard';
import { ProductComponent } from './modules/product/component/product/product.component';
import { HomeComponent } from './modules/layout/component/home/home.component';
import { InvoiceComponent } from './modules/invoice/component/invoice/invoice.component';
import { CartComponent } from './modules/invoice/component/cart/cart.component';
import { ProductByCategoryComponent } from './modules/product/component/product-by-category/product-by-category.component';

export const routes: Routes = [
    { 
        path: "", 
        component: HomeComponent 
    },
    { 
        path: "category", 
        component: CategoryComponent,
        canActivate: [adminGuard]
    },
    { 
        path: "category/:category_id",
        component: ProductByCategoryComponent
    },
    { 
        path: "product",
        component: ProductComponent,
        canActivate: [adminGuard]
    },
    { 
        path: "product/:gtin", 
        component: ProductImageComponent
    },
    {
        path: 'region',
        component: RegionComponent,
        canActivate: [adminGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'secured',
        component: SecuredComponent, 
        canActivate: [authenticationGuard]
    },
    { 
        path: 'invoice',
        component: InvoiceComponent
    },
    {
        path: 'cart',
        component: CartComponent
    }

];