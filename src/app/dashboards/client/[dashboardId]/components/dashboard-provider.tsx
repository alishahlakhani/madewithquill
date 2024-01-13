import { DefaultsType } from "@zero/app/dashboards/action";
import React, { createContext, useState, useContext, Dispatch, SetStateAction } from "react";

const DashboardStateContext = createContext({
    state: {} as DefaultsType,
    setState: {} as Dispatch<SetStateAction<DefaultsType>>,
});

const DashboardStateProvider = ({
    children,
    value = {} as DefaultsType,
}: {
    children: React.ReactNode;
    value?: DefaultsType;
}) => {
    const [state, setState] = useState(value);
    return (
        <DashboardStateContext.Provider value={{ state, setState }}>
            {children}
        </DashboardStateContext.Provider>
    );
};

const useDashboardState = () => {
    const context = useContext(DashboardStateContext);
    if (!context) {
        throw new Error("useDashboardState must be used within a DashboardStateContext");
    }
    return context;
};

export { DashboardStateProvider, useDashboardState };
