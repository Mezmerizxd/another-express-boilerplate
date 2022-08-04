import * as cors from 'cors';
import { Application } from 'express';

class CORS {
    public mount(_express: Application): Application {
		const options = {
			origin: process.env.APP_URL || `http://localhost:${process.env.PORT}`,
			optionsSuccessStatus: 200		// Some legacy browsers choke on 204
		};

		_express.use(cors(options));
        return _express;
    }
}

export default new CORS;