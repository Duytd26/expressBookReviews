const express = require('express');
let books = require("./booksdb.js");
const public_users = express.Router();
const axios = require('axios');

// Task 10
public_users.get('/', async function (req, res) {
    const getBooks = new Promise((resolve, reject) => {
        resolve(books);
    });

    getBooks.then((data) => {
        res.send(JSON.stringify(data, null, 4));
    });
});

// Task 11
public_users.get('/isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn;

    const getBook = new Promise((resolve, reject) => {
        if (books[isbn]) {
            resolve(books[isbn]);
        } else {
            reject("Book not found");
        }
    });

    getBook
        .then((book) => {
            res.send(JSON.stringify(book, null, 4));
        })
        .catch((err) => {
            res.status(404).json({ message: err });
        });
});

// Task 12
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author;

    const getBooksByAuthor = new Promise((resolve, reject) => {
        let filtered_books = {};

        Object.keys(books).forEach((key) => {
            if (books[key].author === author) {
                filtered_books[key] = books[key];
            }
        });

        resolve(filtered_books);
    });

    getBooksByAuthor.then((data) => {
        res.send(JSON.stringify(data, null, 4));
    });
});

// Task 13
public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title;

    const getBooksByTitle = new Promise((resolve, reject) => {
        let filtered_books = {};

        Object.keys(books).forEach((key) => {
            if (books[key].title === title) {
                filtered_books[key] = books[key];
            }
        });

        resolve(filtered_books);
    });

    getBooksByTitle.then((data) => {
        res.send(JSON.stringify(data, null, 4));
    });
});

module.exports = public_users;
