import { Outlet, useNavigate } from "react-router";
import { useTokenCheckQuery } from "../hooks/useReactQuery";
import { useEffect, useState } from "react";
import { BlockUI } from "primereact/blockui";

export default function MainLayout() {
    const [blockUI, setBlockUI] = useState<boolean>(false);

    const navigate = useNavigate();

    const { isSuccess: isSuccessTokenCheck, isError: isErrorTokenCheck } = useTokenCheckQuery();
    
    const blockUITemplate = (
        <i className="pi pi-spin pi-spinner text-6xl"></i>
    )

    useEffect(() => {
        if(isSuccessTokenCheck) {
            setBlockUI(false);
        }
    }, [isSuccessTokenCheck])

    useEffect(() => {
        if(isErrorTokenCheck) {
            setBlockUI(false);
            navigate("/login/identifier");
        }
    }, [isErrorTokenCheck])

    return (
        <BlockUI blocked={blockUI} fullScreen template={blockUITemplate} style={{backgroundColor: 'transparent'}}>
            <Outlet />
        </BlockUI>
    )
}