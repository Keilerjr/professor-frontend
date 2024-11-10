export interface StudentInputData{
     aulasLecionadas: string | number;
     aulasAtendidas: string | number;
    notaP1: string | number;
    notaP2: string | number; 
};

export interface IDrawerContextData {
    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
    studentInputData: StudentInputData;
    setStudentInputData: (value:StudentInputData) => void;
};

export interface Student {
    id: string;
    name: string;
    status: string;
};

export interface StudentContextType {
    selectedStudent: Student | null;
    setSelectedStudent: (student: Student) => void;
}