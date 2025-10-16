import { NextApiRequest, NextApiResponse } from 'next';
import { auditRepository } from '../../../src/lib/ai/flows/repo-audit.flow';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const result = await auditRepository(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to audit repository' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}