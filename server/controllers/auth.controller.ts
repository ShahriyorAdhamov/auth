import { Request, Response } from "express";

export const signup = async (req: Request, res: Response) => {
  res.send('Hello signup');
}

export const login = async (req: Request, res: Response) => {
  res.send('Hello login');
}


export const logout = async (req: Request, res: Response) => {
  res.send('Hello logout');
}
