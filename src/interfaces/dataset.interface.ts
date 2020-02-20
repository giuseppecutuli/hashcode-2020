import { LibraryInterface } from './library.interface';
import { BookInterface } from './book.interface';

export interface DatasetInterface {
  numberOfBooks: number;
  numberOfLibraries: number;
  daysForScanning: number;
  libraries: LibraryInterface[];
  books?: BookInterface[];
}
