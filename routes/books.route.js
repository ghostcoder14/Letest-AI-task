//All the routes for the book handling are liste here 

import { Router } from "express";


const router = Router()

router
  .route("/books")
  .get(listBooks)
  .post(addBook);

router
  .route("/books/:id")
  .get(getBookById)
  .put(updateBookById)
  .delete(deleteBookById);


export default router  