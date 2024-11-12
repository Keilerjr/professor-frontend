import { createContext, useCallback, useContext, useState } from "react";
import { IStudentInputData, IDrawerContextData} from "../classes-app/components/studentdrawer/student-drawer.types.ts";

type Props = {
    children?: React.ReactNode
  };

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () =>{
    return useContext(DrawerContext);
}

export const initialStudentInputData: IStudentInputData = {
    aulas_lecionadas: '',
    aulas_atendidas: '',
    nota_p1: '',
    nota_p2: '',
}


export const DrawerProvider: React.FC<Props> = ({children}) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [studentInputData, setStudentInputData] = useState<IStudentInputData>(initialStudentInputData)


    const toggleDrawerOpen = useCallback(() => {
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen)
    }, []);
    return (
        <DrawerContext.Provider value={{isDrawerOpen, toggleDrawerOpen, studentInputData, setStudentInputData }}>
            {children}
        </DrawerContext.Provider>
    )
}