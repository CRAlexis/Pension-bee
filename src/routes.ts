import TemplateController from '@controllers/templateController';
import { Request, Response } from 'express';
export default class Routes {
    private static instance: Routes;

    private constructor() { }

    public static getInstance(): Routes {
        if (!Routes.instance) {
            Routes.instance = new Routes();
        }
        return Routes.instance;
    }

    /*
     * The router for the app. To add new routes add a case to the
     * swtich case.
     */
    public index(req: Request, res: Response) {
        switch (req.url) {
            case '/':
                res.send('Welcome page');
                break;
            default:
                TemplateController.index(req, res);
                break;
        }
    }
}