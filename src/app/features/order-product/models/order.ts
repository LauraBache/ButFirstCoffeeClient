import { OrderItem } from "./order-item";

export class Order {
    orderId: number;
    orderDate: Date;
    orderItems: OrderItem[];
    completed: boolean;
}