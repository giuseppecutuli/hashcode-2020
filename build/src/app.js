"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const write = (file, data) => {
    fs_1.writeFile(`output/${file}`, data, (err) => {
        if (err) {
            throw 'Error while writing the file';
        }
    });
};
const file = 'a_example.txt';
fs_1.readFile(`./input/${file}`, (err, data) => {
    if (err) {
        throw 'Error while reading the file';
    }
    const dataToString = data.toString();
    const [baseDatasetInterfaceLine, booksScore, ...libraries] = dataToString.split('\n');
    const [numberOfBooks, numberOfLibraries, daysForScanning] = baseDatasetInterfaceLine.split(' ').map(n => Number(n));
    const books = booksScore.split(' ').map((score, id) => ({ id, score: Number(score) }));
    console.log(books);
});
//# sourceMappingURL=app.js.map