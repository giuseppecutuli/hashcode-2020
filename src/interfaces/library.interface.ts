import { BookInterface } from './book.interface';

export interface LibraryInterface {
  numberOfBooks: number;
  signUpProcessDays: number;
  booksShipForDay: number;
  books: BookInterface[];
}
