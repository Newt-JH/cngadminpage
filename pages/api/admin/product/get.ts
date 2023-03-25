import type { NextApiRequest, NextApiResponse } from 'next';
const dbConnet = require('../../database/db');

export default async function test(req: NextApiRequest, res: NextApiResponse) {
    const offset = req.query.offset;
    const returnData = await dbConnet("SelectProductList", [Number(offset)]);
    res.json(returnData);
}