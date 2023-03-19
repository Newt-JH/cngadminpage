import type { NextApiRequest, NextApiResponse } from 'next';
const dbConnet = require('../../database/db');

export default async function test(req : NextApiRequest, res : NextApiResponse) {
    const returnData = await dbConnet("SelectProductStatus", []);
    res.json(returnData);
}