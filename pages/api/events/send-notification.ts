import DbWalker from 'dbwalker';
import { NextApiRequest, NextApiResponse } from 'next';
import { whatsappApi } from '../../../services/Api';
import { sendEmail } from '../../../services/email';

const extractInt = (str: string) => {
    return `${str.replace(/\D/g, '')}`;
}

type SelectParams = {
    table: string;
    fields?: Object;
    data?: any;
    joins?: any[];
    where: string[];
}

type event = {
    uuid?: string
    user_uuid: string
    phones?: string
    emails?: string
    title: string
    subtitle: string
    description: string
    date: string
    start_date?: string
    end_date?: string
    remember_on?: string
    created_at: string
    updated_at: string
}


export default async (req: NextApiRequest, res: NextApiResponse) => {

    const { method, body, query } = req;
    const params = { ...body, ...query };
    const db = new DbWalker()

    if (method === 'GET') {

        const select_params: SelectParams = {
            table: 'events', fields: [
                "events.title",
                "events.subtitle",
                "events.description",
                "events.date",
                "events.remember_on",
                "users.emails",
                "users.phones"
            ], joins: [], where: []
        };

        select_params.joins?.push(["LEFT", "users", "users.uuid = events.user_uuid"])

        select_params.where.push(`events.deleted_at IS NULL`);

        select_params.where.push(`DATE(events.date) = '${new Date().toISOString().split('T')[0]}'`);
        select_params.where.push(`TIME(events.date) LIKE '${new Date().toISOString().split('T')[1].split('.')[0].substring(0, 5)}%'`);

        const events_sql = db.select(select_params).toString();
        console.log({ events_sql })
        const events = await db.query(events_sql);

        for (const event of events as event[]) {

            if (event.remember_on?.includes('email')) {
                await sendEmail(
                    event.emails ?? "",
                    `Olá, você tem um evento hoje : \n ${event.title} \n ${event.subtitle}\n ${event.description}`
                )
            }

            if (event.remember_on?.includes('whatsapp')) {
                whatsappApi.post("/message/text", {
                    "id": extractInt(event.phones ?? ""),
                    "message": "Olá, você tem um evento hoje : \n*" + event.title + "*\n" + event.subtitle + "\n" + event.description
                }).then(res => {
                    console.log(res.data)
                })
            }

        }



        res.status(200).json(events);
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}