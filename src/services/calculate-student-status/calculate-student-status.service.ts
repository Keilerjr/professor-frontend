import axios from "axios"
import { IStudent, IStudentInputData } from "../../features/classes-app/components/studentdrawer/student-drawer.types.ts";
import { ApiException } from "./ApiException.service";


export const Api = () => {
    return axios.create(({
        baseURL: 'http://localhost:8080'
    }))
};

const calculate = async (inputData: IStudentInputData, student: IStudent): Promise<string | ApiException> => {
    try {
        const {data} = await Api().post(`/students/${student.id}/evaluation`, inputData);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao calcular');
}
};

export const CalculateStudentStatus = {
    calculate,
};