import { createContext, useCallback, useContext, useState } from "react";
import { StudentInputData, IDrawerContextData } from "../classes-app/components/studentdrawer/StudentData";

type Props = {
    children?: React.ReactNode
  };

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () =>{
    return useContext(DrawerContext);
}

const initialStudentInputData: StudentInputData = {
    aulasLecionadas: '',
    aulasAtendidas: '',
    notaP1: '',
    notaP2: ''
}

export const DrawerProvider: React.FC<Props> = ({children}) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [studentInputData, setStudentInputData] = useState<StudentInputData>(initialStudentInputData)

    const toggleDrawerOpen = useCallback(() => {
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen)
    }, []);
    return (
        <DrawerContext.Provider value={{isDrawerOpen, toggleDrawerOpen, studentInputData, setStudentInputData }}>
            {children}
        </DrawerContext.Provider>
    )
}