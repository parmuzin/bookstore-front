import {Injectable} from '@angular/core';
import {Book} from '../book/book.model';
import {User} from '../../account/user/user.model';

@Injectable()
export class Order {
  public books: OrderBooks[] = [];
  public orderId: number;
  public orderDate: string;
  public orderPrice = 0;
  public orderStatus = false;
  public bookCount = 0;
  public user?: User;

  addOrderBook(book: Book, quantity: number = 1) {
    const orderBook = this.books.find(data => data.book.bookId === book.bookId);
    if (orderBook !== undefined) {
      orderBook.quantity += quantity;
    } else {
      this.books.push(new OrderBooks(book, quantity));
    }
    this.recalculate();
  }

  updateQuantity(book: Book, quantity: number) {
    const orderBook = this.books.find(data => data.book.bookId === book.bookId);
    if (orderBook !== undefined) {
      orderBook.quantity = Number(quantity);
    }
    this.recalculate();
  }

  removeOrderBook(bookId: number) {
    const index = this.books.findIndex(line => line.book.bookId === bookId);
    this.books.splice(index, 1);
    this.recalculate();
  }

  clear() {
    this.orderDate = null;
    this.orderPrice = null;
    this.bookCount = 0;
    this.orderStatus = false;
    this.books = [];
  }

  private recalculate() {
    this.bookCount = 0;
    this.orderPrice = 0;
    this.books.forEach(o => {
      this.bookCount += o.quantity;
      this.orderPrice += (o.quantity * o.book.bookPrice);
    });
  }
}

export class OrderBooks {
  constructor(public book: Book,
              public quantity: number) { }
  get totalPrice() {
    return this.quantity * this.book.bookPrice;
  }
}
