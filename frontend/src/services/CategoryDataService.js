import http from "../http-common";

class CategoryDataService {
  getAll() {
    return http.get("/categories");
  }
  
  get(id) {
    return http.get(`/category/${id}`);
  }
  
  create(data) {
    return http.post("/category", data);
  }
  
  update(id, data) {
    return http.put(`/category/${id}`, data);
  }
  
  delete(id) {
    return http.delete(`/category/${id}`);
  }
  
  deleteAll() {
    return http.delete(`/categories`);
  }
  
  findByTitle(title) {
    return http.get(`/categories?title=${title}`);
  }
}

export default new CategoryDataService();