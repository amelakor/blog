import { useEffect, createContext, useContext, ReactNode } from "react";

const MessageContext = createContext<string | undefined>(undefined);

export const MessageProvider: React.FC<{
    children: ReactNode;
}> = ({ children }) => {
    return (
        <MessageContext.Provider value="">{children}</MessageContext.Provider>
    );
};

export const useMessage = (componentName: string) => {
    const message = useContext(MessageContext);

    if (message === undefined) {
        throw new Error("useMessage must be used within a MessageProvider");
    }

    useEffect(() => {
        console.log(`Hello from ${componentName}`);
    }, [message, componentName]);
};
