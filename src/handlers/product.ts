import { RequestHandler } from 'express';
import prisma from '../db';

// Get all
export const getProducts: RequestHandler = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: { products: true },
  });

  res.json({ data: user?.products });
};

// Get one
export const getOneProduct: RequestHandler = async (req, res) => {
  // The params are from /product/:id <- here
  const product = await prisma.product.findFirst({
    where: { id: req.params.id, belongsToId: req.user.id },
  });

  res.json({ data: product });
};

export const createProduct: RequestHandler = async (req, res) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belongsToId: req.user.id,
    },
  });

  res.json({ data: product });
};

export const updateProduct: RequestHandler = async (req, res) => {
  const updated = await prisma.product.update({
    where: { id: req.params.id, belongsToId: req.user.id },
    data: {
      name: req.body.name,
    },
  });

  res.json({ data: updated });
};

export const deleteProduct: RequestHandler = async (req, res) => {
  const deleted = await prisma.product.delete({
    where: { id: req.params.id, belongsToId: req.user.id },
  });

  res.json({ data: deleted });
};
