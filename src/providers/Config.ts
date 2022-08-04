import { Application } from 'express';
import * as path from 'path';

class Config {
    public static config(): any {
        const url = process.env.APP_URL || `http://localhost:${process.env.PORT}`;
		const port = process.env.PORT || 3000;
		const appSecret = process.env.APP_SECRET || 'This is your responsibility!';
		const mongooseUrl = process.env.MONGOOSE_URL;
		const maxUploadLimit = process.env.APP_MAX_UPLOAD_LIMIT || '50mb';
		const maxParameterLimit = process.env.APP_MAX_PARAMETER_LIMIT || '50mb';

        const name = process.env.APP_NAME || 'Mezmerizxd';
		const keywords = process.env.APP_KEYWORDS || 'Testing and stuff';
		const year = (new Date()).getFullYear();
		const copyright = `Copyright ${year} ${name} | All Rights Reserved`;
		const company = process.env.COMPANY_NAME || 'Mezmerizxd';
		const description = process.env.APP_DESCRIPTION || 'About Me!';

		const isCORSEnabled = process.env.CORS_ENABLED || true;
		const jwtExpiresIn = process.env.JWT_EXPIRES_IN || 3;
		const apiPrefix = process.env.API_PREFIX || 'api';

		const logDays = process.env.LOG_DAYS || 10;

		const queueMonitor = process.env.QUEUE_HTTP_ENABLED || true;
		const queueMonitorHttpPort = process.env.QUEUE_HTTP_PORT || 5550;

		return {
			appSecret,
			apiPrefix,
			company,
			copyright,
			description,
			isCORSEnabled,
			jwtExpiresIn,
			keywords,
			logDays,
			maxUploadLimit,
			maxParameterLimit,
			mongooseUrl,
			name,
			port,
			url,
			queueMonitor,
			queueMonitorHttpPort
		};
    }

    public static Initialize (_express: Application): Application {
		_express.locals.app = this.config();
		return _express;
	}
}

export default Config;