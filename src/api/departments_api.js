import api from "./axios";

export const departments =  () => {
    return api.get("/dropdowns/departments");
    
}

export const createDepartment = (payload) => {
    return api.post("/departments", payload)
}