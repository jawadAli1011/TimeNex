import api from "./axios";

export const getEmpData =()=>{
    return api.get('/employees')
}
