import * as path from 'path';
import * as express from 'express';

class Statics {
    public static mount(_express: express.Application): express.Application {
        _express.use(express.static(path.join(__dirname, '../../build/mezmerizxd-web')));
        return _express;
    }
}

export default Statics;