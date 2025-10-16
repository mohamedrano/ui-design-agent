import { NextApiRequest, NextApiResponse } from 'next';
import { runLighthouse } from '../../../src/lib/ai/tools/lighthouse-runner.tool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        try {
            const results = await runLighthouse(url);
            return res.status(200).json(results);
        } catch (error) {
            return res.status(500).json({ error: 'Error running performance checks' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}