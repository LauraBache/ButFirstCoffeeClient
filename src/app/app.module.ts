import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {UIRouterModule} from "@uirouter/angular";
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './core/home.component';
import { AboutComponent } from './core/about.component';
import { OrderProductComponent } from './features/order-product/order-product.component';

import { BeverageCategoryImagePipe } from './pipes/beverage-category-image.pipe';

import { SaleService } from './features/order-product/services/sale.service';
import { BeverageCategoryService } from './features/order-product/services/beverage-category.service';
import { BeverageService } from './features/order-product/services/beverage.service';
import { CondimentService } from './features/order-product/services/condiment.service';
import { OrderService } from './features/order-product/services/order.service';
import { OrderItemService } from './features/order-product/services/order-item.service';

let homeState = { name: 'home', url: '',  component: HomeComponent }; 
let aboutState = { name: 'about', url: '/about',  component: AboutComponent };
let orderProductState = { name: 'orderproduct', url: '/order-product', component: OrderProductComponent };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    OrderProductComponent,
    BeverageCategoryImagePipe
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    UIRouterModule.forRoot({ states: [ homeState, aboutState, orderProductState ], useHash: true }),
    // import HttpModule after BrowserModule
    HttpClientModule,
  ],
  providers: [SaleService, BeverageCategoryService, BeverageService, CondimentService, OrderService, OrderItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
