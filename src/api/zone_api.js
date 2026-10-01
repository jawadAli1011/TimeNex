import api from "./axios";

export const getZones = () => {
    return api.get("/zones")
}

export const createZones = (payload) => {
    return api.post("/zones", payload)
}