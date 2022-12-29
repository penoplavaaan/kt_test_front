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

  getStatistics(){
    return http.get('/products/statistics');
  }

  downloadReport(){
    return http.get('/products/statistics/download', {
      responseType: 'blob',
    });
  }
}

export default new ProductDataService();
