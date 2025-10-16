import { NextApiRequest, NextApiResponse } from 'next';
import { ChatService } from '../../../src/lib/ai/genkit';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { message } = req.body;

        try {
            const response = await ChatService.sendMessage(message);
            res.status(200).json({ response });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}