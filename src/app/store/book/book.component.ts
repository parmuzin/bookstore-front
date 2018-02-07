import { Component, OnInit } from '@angular/core';
import {Book} from './book.model';
import {BookService} from './book.service';
import {Router} from '@angular/router';
import {Order} from '../order/order.repository';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html'
})
export class BookComponent implements OnInit {

  private books: Book[];

  constructor(private bookService: BookService,
              private order: Order,
              private router: Router) { }

  loadAll() {
    this.bookService.getBooks().subscribe(data => this.books = data);
  }

  onSelect(bookId: number) {
    this.router.navigate(['/book', bookId]);
  }

  addBookToOrder(book: Book) {
    this.order.addOrderBook(book);
    this.router.navigateByUrl('/order');
  }

  ngOnInit() {
    this.loadAll();
  }

}
