// Dependencies
import * as express from 'express';

// Providers
import Routes from './Routes';
import { Config } from './Config';
import MySql from './MySql';

// Middlewares
import Kernal from '../middlewares/Kernel';
import Log from '../middlewares/Log';

class Express {
    public express: express.Application;

    constructor() {
        this.express = express();
        // Get the environment variables
        this.mountDotEnv();
        // Mount the middlewares
        this.mountMiddlewares();
        // Mount the routes
        this.mountRoutes();
        // Initialize the database
        MySql.warmup();
    }

    private mountDotEnv(): void {
        // Load the .env file
        this.express = Config.Initialize(this.express);
    }

    private mountMiddlewares(): void {
        // Mount the Kernal middleware
        this.express = Kernal.Initialize(this.express);
    }

    private mountRoutes(): void {
        // Mount the static web
        this.express = Routes.mountWeb(this.express, express);
        this.express = Routes.mountApi(this.express, express);
    }

    public Initialize(): any {
        // Return the express application
        this.express
            .listen(Config.config().port, () => {
                Log.debug(
                    `Server running on http://localhost:${
                        Config.config().port
                    }`,
                    false
                );
            })
            .on('error', (err) => {
                console.log('Error:', err.message);
                Log.error(`${err}`);
            });
    }
}
export default new Express();
