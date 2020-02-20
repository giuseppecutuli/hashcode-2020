import { readFile, writeFile } from 'fs';
import {BookInterface} from "./interfaces/book.interface";
import {LibraryDataset, LibraryInterface} from "./interfaces/library.interface";
import {DatasetInterface} from "./interfaces/dataset.interface";

const write = (file, data) => {
  writeFile(`output/${file}`,
    data,
    (err) => {
      if (err) {
        throw 'Error while writing the file';
      }
    });
};

const file = 'a_example.txt';
// const file = 'b_read_on.txt';
// const file = 'c_incunabula.txt';
// const file = 'd_tough_choices.txt';
// const file = 'e_so_many_books.txt';
// const file = 'f_libraries_of_the_world.txt';

readFile(`./input/${file}`, (err, data) => {
  if (err) {
    throw 'Error while reading the file';
  }

  const dataToString = data.toString();
  const [baseDatasetInterfaceLine, booksScoreLine, ...librariesLine] = dataToString.split('\n');
  const [numberOfBooks, numberOfLibraries, daysForScanning] = baseDatasetInterfaceLine.split(' ').map(n => Number(n));
  const books: BookInterface[] = booksScoreLine.split(' ').map((score, id) => ({ id, score: Number(score) }));

  const libraries: LibraryInterface[] = [];
  for (let i = 0; i <= numberOfLibraries; i++) {
    const [numberOfBooks, signUpProcessDays, booksShipForDay] = librariesLine[i].split(' ');
    libraries.push({
      dataset: {
        numberOfBooks: Number(numberOfBooks),
        signUpProcessDays: Number(signUpProcessDays),
        booksShipForDay: Number(booksShipForDay),
      },
      books: librariesLine[i + 1]
        .split(' ')
        .map((bookId) => books.find(b => b.id === Number(bookId))),
    });
  }

  const dataset: DatasetInterface = {
    numberOfBooks,
    numberOfLibraries,
    daysForScanning,
    libraries,
    books,
  };

  console.log(dataset);
});

