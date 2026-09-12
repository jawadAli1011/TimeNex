import api from "./axios";

export const getZones = () => {
    return api.get("/zones")
}