import http from "../http-common";

class ProductDataService {
  getAll(params) {
    return http.get("/products", { params });
  }

  create(data) {
    return http.post("/products", data);
  }

  delete(id) {
    return http.delete(`/products/${id}`);
  }

  deleteAll() {
    return http.delete(`/products`);
  }
}

export default new ProductDataService();
