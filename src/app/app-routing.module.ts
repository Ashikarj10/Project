import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { SupplierInfoComponent } from './supplier-info/supplier-info.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { EditAssetComponent } from './edit-asset/edit-asset.component';
import { EditSupplierComponent } from './edit-supplier/edit-supplier.component';
import { CanActivateGuard } from './auth.guard';

const routes: Routes =[
  {
    path:'',
    component:HomePageComponent
  },
  {
  path: 'login',
  component:HomeComponent, canActivate: [CanActivateGuard]
},
{ 
  path: 'add', 
  component: AddComponent , canActivate: [CanActivateGuard]
},
{ 
  path: 'view', 
  component: ViewComponent , canActivate: [CanActivateGuard]
},
{ 
  path: 'suppliers', 
  component: SupplierInfoComponent, canActivate: [CanActivateGuard] 
},
{
  path: 'add-supplier', 
  component: AddSupplierComponent , canActivate: [CanActivateGuard]
},
{ path: 'edit/:id',
 component: EditAssetComponent, canActivate: [CanActivateGuard] },
 {
  path: 'edit-supplier/:id', 
  component: EditSupplierComponent , canActivate: [CanActivateGuard]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  exports: [RouterModule]
})
export class AppRoutingModule { }
