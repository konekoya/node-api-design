import { RequestHandler } from 'express';
import prisma from '../db';
import { Update } from '../../generated/prisma/client';

export const getOneUpdate: RequestHandler = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: { id: req.params.id },
  });

  res.json({ data: update });
};

export const getUpdates: RequestHandler = async (req, res) => {
  const products = await prisma.product.findMany({
    where: { belongsToId: req.user.id },
    include: { updates: true },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, [] as Update[]);

  res.json({ data: updates });
};

export const createUpdate: RequestHandler = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { id: req.body.productId },
  });

  if (!product) {
    res.json({ message: 'NOPE' });
    return;
  }

  const update = await prisma.update.create({
    data: req.body,
  });

  res.json({ data: update });
};

export const updateUpdate: RequestHandler = async (req, res) => {
  const products = await prisma.product.findMany({
    where: { belongsToId: req.user.id },
    include: { updates: true },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, [] as Update[]);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    res.json({ message: 'NOPE' });
    return;
  }

  const updatedUpdate = await prisma.update.update({
    where: { id: req.params.id },
    data: req.body,
  });

  res.json({ data: updatedUpdate });
};
export const deleteUpdate: RequestHandler = async (req, res) => {
  const products = await prisma.product.findMany({
    where: { belongsToId: req.user.id },
    include: { updates: true },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, [] as Update[]);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    res.json({ message: 'NOPE' });
    return;
  }

  const deleted = await prisma.update.delete({
    where: { id: req.params.id },
  });

  res.json({ data: deleted });
};
