import fs from 'fs'
import path from 'path'
import {v4 as uuidv4} from 'uuid'
import { readJSON, writeJSON } from '../src/data.js'

const booksPath = path.resolve('data/books.json');

export async function listBooks(req, res, next) {
  try {
    const books = await readJSON(booksPath);
    res.json(books);
  } catch (err) { next(err); }
}

export async function getBookById(req, res, next) {
  try {
    const books = await readJSON(booksPath);
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) { next(err); }
}

export async function addBook(req, res, next) {
  try {
    const books = await readJSON(booksPath);
    const newBook = {
      id: uuidv4(),
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publishedYear: req.body.publishedYear,
      userId: req.user.userId
    };
    books.push(newBook);
    await writeJSON(booksPath, books);
    res.status(201).json(newBook);
  } catch (err) { next(err); }
}

export async function updateBookById(req, res, next) {
  try {
    const books = await readJSON(booksPath);
    const index = books.findIndex(b => b.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Book not found' });
    if (books[index].userId !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    books[index] = { ...books[index], ...req.body };
    await writeJSON(booksPath, books);
    res.json(books[index]);
  } catch (err) { next(err); }
}

export async function deleteBookById(req, res, next) {
  try {
    const books = await readJSON(booksPath);
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.userId !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const filtered = books.filter(b => b.id !== req.params.id);
    await writeJSON(booksPath, filtered);
    res.json({ message: 'Book deleted successfully' });
  } catch (err) { next(err); }
}