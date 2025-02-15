import express from 'express'

export class UserController {

    register = (req: express.Request, res: express.Response) => {
        res.send("Hello World! recipe"); 
    }
    
    login = (req: express.Request, res: express.Response) => {
        res.send("Hello World! recipe"); 
    }

    edit = (req: express.Request, res: express.Response) => {
        res.send("Hello World! recipe"); 
    }

    delete = (req: express.Request, res: express.Response) => {
        res.send("Hello World! recipe"); 
    }
}