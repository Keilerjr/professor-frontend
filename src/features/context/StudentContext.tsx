import React, { createContext, useContext, useState} from 'react';
import { Student, StudentContextType } from '../classes-app/components/studentdrawer/StudentData';

type Props = {
    children?: React.ReactNode
  };


const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<Props> = ({ children }) => {
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    return (
        <StudentContext.Provider value={{ selectedStudent, setSelectedStudent }}>
            {children}
        </StudentContext.Provider>
    );
};

export const useStudentContext = () => {
    const context = useContext(StudentContext);
    if (!context) {
        throw new Error('useStudentContext must be used within a StudentProvider');
    }
    return context;
};

