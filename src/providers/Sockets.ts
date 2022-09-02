// Middlewares
import Log from "../middlewares/Log";

// Routes
import Socket from "../routes/Socket";

class Sockets {
    public socket: any;
    private io: any;

    constructor(io: any) {
        if (!io) {
            Log.error("[Sockets] Failed to get IO.");
            return;
        }
        this.io = io;
        this.init();
    }

    public init(): void {
        this.io.on('connection', (sockets: any) => {
            this.socket = sockets;
            Socket(sockets);
            Log.debug("[Socket] Connection established.");
        })
    }
}

export default Sockets;