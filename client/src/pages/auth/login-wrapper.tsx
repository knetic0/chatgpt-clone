import { Divider } from "primereact/divider"
import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router"
import { useToastContext } from "../../hooks/useToastContext";
import { useLoginMutation } from "../../hooks/useReactQuery";
import { LoginRequest } from "../../types/auth";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginWrapper() {
    const {
        mutate: loginMutation,
        isPending: isLoggingIn,
        isSuccess: isLoginSuccess,
        isError: isLoginError,
        error: loginError
    } = useLoginMutation();

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const { showToast } = useToastContext();
    const navigate = useNavigate();

    const validateEmail = () => {
        if(!email || email.trim() == "") {
            return false;
        }
        return emailRegex.test(email);
    }

    const handleSubmitEmail = () => {
        if(validateEmail()) {
            navigate('/login/password')
        } else {
            showToast({ severity: "error", summary: "Invalid Email", detail: "Please enter a valid email address" })
        }
    }

    const handleSubmitLogin = () => {
        const credentials: LoginRequest = {
            email,
            password
        }
        loginMutation(credentials)
    }

    useEffect(() => {
        if(isLoginSuccess) {
            showToast({ severity: "success", summary: "Login Success", detail: "You have successfully logged in" });
            navigate("/");
        }
    }, [isLoginSuccess])

    useEffect(() => {
        if(isLoginError) {
            showToast({ severity: "error", summary: "Login Failed", detail: loginError?.message })
        }
    }, [isLoginError])

    return (
        <div className="flex flex-column gap-5 w-20rem text-center">
            <span className="font-semibold text-5xl ">Welcome Back</span>
            <Outlet context={{ email, setEmail, password, setPassword, handleSubmitEmail, handleSubmitLogin, isLoggingIn }} />
            <span className="">
                Don't have an account?{" "}
                <a className="text-green-500">Sign up</a>
            </span>
            <Divider align="center">
                <div className="text-sm font-semibold text-gray-400">OR</div>
            </Divider>
        </div>
    )
}