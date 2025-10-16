import { NextApiRequest, NextApiResponse } from 'next';
import { generateData } from '../../../src/lib/ai/genkit';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const inputData = req.body;
            const generatedData = await generateData(inputData);
            res.status(200).json(generatedData);
        } catch (error) {
            res.status(500).json({ error: 'Failed to generate data' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}