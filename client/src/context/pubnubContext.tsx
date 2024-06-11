import { createContext, ReactNode } from "react";
import PubNub from 'pubnub';
import { PUBNUB_CREDENTIALS } from '../config/settings.ts'

const pubnub = new PubNub(PUBNUB_CREDENTIALS)

const PubNubContext = createContext<PubNub | null>(null)

interface IProviderProps{
    children: ReactNode
}

export const PubNubProvider: React.FC<IProviderProps> = ({ children }) => {
    return <PubNubContext.Provider value={pubnub}>
        { children }
    </PubNubContext.Provider>
}