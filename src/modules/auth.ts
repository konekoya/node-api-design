import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const comparePasswords = (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 5);
};

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );

  return token;
};

export const protect: RequestHandler = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.send({ message: 'Not authorized' });
    return;
  }

  const [, token] = bearer.split(' ');

  if (!token) {
    res.status(401);
    res.send({ message: 'Not authorized' });
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET) as {
      id: string;
      username: string;
    };
    req.user = payload;
    next();
  } catch (e) {
    console.error(e);
    res.status(401);
    res.send({ message: 'Not authorized' });
  }
};
