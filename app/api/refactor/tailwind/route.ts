import { NextApiRequest, NextApiResponse } from 'next';
import { refactorCssToTailwind } from '../../../src/lib/ai/flows/refactor-css-to-tailwind.flow';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { css } = req.body;
            if (!css) {
                return res.status(400).json({ error: 'CSS is required' });
            }

            const result = await refactorCssToTailwind(css);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while refactoring CSS' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}