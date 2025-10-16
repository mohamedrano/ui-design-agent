import { NextApiRequest, NextApiResponse } from 'next';
import { runVisualDiff } from '../../../src/lib/ai/flows/visual-diff.flow';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { baselineImage, testImage } = req.body;
            const result = await runVisualDiff(baselineImage, testImage);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to run visual diff' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}