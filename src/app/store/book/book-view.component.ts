import { Component, OnInit } from '@angular/core';
import {JhiDataUtils} from '../../utility/data-util.service';
import {ActivatedRoute} from '@angular/router';
import {BookService} from './book.service';
import {Book} from './book.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styles: []
})
export class BookViewComponent implements OnInit {

  book: Book;

  constructor(private bookService: BookService,
              private route: ActivatedRoute,
              private dataUtils: JhiDataUtils,
              private location: Location) {
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

  goBack(): void {
   // this.location.back();
  window.history.back();
  }
}
