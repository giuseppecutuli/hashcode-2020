import { readFile, writeFile } from 'fs';
import {BookInterface} from "./interfaces/book.interface";
import {LibraryInterface} from "./interfaces/library.interface";
import {Dataset} from "./interfaces/dataset.interface";

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

const orderByBestSignUpTime = (dataset: Dataset) => {
  return dataset.libraries.sort((a, b) => a.signUpProcessDays - b.signUpProcessDays);
};

readFile(`./input/${file}`, (err, data) => {
  if (err) {
    throw 'Error while reading the file';
  }

  const dataToString = data.toString();
  const [baseDatasetInterfaceLine, booksScoreLine, ...librariesLine] = dataToString.split('\n').filter(x => x != '');
  const [numberOfBooks, numberOfLibraries, daysForScanning] = baseDatasetInterfaceLine.split(' ').map(n => Number(n));
  const books: BookInterface[] = booksScoreLine.split(' ').map((score, id) => ({ id, score: Number(score) }));

  const libraries: LibraryInterface[] = [];
  for (let i = 0; i < numberOfLibraries * 2; i+=2) {
    const [numberOfBooks, signUpProcessDays, booksShipForDay] = librariesLine[i].split(' ');
    libraries.push({
      numberOfBooks: Number(numberOfBooks),
      signUpProcessDays: Number(signUpProcessDays),
      booksShipForDay: Number(booksShipForDay),
      books: librariesLine[i + 1]
        .split(' ')
        .map((bookId) => books.find(b => b.id === Number(bookId))),
    });
  }

  const dataset: Dataset = {
    numberOfBooks,
    numberOfLibraries,
    daysForScanning,
    libraries,
    books,
  };

  console.log(orderByBestSignUpTime(dataset));
});

