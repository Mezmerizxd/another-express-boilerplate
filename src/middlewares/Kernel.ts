// Dependencies
import { Application } from 'express';

// Middlewares
import Statics from './Statics';
import CORS from './CORS';
import Http from './Http';
import Log from './Log';

class Kernal {
    public static Initialize(_express: Application): Application {
        Log.info('[Kernal] Initializing...');

        Log.info('[Kernal] Mounting Statics...');
        _express = Statics.mount(_express);
        Log.info('[Kernal] Mounting CORS...');
        _express = CORS.mount(_express);
        Log.info('[Kernal] Mounting HTTP...');
        _express = Http.mount(_express);

        return _express;
    }
}

export default Kernal;
