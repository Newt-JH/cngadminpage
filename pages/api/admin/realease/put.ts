import type { NextApiRequest, NextApiResponse } from 'next';
const dbConnet = require('../../database/db');

export default async function test(req: NextApiRequest, res: NextApiResponse) {
    const releaseCount = req.body.releaseCount;
    const usedCount = req.body.usedCount;
    const rentalCount = req.body.rentalCount;

    const returnData = await dbConnet("UpdateProductStatus", [releaseCount, usedCount, rentalCount]);
    
    res.json(returnData);
}