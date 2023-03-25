import type { NextApiRequest, NextApiResponse } from 'next';
const dbConnet = require('../../../database/db');

export default async function test(req: NextApiRequest, res: NextApiResponse) {
    const createDateTime = req.query.createDateTime;
    const updateDateTime = req.query.updateDateTime;
    const searchText = req.query.searchText;
    const offset = req.query.offset;
    const returnData = await dbConnet("SearchProductList", [createDateTime,updateDateTime,searchText,Number(offset)]);
    res.json(returnData);
}