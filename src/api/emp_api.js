import api from "./axios";

export const createEmp = (formData) => {
    return api.post('/employees', formData)
}

export const updateEmp = (id, formData) => {
    return api.put(`/employees/${id}`, formData)
}

export const getEmpData =()=>{
    return api.get('/employees')
}

export const deleteEmp = (id) => {
    return api.delete(`/employees/${id}`)
}

export const getUnusedId = () =>{
    return api.get("/employees/suggest_unused_ids")
}

