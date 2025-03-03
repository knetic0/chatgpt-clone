import { Context, createContext, RefObject, useRef } from "react";
import { ToastContextProps, ToastContextProviderProps, ToastOptions } from "../types/providers";
import { Toast } from "primereact/toast";

export const ToastContext : Context<ToastContextProps | undefined> = createContext<ToastContextProps | undefined>(undefined);

export default function ToastContextProvider({ children } : ToastContextProviderProps) {
    const toastRef : RefObject<Toast| null> = useRef<Toast | null>(null);

    const showToast = (options : ToastOptions) => {
        if(!toastRef?.current) return;
        toastRef.current.show({ ...options });
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            <Toast ref={toastRef} />
            {children}
        </ToastContext.Provider>
    )
}