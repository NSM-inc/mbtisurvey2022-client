import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(1111);
    res.status(200).json({
        apiKey: process.env.apiKey,
        authDomain: process.env.authDomain,
        projectId: process.env.projectId,
        storageBucket: process.env.storageBucket,
        messagingSenderId: process.env.messagingSenderId,
        appId: process.env.appId,
    });
};
