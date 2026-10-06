import { useState } from "react"
import api from "./axios"


export const getBranches = () => {   
    return api.get("/branches")
}

export const createBranches = (payload) => {  
    console.log(payload) 
    return api.post("/branches",payload)
}

export const deleteBranch = (id) => {
    return api.delete(`/branches/${id}`)
}

export const updateBranch = (id, payload) => {
    return api.put(`/branches/${id}`, payload)
}

