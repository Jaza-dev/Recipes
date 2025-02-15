import express from 'express'

export class DashboardController {

    create = (req: express.Request, res: express.Response) => {
        res.send("Hello World! recipe Collection");
    }
    
    delete = (req: express.Request, res: express.Response) => {
        res.send("Hello World! recipe Collection");
    }

    edit = (req: express.Request, res: express.Response) => {
        res.send("Hello World! recipe Collection");
    }
}