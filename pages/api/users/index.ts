import type { NextApiRequest, NextApiResponse } from 'next'
import DBWalker from "dbwalker";
import md5 from "md5";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req;
    const params = { ...req.query, ...req.body }
    const db = new DBWalker();

    switch (method) {
        case 'GET':
            // Get data from your database
            break;
        case 'POST':
            // verify if username exists in database
            // if not, create new user
            // if yes, return error
            const user_exists_sql = db.select({ table: "users", where: [{ username: params.username }] }).toString();
            const user_exists = await db.query(user_exists_sql);

            console.log({ user_exists })

            if (user_exists.length > 0) {
                return res.status(400).json({ message: 'Nome de usuário existente. use outro' });
            }

            const user = {
                uuid: await db.uuid(),
                name: params.name,
                username: params.username,
                password: md5(params.password),
                emails: params.emails,
                phones: params.phones,
            }

            const sql = db.insert({ table: "users", data: user }).toString();
            const result = db.query(sql);

            if (result.error) {
                return res.status(400).json({ error: result.error });
            } else {
                return res.status(200).json({ user, message: 'User created' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            return res.status(405).end(`Method ${method} Not Allowed`);
    }
}