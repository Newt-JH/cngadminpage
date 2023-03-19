import type { NextApiRequest, NextApiResponse } from 'next';
const dbConnet = require('../../database/db');

export default async function test(req : NextApiRequest, res : NextApiResponse) {
    console.log("in");
    const returnData = await dbConnet("TEST", []);
    res.json(returnData);
}