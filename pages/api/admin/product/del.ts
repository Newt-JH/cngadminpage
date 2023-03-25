import type { NextApiRequest, NextApiResponse } from 'next';
const dbConnet = require('../../database/db');

export default async function test(req: NextApiRequest, res: NextApiResponse) {
    const productIDList = req.query.productIDList;
    console.log(productIDList);
    const returnData = await dbConnet("DeleteProductList", [productIDList]);
    res.json(returnData);
}