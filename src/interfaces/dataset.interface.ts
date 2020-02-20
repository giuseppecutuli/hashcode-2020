import { LibraryInterface } from './library.interface';
import { BookInterface } from './book.interface';

export interface Dataset {
  numberOfBooks: number;
  numberOfLibraries: number;
  daysForScanning: number;
  libraries: LibraryInterface[];
  books?: BookInterface[];
}
