import api from "./axios";

export const postTimeCategory=(payload)=>{
    return api.post("/time-categories", payload)
}

export const getTimeCategories = () => {
  return api.get("/time-categories");
};

export const deleteTimeCategory = (id) => {
  return api.delete(`/time-categories/${id}`)
}

export const updateTimeCategory = (id, payload) => {
  return api.put(`/time-categories/${id}`, payload);
};