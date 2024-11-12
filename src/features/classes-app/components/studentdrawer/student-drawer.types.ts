export interface IStudentInputData{
    aulas_lecionadas: any;
    aulas_atendidas: any;
    nota_p1: any;
    nota_p2: any; 
};

export interface IDrawerContextData {
    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
    studentInputData: IStudentInputData;
    setStudentInputData: (value:IStudentInputData) => void;
};

export interface IStudent {
    id: string;
    name: string;
    status: string;
};

export interface IStudentContextType {
    selectedStudent: IStudent | null;
    setSelectedStudent: (student: IStudent) => void;
}