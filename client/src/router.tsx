import { BrowserRouter, Route, Routes } from "react-router";
import AuthLayout from "./layouts/auth-layout";
import LoginWrapper from "./pages/auth/login-wrapper";
import Identifier from "./pages/auth/identifier";
import Password from "./pages/auth/password";
import MainLayout from "./layouts/main-layout";

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
                <Route path="/chat" element={<MainLayout />}>

                </Route>
            </Routes>
        </BrowserRouter>
    )
}