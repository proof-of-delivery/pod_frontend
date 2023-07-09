import firebase from './firebase'; // Import the firebase instance you initialized earlier

class FirebaseService {
  constructor() {
    this.db = firebase.database();
  }

  // Method to get all inventory items from the Realtime Database
  getInventoryItems(callback) {
    const inventoryRef = this.db.ref('inventory_items');
    inventoryRef.on('value', (snapshot) => {
      const items = snapshot.val();
      const itemList = [];
      for (let id in items) {
        itemList.push(items[id]);
      }
      callback(itemList);
    });
  }

  // Method to add a new inventory item to the Realtime Database
  addInventoryItem(item) {
    const inventoryRef = this.db.ref('inventory_items');
    inventoryRef.push(item);
  }

  // Method to update an existing inventory item in the Realtime Database
  updateInventoryItem(itemNo, updates) {
    const itemRef = this.db.ref(`inventory_items/${itemNo}`);
    itemRef.update(updates);
  }

  // Method to delete an inventory item from the Realtime Database
  deleteInventoryItem(itemNo) {
    const itemRef = this.db.ref(`inventory_items/${itemNo}`);
    itemRef.remove();
  }
}

export default new FirebaseService();
