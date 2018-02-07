import {Component, ElementRef, OnInit} from '@angular/core';
import {Book} from '../../store/book/book.model';
import {BookService} from '../../store/book/book.service';
import {ActivatedRoute, Router} from '@angular/router';
import {JhiDataUtils} from '../../utility/data-util.service';

@Component({
  moduleId: module.id,
  selector: 'app-book-editor',
  templateUrl: './book-editor.component.html',
  styles: []
})
export class BookEditorComponent implements OnInit {

  bookMessage: string;
  editing = false;
  book: Book = new Book();

  constructor(private bookService: BookService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private dataUtils: JhiDataUtils,
              private elementRef: ElementRef) { }

  save() {
    if (this.book.bookId == null || this.book.bookId == 0) {
      this.bookService.addBook(this.book).subscribe(() => this.bookMessage = 'Book added successfully');
    } else {
      this.bookService.updateBook(this.book).subscribe(() => this.bookMessage = 'Book updated successfully');
    }
    this.router.navigateByUrl('/admin/books');
  }

  setFileData(event, entity, field, isImage) {
    this.dataUtils.setFileData(event, entity, field, isImage);
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string) {
    this.dataUtils.clearInputImage(this.book, this.elementRef, field, fieldContentType, idInput);
  }

  ngOnInit() {
    this.editing = this.activeRoute.snapshot.params['mode'] === 'edit';
    if (this.editing) {
      //   Object.assign(this.book,
      //     this.bookService.getBook(activeRoute.snapshot.params['id']));
      // }
      this.bookService.getBook(this.activeRoute.snapshot.params['id']).subscribe(book => this.book = book);
    }
  }
}
