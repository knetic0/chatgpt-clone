import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Password as PasswordInput } from "primereact/password";

interface PasswordOutletContext {
    email: string;
    password: string;
    setPassword: (password: string) => void;
    handleSubmitLogin: () => void;
    isLoggingIn: boolean;
}

export default function Password() {
    const { email, password, setPassword, handleSubmitLogin, isLoggingIn }: PasswordOutletContext = useOutletContext();

    const navigate = useNavigate();

    const handleEdit = () => {
        setPassword("");
        navigate("/login/identifier")
    }

    useEffect(() => {
        if(!email) {
            handleEdit();
        }
    }, [])

    return (
        <>
            <div className="relative">
                <FloatLabel>
                    <InputText disabled className="w-full" id="email" value={email} />
                    <label htmlFor="email">Email Address</label>
                </FloatLabel>
                <Button link severity="contrast" label="Edit" className="absolute top-0 right-0 text-md text-black-alpha-90" onClick={handleEdit} />
            </div>
            <FloatLabel>
                <PasswordInput feedback={false} inputClassName="w-full" className="w-full" id="password" value={password} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                <label htmlFor="password">Password</label>
            </FloatLabel>
            <Button loading={isLoggingIn} severity="contrast" label="Continue" onClick={handleSubmitLogin} />
        </>
    )
}