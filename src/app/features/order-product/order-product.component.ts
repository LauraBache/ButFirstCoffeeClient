import {Component, OnInit } from '@angular/core';

import { Beverage } from './models/beverage';
import { BeverageCategory } from './models/beverage-category';
import { Condiment } from './models/condiment'
import { Order } from './models/order';
import { OrderItem } from './models/order-item';
import { Sale } from './models/sale';

import { BeverageCategoryImagePipe } from '../../pipes/beverage-category-image.pipe';

import { SaleService } from './services/sale.service';
import { BeverageCategoryService } from './services/beverage-category.service';
import { BeverageService } from './services/beverage.service';

@Component({
  selector: 'app-order-product',
  templateUrl: 'order-product.component.html',
  styleUrls: ['order-product.component.css']
})
export class OrderProductComponent implements OnInit {

  sales: Sale[] = [];
  
  beverageCategories: BeverageCategory[] = [];
  selectedCategory: BeverageCategory;

  beverages: Beverage[];
  selectedBeverages: Beverage[];
  selectedBeverage: Beverage;

  currentOrder: Order;
  currentOrderItem: OrderItem;

  constructor(private saleService: SaleService, private beverageCategoryService: BeverageCategoryService, private beverageService: BeverageService) { }

  getSales(): void {
    this.saleService.getSales()
      .subscribe(sales => {
          this.sales = sales;
      });
  }

  getBeverageCategories(): void {
    this.beverageCategoryService.getBeverageCategories()
      .subscribe(categories => {
          this.beverageCategories = categories;

          if (this.beverageCategories && this.beverageCategories.length > 0)
          {
            this.selectedCategory = this.beverageCategories[0];
            this.getBeverages();
          }
      });
  }

  getBeverages(): void {
    this.beverageService.getBeverages()
      .subscribe(beverages => {
          this.beverages = beverages;
          this.selectedBeverages = this.beverages.filter(b => b.categoryId == this.selectedCategory.categoryId)
      });
  }
  
  ngOnInit() {
    this.getSales();
    this.getBeverageCategories();
    this.currentOrder = { orderId: -1,
                          orderDate: new Date(),
                          orderItems: [],
                          completed: false
                        };
    
    // TODO - add the code to get coffees and teas and condiments
  }

  onBeverageCategorySelect(category: BeverageCategory): void {

    this.selectedCategory = category;
    this.selectedBeverages = this.beverages.filter(b => b.categoryId == this.selectedCategory.categoryId);
  };

  onBeverageSelect(beverage: Beverage): void {
    this.selectedBeverage = beverage;
    
    this.currentOrderItem = {
                              itemId: -1,
                              beverageId: this.selectedBeverage.beverageId,
                              description: this.selectedBeverage.description,
                              quantity: 1,
                              unitprice: this.selectedBeverage.price,
                              orderId: -1
                            };
    this.currentOrder.orderItems.push(this.currentOrderItem);
    // TODO - add to orderitem
  }

  onCondimentSelect(condiment: Condiment): void {
    // this is where the decorator comes in and things get tricky,
    // how to handle when a customer unselect a condiment? Check the selected condiments, have a method to remove a decoration
    // or maybe just a way to remove an order item and then disable button when selected
    // or add additional description to the product instead of the order item? the order item will only need the product if everything goes as planned

    // add to orderitem
  }


  // hard coded data
  condiments: Condiment[] = [
    { id: 6, description: 'Milk', price: 5 },
    { id: 7, description: 'Syrup', price: 5 },
    { id: 7, description: 'Sugar', price: 5 },
    { id: 7, description: 'Caramel', price: 5 },
    { id: 7, description: 'Cinamon', price: 5 },
    { id: 7, description: 'Chili', price: 5 },
  ];
}