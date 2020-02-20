import { readFile, writeFile } from 'fs';

const read = (file) => {
  return readFile(`./input/${file}`, (err, data) => {
    if (err) {
      throw 'Error while reading the file';
    }

    return data;
  });
};

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

const data = read(file);

console.log(data);

