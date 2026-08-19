import api from "./axios";

export const designations =  ()=>{
  return api.get("/dropdowns/designations")
 
}