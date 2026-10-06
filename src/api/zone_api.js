import api from "./axios";

export const getZones = () => {
    return api.get("/zones")
}

export const createZones = (payload) => {
    return api.post("/zones", payload)
}

export const deleteZone = (id) => {
  return api.delete(`/zones/${id}`)
}

export const updateZone = (id, payload) =>{
    return api.put(`/zones/${id}`, payload)
}