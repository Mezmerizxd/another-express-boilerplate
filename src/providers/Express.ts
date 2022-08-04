import * as express from 'express';

import Routes from './Routes';
import Kernal from '../middlewares/Kernel';

import Log from "../middlewares/Log";
import Config from "../providers/Config";

class Express {
    public express: express.Application;
    private port = Config.config().port;

    constructor() {
        this.express = express();
		this.mountDotEnv();
		this.mountMiddlewares();
		this.mountRoutes();
    }

    private mountDotEnv(): void {
        this.express = Config.Initialize(this.express);
    }

    private mountMiddlewares(): void {
        this.express = Kernal.Initialize(this.express);
    }

    private mountRoutes(): void {
        // Mount the static web 
        this.express = Routes.mountWeb(this.express, express);
        this.express = Routes.mountApi(this.express, express);
    }

    public Initialize(): any {
        this.express.listen(this.port, () => {
            //console.log("Server running on port " + this.port);
            Log.info(`Server running on http://localhost:${this.port}`, true);
        }).on('error', (err) => {
            console.log("Error:", err.message);
            Log.error(`${err}`);
        });
    }
}

export default new Express();