import http from "../http-common";

class ProductDataService {
  getAll(params) {
    return http.get("/products", { params });
  }

  create(data) {
    return http.post("/upload", data );
  }

  getUnprocessedTasks(){
    return http.get('/upload-tasks-count');
  }
}

export default new ProductDataService();
