import { BookInterface } from './book.interface';

export interface LibraryDataset {
  numberOfBooks: number;
  signUpProcessDays: number;
  booksShipForDay: number;
}

export interface LibraryInterface {
  dataset: LibraryDataset;
  books: BookInterface[];
}
