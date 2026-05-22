const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "Customer successfully registered. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Task 10: Get the list of books available in the shop using async-await
public_users.get('/', async function (req, res) {
  try {
    const getBooks = () => new Promise((resolve) => resolve(books));
    const availableBooks = await getBooks();
    res.status(200).send(JSON.stringify({books: availableBooks}, null, 4));
  } catch (error) {
    res.status(500).json({message: "Error retrieving books"});
  }
});

// Task 11: Get book details based on ISBN using Promises
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const getBookByIsbn = new Promise((resolve, reject) => {
    if (books[isbn]) {
      resolve(books[isbn]);
    } else {
      reject("Book not found");
    }
  });

  getBookByIsbn
    .then((book) => res.status(200).send(JSON.stringify(book, null, 4)))
    .catch((err) => res.status(404).json({message: err}));
 });
  
// Task 12: Get book details based on author using Promises
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const getBooksByAuthor = new Promise((resolve) => {
    let filtered_books = [];
    Object.keys(books).forEach(key => {
      if(books[key].author === author) {
        filtered_books.push({"isbn": key, "title": books[key].title, "reviews": books[key].reviews});
      }
    });
    resolve(filtered_books);
  });

  getBooksByAuthor.then((booksList) => res.status(200).send(JSON.stringify({booksbyauthor: booksList}, null, 4)));
});

// Task 13: Get all books based on title using Promises
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const getBooksByTitle = new Promise((resolve) => {
    let filtered_books = [];
    Object.keys(books).forEach(key => {
      if(books[key].title === title) {
        filtered_books.push({"isbn": key, "author": books[key].author, "reviews": books[key].reviews});
      }
    });
    resolve(filtered_books);
  });

  getBooksByTitle.then((booksList) => res.status(200).send(JSON.stringify({booksbytitle: booksList}, null, 4)));
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    res.status(200).send(JSON.stringify(books[isbn].reviews, null, 4));
  } else {
    res.status(404).json({message: "Book not found"});
  }
});

module.exports = public_users;
