import { NextFunction, Request, Response } from 'express';
import z from 'zod';
import { NewPatientSchema } from './utils';

export const newPatientValidator = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    let message = 'something went wrong';
    if (error instanceof Error) {
      message += `: ${error.message}`;
    }
    res.status(500).send({ error: message });
  }
};
