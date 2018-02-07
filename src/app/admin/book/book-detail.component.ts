import {Component, OnInit} from '@angular/core';
import {BookService} from '../../store/book/book.service';
import {ActivatedRoute} from '@angular/router';
import {JhiDataUtils} from '../../utility/data-util.service';
import {Book} from '../../store/book/book.model';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styles: []
})
export class BookDetailComponent implements OnInit {

  book: Book;

  constructor(private bookService: BookService,
              private route: ActivatedRoute,
              private dataUtils: JhiDataUtils) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.load(params['id']));
  }

  load(booId: number) {
    this.bookService.getBook(booId).subscribe(data => this.book = data);
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
}
