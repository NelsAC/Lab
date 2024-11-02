import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  // {
  //   path: '**',
  //   redirectTo: '/products'
  // },
  {
    path: 'add-product',
    component: ProductFormComponent
  },
  {
    path: 'add-product/:id',
    component: ProductFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
