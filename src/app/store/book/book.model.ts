export class Book {
  constructor(
    public bookId?: number,
    public bookTitle?: string,
    public bookAuthor?: string,
    public bookPages?: number,
    public bookIsbn?: string,
    public bookPrice?: number,
    public bookDescription?: string,
    public bookImageContentType?: string,
    public bookImage?: any,
  ) {}
}
