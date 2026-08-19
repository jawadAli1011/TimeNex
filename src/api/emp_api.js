import api from "./axios";

export const getEmpData =(filters = {})=>{
    const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(
            ([_, value]) =>
                value !== "" &&
            value !== null &&
            value !== undefined
        )
    )
    return api.get('/employees',{
        params: cleanFilters,
    } )
}
