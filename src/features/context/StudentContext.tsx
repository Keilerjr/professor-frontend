import React, { createContext, useContext, useState} from 'react';
import { IStudent, IStudentContextType } from '../classes-app/components/studentdrawer/student-drawer.types.ts';

type Props = {
    children?: React.ReactNode
  };

const StudentContext = createContext({} as IStudentContextType);

export const useStudentContext = () => {
    return useContext(StudentContext);
};

export const StudentProvider: React.FC<Props> = ({ children }) => {
    const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null);

    return (
        <StudentContext.Provider value={{ selectedStudent, setSelectedStudent}}>
            {children}
        </StudentContext.Provider>
    );
};


