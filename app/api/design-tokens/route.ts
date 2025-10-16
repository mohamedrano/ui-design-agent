import { NextApiRequest, NextApiResponse } from 'next';

const designTokens = {
    colors: {
        primary: '#0070f3',
        secondary: '#1c1c1e',
        accent: '#ff4081',
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        fontWeight: '400',
    },
    spacing: {
        small: '8px',
        medium: '16px',
        large: '24px',
    },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        res.status(200).json(designTokens);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}