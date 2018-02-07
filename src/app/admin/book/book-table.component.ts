import {Component, OnInit} from '@angular/core';
import {Book} from '../../store/book/book.model';
import {BookService} from '../../store/book/book.service';
import {JhiDataUtils} from '../../utility/data-util.service';

@Component({
  moduleId: module.id,
  selector: 'app-book-table',
  templateUrl: './book-table.component.html'
})
export class BookTableComponent implements OnInit {

  books: Book[];

  constructor(private bookService: BookService,
              private dataUtils: JhiDataUtils) {
  }

  getBooks() {
    this.bookService.getBooks().subscribe(
      data => this.books = data,
      error => console.log(error)
    );
  }

  deleteBook(bookId: number) {
    this.bookService.deleteBook(bookId).subscribe(() => {
      this.books.splice(
        this.books.findIndex(
          b => b.bookId === bookId), 1);
    });
  }

  ngOnInit() {
    this.getBooks();
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

}
