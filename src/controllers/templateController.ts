import { Request, Response } from 'express';
import TemplateService from '../services/templateService';

export default class TemplateController {
    public static async index(req: Request, res: Response) {
        try {
            const html = await TemplateService.buildHtml(req.url);

            res.set('Content-Type', 'text/html');
            return res.send(Buffer.from(html));
        } catch (error) {
            if (error.code === 'ENOENT') {
                return res.sendStatus(404);
            }
            return res.sendStatus(400)
        }
    }
}
