import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useOutletContext } from "react-router"

interface IdentifierOutletContext {
    email: string;
    setEmail: (email: string) => void;
    handleSubmitEmail: () => void;
}

export default function Identifier() {
    const { email, setEmail, handleSubmitEmail }: IdentifierOutletContext = useOutletContext();

    return(
        <>
            <FloatLabel>
                <InputText className="w-full" id="email" value={email} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                <label htmlFor="email">Email Address</label>
            </FloatLabel>
            <Button severity="contrast" label="Continue" onClick={handleSubmitEmail} />
        </>
    )
}