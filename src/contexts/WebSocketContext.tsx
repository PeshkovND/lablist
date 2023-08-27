import { io, Socket } from "socket.io-client";
import { createContext } from "react";

type AppSockets = {
    messagesSocket: Socket
    labsSocket: Socket
}


export const appSockets: AppSockets = {
    messagesSocket: io('http://localhost:3003'),
    labsSocket: io('http://localhost:3002')
}
export const WebsocketContext = createContext<AppSockets>(appSockets);
export const WebsocketProvider = WebsocketContext.Provider;