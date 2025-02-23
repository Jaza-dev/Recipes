import express from 'express'

export class RecipeBookController {

    create = (req: express.Request, res: express.Response) => {
        res.send("Hello World! recipe Book");
    }
    
    delete = (req: express.Request, res: express.Response) => {
        res.send("Hello World! recipe Book");
    }

    edit = (req: express.Request, res: express.Response) => {
        res.send("Hello World! recipe Book");
    }
}