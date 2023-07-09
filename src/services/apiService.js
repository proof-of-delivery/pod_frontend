import axios from 'axios';

const API_URL = 'https://pod-u1jp.onrender.com';

class WarehouseOrderService {
  getWarehouseOrders() {
    return axios.get(`${API_URL}/warehouse_orders`);
  }

  createWarehouseOrder(warehouseOrder) {
    return axios.post(`${API_URL}/warehouse_orders`, { warehouse_order: warehouseOrder });
  }

  updateWarehouseOrder(id, warehouseOrder) {
    return axios.put(`${API_URL}/warehouse_orders/${id}`, { warehouse_order: warehouseOrder });
  }

  deleteWarehouseOrder(id) {
    return axios.delete(`${API_URL}/warehouse_orders/${id}`);
  }
}

class ItemService {
  getItems() {
    return axios.get(`${API_URL}/items`);
  }

  createItem(item) {
    return axios.post(`${API_URL}/items`, { item: item });
  }

  updateItem(id, item) {
    return axios.put(`${API_URL}/items/${id}`, { item: item });
  }

  deleteItem(id) {
    return axios.delete(`${API_URL}/items/${id}`);
  }
}

export { WarehouseOrderService, ItemService };
