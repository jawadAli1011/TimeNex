import api from "./axios";

export const departments =  () => {
    return api.get("/dropdowns/departments");
    
}