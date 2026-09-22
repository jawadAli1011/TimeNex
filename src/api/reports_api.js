import api from "./axios"

export const getMonthlyDetailReports = (payload) => {
    return api.post("/reports/monthly-details", payload)
}

