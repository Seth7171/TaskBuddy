import { WorkoutsContext } from "../context/WrokoutContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext)

    if (!context) {
        throw Error("useWorkoutsContext must be used inside and WorkoutsContextProvider")
    }

    return context
}