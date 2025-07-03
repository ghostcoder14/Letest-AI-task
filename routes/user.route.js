//All routes which are helpgull in user operation are listed here 

import { Router } from "express";
import { deleteUser, login, logout, signup } from "../controllers/authController.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
const router = Router()



//Register Route
router.route("/signup").post(signup)   

//Login Route
router.route("/login").post(login)

//Logout Route
router.route("/logout").post( authenticateToken,logout)

//Delete User Route 
router.route("/delete").post(authenticateToken,deleteUser)

export default router 