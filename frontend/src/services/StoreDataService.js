import http from "../http-common";

class StoreDataService {
  getAll() {
    return http.get("/stores");
  }
  
  get(id) {
    return http.get(`/store/${id}`);
  }
  
  create(data) {
    return http.post("/store", data);
  }
  
  update(id, data) {
    return http.put(`/store/${id}`, data);
  }
  
  delete(id) {
    return http.delete(`/store/${id}`);
  }
  
  deleteAll() {
    return http.delete(`/stores`);
  }
  
  findByTitle(title) {
    return http.get(`/stores?title=${title}`);
  }
}

export default new StoreDataService();