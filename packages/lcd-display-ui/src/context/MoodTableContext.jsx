import { createContext } from 'react'
import WSSBridgeClient from "@mood-table/shared/src/wss-bridge/client";

export const MoodTableContext = createContext();
export default function MoodTableContextProvider(props) {
    const { children } = props;
    const wss = new WSSBridgeClient();
    const value = {
        wss
    }
    return (
        <MoodTableContext.Provider value={value}>{children}</MoodTableContext.Provider>
    )
}
