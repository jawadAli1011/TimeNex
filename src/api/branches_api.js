import { useState } from "react"
import api from "./axios"


export const getBranches = () => {   
    return api.get("/branches")
}