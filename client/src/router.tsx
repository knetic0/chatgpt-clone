import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import AuthLayout from "./layouts/auth-layout";
import LoginWrapper from "./pages/auth/login-wrapper";
import Identifier from "./pages/auth/identifier";
import Password from "./pages/auth/password";
import MainLayout from "./layouts/main-layout";
import Home from "./pages/home";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<LoginWrapper />}>
                        <Route path="identifier" element={<Identifier />} />
                        <Route path="password" element={<Password />} />
                    </Route>
                </Route>
                <Route path="/" element={<Navigate to="/chat" replace />} />
                <Route element={<MainLayout />}>
                    <Route path="/chat" element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}