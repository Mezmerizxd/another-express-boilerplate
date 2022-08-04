// Middlewares
import Log from '../middlewares/Log';

class NativeEvent {
    public cluster(_cluster): void {
        _cluster.on('online', (worker) => {
            Log.info(`Worker ${worker.id} is online`);
        }).on('listening', (worker, address) => {
            Log.info(`Worker ${worker.id} is listening on ${address.address}:${address.port}`);
        }).on('exit', (worker, code, signal) => {
            Log.info(`Worker ${worker.id} died with code: ${code} and signal: ${signal}`);
            Log.info(`Starting a new worker`);
            _cluster.fork();
        }).on('disconnect', (worker) => {
            Log.info(`Worker ${worker.id} disconnected`);
        }).on('fork', (worker) => {
            Log.info(`Worker ${worker.id} forked`);
        }).on('listening', (worker, address) => {
            Log.info(`Worker ${worker.id} is listening on ${address.address}:${address.port}`);
        }).on('message', (worker, message, handle) => {
            Log.info(`Worker ${worker.id} sent a message: ${message}`);
        }).on('online', (worker) => {
            Log.info(`Worker ${worker.id} is online`);
        }).on('setup', (worker) => {
            Log.info(`Worker ${worker.id} setup`);
        }).on('stopping', (worker, timeout, callback) => {
            Log.info(`Worker ${worker.id} stopping`);
        }).on('stopped', (worker) => {
            Log.info(`Worker ${worker.id} stopped`);
        }).on('SIGINT', () => {
            Log.info('SIGINT received.');
            _cluster.disconnect(() => {
                Log.info('disconnect event');
                process.exit(0);
            }).kill(() => {
                Log.info('kill event');
                process.exit(0);
        })})
    }

    public process (): void {
		// Catch the Process's uncaught-exception
		process.on('uncaughtException', (exception: any) =>
			Log.error(exception.stack)
		);

		// Catch the Process's warning event
		process.on('warning', (warning: any) =>
			Log.warn(warning.stack)
		);
	}
}
export default new NativeEvent;
