import { BookInterface } from './book.interface';

export interface LibraryInterface {
  id: number;
  numberOfBooks: number;
  signUpProcessDays: number;
  booksShipForDay: number;
  books: BookInterface[];
}
