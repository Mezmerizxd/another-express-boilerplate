// Dependencies
import * as os from 'os';
import * as _cluster from 'cluster';
const cluster = _cluster as unknown as _cluster.Cluster; 

// Exceptions
import NativeEvent from './exceptions/NativeEvent';

// Providers
import App from "./providers/App";

if (cluster.isPrimary) {
    NativeEvent.process();
    const CPUS: any = os.cpus();
    CPUS.forEach(() => cluster.fork());
    NativeEvent.cluster(cluster);
} else {
    App.startDatabase();
    App.startServer();
}
