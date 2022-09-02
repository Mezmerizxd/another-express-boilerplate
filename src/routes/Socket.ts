// Middlewares
import Log from "../middlewares/Log";

function Socket(socket: any): void {
    socket.on('disconnect', () => {
        Log.debug("[Socket] Connection closed.");
    })
}
export default Socket;