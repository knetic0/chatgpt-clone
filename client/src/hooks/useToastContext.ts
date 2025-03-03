import { useContext } from "react";
import { ToastContextProps } from "../types/providers";
import { ToastContext } from "../providers/toast-provider";

export const useToastContext = () => {
    const context : ToastContextProps | undefined = useContext(ToastContext);
    if(!context) throw new Error("useToastContext must be used within a ToastContextProvider");
    return context;
}