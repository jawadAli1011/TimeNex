import api from "./axios"

export const getRegions = () => {
    return api.get('/dropdowns/regions')
}

export const createRegion = (payload) => {
return api.post('/regions', payload)
}

export const deleteRegion = (id) => {
    return api.delete(`/regions/${id}`)
}

export const updateRegion = (id, payload) => {
    return api.put(`/regions/${id}`, payload)
}