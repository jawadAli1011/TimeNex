import api from "./axios";

// export const getRegions = () => {
//     return api.get('/dropdowns/regions')
// }

export const getRoles = () => {
    return api.get('/dropdowns/roles')
}

// export const departments =  () => {
//     return api.get("/dropdowns/departments");
    
// }

export const designations =  ()=>{
  return api.get("/dropdowns/designations")
 
}