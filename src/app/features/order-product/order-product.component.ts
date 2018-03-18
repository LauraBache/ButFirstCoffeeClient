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
import { CondimentService } from './services/condiment.service';
import { OrderService } from './services/order.service';
import { OrderItemService } from './services/order-item.service';

@Component({
  selector: 'app-order-product',
  templateUrl: 'order-product.component.html',
  styleUrls: ['order-product.component.css']
})
export class OrderProductComponent implements OnInit {

  // properties
  sales: Sale[] = [];
  
  beverageCategories: BeverageCategory[] = [];
  selectedCategory: BeverageCategory;

  beverages: Beverage[] = [];
  selectedBeverages: Beverage[] = [];
  selectedBeverage: Beverage;

  condiments: Condiment[] = [];
  selectedCondiments: Condiment[] = [];

  todaysDate: Date;

  currentOrder: Order;
  currentOrderItemId: number;

  totalPrice: number = 0;

  // constructor
  constructor(private saleService: SaleService, private beverageCategoryService: BeverageCategoryService, private beverageService: BeverageService,
    private condimentService: CondimentService, private orderService: OrderService, private orderItemService: OrderItemService) { }

  // init functions
  getSales(): void {
    this.saleService.getSales()
      .subscribe(sales => {
          this.sales = sales;
      });
  }

  getBeveragesAndTheirCategories(): void {
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

  getCondiments(): void {
    this.condimentService.getCondiments()
      .subscribe(condiments => {
          this.condiments = condiments;
      });
  }
  
  ngOnInit() {
    this.getSales();
    this.getBeveragesAndTheirCategories();
    this.getCondiments();
    this.todaysDate = new Date();
  }

  // functions activated by user actions
  onBeverageCategorySelect(category: BeverageCategory): void {

    this.selectedCategory = category;
    this.selectedBeverages = this.beverages.filter(b => b.categoryId == this.selectedCategory.categoryId);
  };

  onBeverageSelect(beverage: Beverage): void {
    this.selectedBeverage = beverage;
    
    if (this.currentOrder)
    {
      let orderItemToAdd: OrderItem = { itemId: null,
                                        beverageId: this.selectedBeverage.beverageId,
                                        description: this.selectedBeverage.description,
                                        quantity: 1,
                                        unitPrice: this.selectedBeverage.price,
                                        orderId: this.currentOrder.orderId
                                      };
      
      this.orderItemService.addOrderItem(orderItemToAdd)
        .subscribe(addedOrderItem => {
          if (addedOrderItem) {
              this.currentOrder.orderItems.push(addedOrderItem);
              this.currentOrderItemId = addedOrderItem.itemId;
              this.totalPrice = this.orderService.getTotalPrice(this.currentOrder);
            }
        });
    }
    else {
      let orderToAdd: Order = { orderId: null,
                                orderDate: new Date(),
                                orderItems: [],
                                completed: false
                        };

      let orderItemToAdd: OrderItem = { itemId: null,
                                        beverageId: this.selectedBeverage.beverageId,
                                        description: this.selectedBeverage.description,
                                        quantity: 1,
                                        unitPrice: this.selectedBeverage.price,
                                        orderId: null
                                      };
      orderToAdd.orderItems.push(orderItemToAdd);

      this.orderService.addOrder(orderToAdd)
        .subscribe(addedOrder => {
          if (addedOrder) {
              this.currentOrder = addedOrder;
              this.currentOrderItemId = this.currentOrder.orderItems[0].itemId;
              this.totalPrice = this.orderService.getTotalPrice(this.currentOrder);
            }
        });
    }
  }

  isCondimentSelected(condiment: Condiment): boolean {

    let isSelected = false;

    if (this.selectedCondiments && this.selectedCondiments.length > 0)
    {
      isSelected = this.selectedCondiments.some(c => c.condimentId == condiment.condimentId);
    }

    return isSelected;
  }

  onCondimentSelect(condiment: Condiment): void {

    this.selectedCondiments.push(condiment);

    let currentItem = this.currentOrder.orderItems.filter(i => i.itemId == this.currentOrderItemId)[0];

    // add to orderitem
    this.orderItemService.updateOrderItemWithCondiment(currentItem, condiment.condimentId)
      .subscribe(updatedItem => {

        if (updatedItem)
        {
          this.currentOrderItemId = updatedItem.itemId;

          let currentItemIndex = this.currentOrder.orderItems.indexOf(currentItem);
          this.currentOrder.orderItems[currentItemIndex] = updatedItem;
          this.totalPrice = this.orderService.getTotalPrice(this.currentOrder);
        }
      });
  }

  onAnotherBeverageSelect() {
    this.selectedBeverage = null;
    this.selectedCondiments = [];
    this.currentOrderItemId = null;
  }

  onOrderItemRemove(orderItem: OrderItem) {

    this.orderItemService.deleteOrderItem(orderItem.orderId, orderItem.itemId)
      .subscribe();

      let removedItemIndex = this.currentOrder.orderItems.indexOf(orderItem);
      this.currentOrder.orderItems.splice(removedItemIndex, 1);
      this.totalPrice = this.orderService.getTotalPrice(this.currentOrder);

      if (this.currentOrderItemId == orderItem.itemId)
      {
        this.onAnotherBeverageSelect();
      }
  }

  onOrder() {

    this.orderService.completeOrder(this.currentOrder)
    .subscribe(updatedOrder => {

      if (updatedOrder) {
        this.currentOrder = updatedOrder;
        this.totalPrice = this.orderService.getTotalPrice(this.currentOrder);
      }
    });
  }

  onNewOrderStart() {
    this.selectedBeverage = null;
    this.selectedCondiments = [];

    this.todaysDate = new Date();

    this.currentOrder = null;
    this.currentOrderItemId = null;

    this.totalPrice = 0;
  }

}