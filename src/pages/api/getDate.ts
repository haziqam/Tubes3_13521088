import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { date } = req.query;
    if (!date) {
      throw new Error('Missing date parameter');
    }

    const dayOfWeek = getDayOfWeek(date as string);
    res.status(200).json({ dayOfWeek });
  } catch (error) {
    const errorMessage = error as string;
    res.status(400).json({ error: errorMessage });
  }
}

function getDayOfWeek(dateString: string): string {
  const date = new Date(dateString);
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
  return dayOfWeek;
}
