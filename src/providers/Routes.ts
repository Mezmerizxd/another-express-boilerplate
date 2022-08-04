import { Application } from "express";
import { Router } from "express-serve-static-core";

import webRouter from './../routes/Web';
import apiRouter from './../routes/Api';

import Log from "../middlewares/Log";
import Config from "../providers/Config";

class Routes {
    public mountWeb(_express: { use: (arg0: string, arg1: Router) => Application; }, Application: any): Application {
        Log.info("[Routes] Mounting Web Routes...");
        return _express.use('/', webRouter);
    }

    public mountApi(_express, Application): Application {
        Log.info("[Routes] Mounting Api Routes...");
        const apiPrefix = Config.config().apiPrefix;
        return _express.use(`/${apiPrefix}`, apiRouter)
    }
}

export default new Routes;