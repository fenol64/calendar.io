import DbWalker from 'dbwalker';
import { NextApiRequest, NextApiResponse } from 'next';

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

        const select_params: SelectParams = { table: 'events', fields: {}, joins: [], where: [] };

        select_params.where.push(`deleted_at IS NULL`);
        if (params.uuid) select_params.where.push(`uuid = '${params.uuid}'`);
        if (params.user_uuid) select_params.where.push(`user_uuid = '${params.user_uuid}'`);

        const events_sql = db.select(select_params).toString();
        const events = await db.query(events_sql);

        return res.status(200).json(events);
    }

    if (method === 'POST') {
        const event_data: event = body;

        const insert_params: SelectParams = { table: 'events', data: {}, where: [] };
        const insert_data: any = {};

        insert_data.uuid = event_data.uuid ?? await db.uuid();
        insert_data.user_uuid = event_data.user_uuid;
        insert_data.title = event_data.title;
        insert_data.subtitle = event_data.subtitle;
        insert_data.description = event_data.description;
        insert_data.date = event_data.date;

        insert_data.remember_on = Object.keys(event_data).filter(key => key.includes('remember_')).map(key => key.replace('remember_', '')).join(',');

        console.log({ insert_data })

        insert_params.data = insert_data;


        let insert_sql = db.insert(insert_params).toString();
        if (event_data.uuid) {
            insert_params.where = [`uuid = '${event_data.uuid}'`];
            insert_sql = db.update(insert_params).toString();
        }
        const insert = await db.query(insert_sql);


        return res.status(201).json({ ...insert_data, uuid: insert.insertId });
    }

    if (method === "DELETE") {
        const update_params: SelectParams = { table: 'events', data: {}, where: [] };

        const date = new Date();
        const deleted_at = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        update_params.data = { deleted_at };

        update_params.where.push(`uuid = '${params.uuid}'`);

        const update_sql = db.update(update_params).toString();
        const update = await db.query(update_sql);
        console.log({ update })
        return res.status(200).json({ ...body, deleted_at: update_params.data.deleted_at });

    }


};