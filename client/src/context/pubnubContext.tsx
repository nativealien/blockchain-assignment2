import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import PubNubServer from "../models/PubNubServer.tsx";

const pubnub = new PubNubServer()

export const PubNubContext = createContext<any | null>({pubnub})

interface IProviderProps{
    children: ReactNode
}

export const PubNubProvider: React.FC<IProviderProps> = ({ children }) => {
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        const handleMessage = (event: { message: any }) => {
        setMessages(event.message);
        };

        pubnub.addListener({ message: handleMessage });
        pubnub.subscribe({ channels: ['Blockchain', 'Client', 'Client1'] });
        console.log(pubnub.blockchain)
        return () => {
            pubnub.removeListener({ message: handleMessage });
            pubnub.unsubscribeAll();
        };
    }, []);
    return <PubNubContext.Provider value={{pubnub, messages}}>
                { children }
            </PubNubContext.Provider>
    }

export const usePubNub = (): PubNubServer => {
    const context = useContext(PubNubContext);
    if (context === null) {
        throw new Error('usePubNub must be used within a PubNubProvider');
    }
    return context;
};