import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../../app.constants';
import {Observable} from 'rxjs/Observable';
import {Book} from './book.model';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class BookService {

  private resourceUrl = SERVER_API_URL + 'books';

  constructor(private http: HttpClient) {
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.resourceUrl);
  }

  getBook(bookId: number): Observable<Book> {
    return this.http.get(`${this.resourceUrl}/${bookId}`);
  }

  addBook(book: Book): any {
    return this.http.post(this.resourceUrl, book);
  }

  updateBook(book: Book): any {
    return this.http.put(this.resourceUrl, book);
  }

  deleteBook(bookId: number): any {
    return this.http.delete(`${this.resourceUrl}/${bookId}`);
  }
}
