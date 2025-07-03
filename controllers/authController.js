import path from 'path'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { readJSON, writeJSON } from '../src/data.js'
import { authBlackList } from '../middleware/auth.middleware.js'


const usersPath = path.resolve(process.cwd(), 'data', 'user.json');


export async function signup(req, res, next) {
    try {
        console.log("signup endpoint hit complete");
       const {email, password} = req.body;
       const users = await readJSON(usersPath);
       if(users.some(u => u.email === email)){
        return res.status(404).json({message: 'Email already exists' })
       }
       const hashed = await bcrypt.hash(password, 10);
       users.push({id:Date.now().toString(), email,password:hashed});
       await writeJSON(usersPath, users);
       res.status(201).json({message:'User Registered successfully'});
    } catch (err) {
        next(err);
    }
}

export async function login(req, res, next) {
    try {
        const {email, password} = req.body;
        const users = await readJSON(usersPath);
        const user = users.find(u => u.email === email);
         if (!user || !(await bcrypt.compare(password, user.password))) {
  return res.status(401).json({ message: 'Invalid credentials' });
}

          const token = jwt.sign({userId: user.id}, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_SECRET_EXPIRY
          });
          res.json({token})
    } catch (err) {
        next(err)
    }
}

export function logout(req, res) {
  authBlackList.add(req.token);
  res.json({ message: 'Logged out' });
}

export async function deleteUser(req, res, next) {
  try {
    console.log('Writing to:', usersPath);
    const users = await readJSON(usersPath);
    console.log('Before delete, count:', users.length);

    const updated = users.filter(u => u.id !== req.user.userId);
    console.log('After delete, count:', updated.length);

    await writeJSON(usersPath, updated);
    console.log('✅ writeJSON complete');

    authBlackList.add(req.token);
    res.json({ message: 'User deleted' });
  } catch (err) {
    next(err);
  }
}
