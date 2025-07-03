//All the routes for the book handling are liste here 

import { Router } from "express";
import { addBook, deleteBookById, getBookById, listBooks, updateBookById } from "../controllers/booksController.js";
import { authenticateToken } from "../middleware/auth.middleware.js";


const router = Router()

router.use(authenticateToken)

router
  .route("/")
  .get(listBooks)
  .post(addBook);

router
  .route("/:id")
  .get(getBookById)
  .put(updateBookById)
  .delete(deleteBookById);


export default router  