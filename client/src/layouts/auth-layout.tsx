import { Outlet } from "react-router";

export default function AuthLayout() {
    return (
        <>
            <div className="pt-2 pl-3">
                <span className="text-2xl font-semibold">ChatGPT</span>
            </div>
            <div className="flex justify-content-center align-items-center min-h-screen min-w-screen overflow-hidden">
                <Outlet />
            </div>
        </>
    )
}