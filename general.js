const express = require('express');
let books = require("./booksdb.js");
const public_users = express.Router();
const axios = require('axios');

// Task 10
public_users.get('/', async function (req, res) {
  try {
    const response = await axios.get('http://localhost:5000/');
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving books" });
  }
});

// Task 11 - ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  try {
    const isbn = req.params.isbn;

    const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(404).json({ message: "Book not found" });
  }
});

// Task 12 - Author
public_users.get('/author/:author', async function (req, res) {
  try {
    const author = req.params.author;

    let filtered_books = {};

    Object.keys(books).forEach(key => {
      if (books[key].author === author) {
        filtered_books[key] = books[key];
      }
    });

    return res.status(200).json(filtered_books);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving books" });
  }
});

// Task 13 - Title
public_users.get('/title/:title', async function (req, res) {
  try {
    const title = req.params.title;

    let filtered_books = {};

    Object.keys(books).forEach(key => {
      if (books[key].title === title) {
        filtered_books[key] = books[key];
      }
    });

    return res.status(200).json(filtered_books);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving books" });
  }
});

module.exports = public_users;
