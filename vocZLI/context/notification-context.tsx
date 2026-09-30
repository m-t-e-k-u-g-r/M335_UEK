import {createContext, type ReactNode, useContext} from "react";
import * as Notifications from 'expo-notifications';

interface NotificationContextType {
    sendNotification: (title: string, msg?: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldPlaySound: false,
            shouldSetBadge: false,
            shouldShowBanner: true,
            shouldShowList: true,
        }),
    });

    function sendNotification(title: string, msg?: string) {
        Notifications.scheduleNotificationAsync({
            trigger: null,
            content: {
                title,
                body: msg,
            }
        })
            .catch((e) => console.error(`Failed to send notification: ${e}`));
    }

    return (
        <NotificationContext.Provider value={{ sendNotification }}>
            { children }
        </NotificationContext.Provider>
    )
}

export function useNotificationContext() {
    const context = useContext(NotificationContext);
    if (context == null) throw new Error("useNotificationContext() is required to be used inside <NotificationProvider>")
    return context;
}
