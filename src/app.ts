import {readFile, writeFile} from 'fs';
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
  dataset.libraries = dataset.libraries.sort((a, b) => a.signUpProcessDays - b.signUpProcessDays);
  return dataset;
};

const process = (dataset: Dataset) => {
  let daysPassed = 0;
  let libraryInSignUpProcessDaysPassed = 0;
  let libraryInSignUpProcess = dataset.libraries[0];
  let numberOfLibraries = 0;
  let currentLibraries = [];
  const libraries = {};

  while (daysPassed < dataset.daysForScanning) {
    if (libraryInSignUpProcessDaysPassed === libraryInSignUpProcess.signUpProcessDays) {
      currentLibraries.push(libraryInSignUpProcess);
      libraryInSignUpProcess = dataset.libraries[numberOfLibraries];
      libraryInSignUpProcessDaysPassed = 0;
      numberOfLibraries++;
    } else {
      libraryInSignUpProcessDaysPassed += 1;
    }

    if (currentLibraries.length) {
      currentLibraries.forEach((currentLibrary: LibraryInterface, index) => {
        const bookForThisDay = currentLibraries[index].books.length < currentLibrary.booksShipForDay
          ? currentLibraries[index].books.length
          : currentLibrary.booksShipForDay;

        const deletedBooks = currentLibrary.books.splice(0, bookForThisDay);

        if (libraries[currentLibrary.id] === undefined) {
          libraries[currentLibrary.id] = { books: [] };
        }

        libraries[currentLibrary.id] = {
          books: [
            ...libraries[currentLibrary.id].books,
            ...deletedBooks,
          ],
        };

        if (currentLibraries[index].books.length === 0) {
          delete currentLibraries[index];
        }
      });
    }

    daysPassed += 1;
  }

  return libraries;
};

readFile(`./input/${file}`, async (err, data) => {
  console.time();

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
      id: i / 2,
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

  const resultLibraries = process(orderByBestSignUpTime(dataset));

  let out = '';
  Object.keys(resultLibraries).forEach((id) => {
    out += `${id} ${resultLibraries[id].books.length}\n${resultLibraries[id].books.map((book: BookInterface) => book.id).join(' ')}\n`;
  });

  await write(file, `${Object.keys(resultLibraries).length}\n${out}`);
  console.timeEnd();
});

