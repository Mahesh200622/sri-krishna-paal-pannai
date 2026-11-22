import type { Request, Response } from 'express';
import { createApp } from '../server';

let appPromise: ReturnType<typeof createApp> | undefined;

export default async function handler(req: Request, res: Response): Promise<void> {
  appPromise ??= createApp();

  try {
    const app = await appPromise;
    app(req, res);
  } catch (error) {
    console.error('Failed to initialize API app:', error);
    res.status(500).json({ error: 'The application could not be initialized.' });
  }
}
