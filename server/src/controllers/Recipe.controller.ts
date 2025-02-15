import express from 'express'

export class RecipeController {

    create = (req: express.Request, res: express.Response) => {
        res.send("Hello World! recipe"); 
    }
    
    delete = (req: express.Request, res: express.Response) => {
        res.send("Hello World! recipe"); 
    }

    edit = (req: express.Request, res: express.Response) => {
        res.send("Hello World! recipe"); 
    }

    createSection = (req: express.Request, res: express.Response) => {
        res.send("Hello World! recipe"); 
    }

    deleteSection = (req: express.Request, res: express.Response) => {
        res.send("Hello World! recipe"); 
    }

    editSection = (req: express.Request, res: express.Response) => {
        res.send("Hello World! recipe"); 
    }
}