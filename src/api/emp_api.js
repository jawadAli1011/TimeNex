import api from "./axios";

export const getEmpData =()=>{
    return api.get('/employees')
}

export const getUnusedId = () =>{
    return api.get("/employees/suggest_unused_ids")
}