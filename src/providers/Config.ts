// Dependencies
import { Application } from 'express';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Middleware
import Log from '../middlewares/Log';

export class Config {
    public static config(): any {
        dotenv.config({ path: path.join(__dirname, '../../.env') });
        const url = process.env.APP_URL || `http://localhost:3000`;
        const port = process.env.PORT || 3000;

        const name = process.env.APP_NAME || 'App Name';
        const year = new Date().getFullYear();
        const copyright = `Copyright ${year} ${name} | All Rights Reserved`;
        const company = process.env.COMPANY_NAME || 'App Name';
        const description = process.env.APP_DESCRIPTION || 'About Me!';

        const isCORSEnabled = process.env.CORS_ENABLED || true;
        const apiPrefix = process.env.API_PREFIX || 'api';

        const useGithub = process.env.USE_GITHUB || false;
        if (useGithub) {
            if (
                !process.env.GITHUB_USERNAME ||
                !process.env.GITHUB_PRIVATE_KEY ||
                !process.env.GITHUB_REPO_OWNER ||
                !process.env.GITHUB_REPO_NAME
            ) {
                Log.error(
                    'Github credentials are not set! Make a .env file with the following variables: GITHUB_USERNAME, GITHUB_PRIVATE_KEY, GITHUB_REPO_OWNER, GITHUB_REPO_NAME'
                );
                process.exit(1);
            }
        }
        const githubUsername = process.env.GITHUB_USERNAME;
        const githubPrivateKey = process.env.GITHUB_PRIVATE_KEY;
        const githubRepoOwner = process.env.GITHUB_REPO_OWNER;
        const githubRepoName = process.env.GITHUB_REPO_NAME;
        const githubRepoBranch = process.env.GITHUB_REPO_BRANCH || 'gh-pages';
        const staticWebRepoUrl = `https://${githubUsername}:${githubPrivateKey}@github.com/${githubRepoOwner}/${githubRepoName}`;

        const useMySql = process.env.USE_MYSQL || false;
        if (useMySql) {
            if (!process.env.MYSQL_HOST) {
                Log.error(
                    'MySQL credentials are not set! Make a .env file with the following variables: MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE'
                );
                process.exit(1);
            }
        }
        const mysqlHost = process.env.MYSQL_HOST;
        const mysqlUser = process.env.MYSQL_USER || 'root';
        const mysqlPassword = process.env.MYSQL_PASSWORD || 'root';
        const mysqlDatabase = process.env.MYSQL_DATABASE || 'node_app_db';

        return {
            apiPrefix,
            company,
            copyright,
            description,
            isCORSEnabled,
            name,
            port,
            url,
            useGithub,
            githubRepoOwner,
            githubRepoName,
            githubRepoBranch,
            staticWebRepoUrl,
            useMySql,
            mysqlHost,
            mysqlUser,
            mysqlPassword,
            mysqlDatabase,
        };
    }

    public static Initialize(_express: Application): Application {
        _express.locals.app = this.config();
        return _express;
    }
}

export enum MySqlTables {
    userAccounts = 'userAccounts',
    test = 'test',
}
