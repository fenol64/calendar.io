import type { NextApiRequest, NextApiResponse } from 'next'
import DBWalker from "dbwalker";
import md5 from "md5";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, body } = req;
    const params = { ...req.query, ...req.body }
    const db = new DBWalker();

    switch (method) {
        case 'GET':
            // Get data from your database
            break;
        case 'POST':
            const user_exists_sql = db.select({
                table: "users", where: [
                    [`username = '${body.login}'`, `emails = '${body.login}'`],
                    `password = '${md5(body.password)}'`
                ]
            }).toString();

            const user_exists = await db.query(user_exists_sql);

            console.log({ user_exists })

            if (user_exists.length <= 0) {
                return res.status(400).json({ message: 'Usuário ou senha inválidos' });
            }

            res.status(200).json({ user: user_exists[0], message: 'Usuário encontrado' });
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            return res.status(405).end(`Method ${method} Not Allowed`);
    }
}