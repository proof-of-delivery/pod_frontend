import db from '../../firebase.js';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';

class FirebaseService {
  constructor() {
    this.db = db;
  }

  // Method to get all inventory items from Cloud Firestore
  async getInventoryItems() {
    const inventoryRef = collection(this.db, 'inventory_items');
    const snapshot = await getDocs(inventoryRef);
    const itemList = [];
    snapshot.forEach((doc) => {
      itemList.push({ id: doc.id, ...doc.data() });
    });
    return itemList;
  }

  // Method to add a new inventory item to Cloud Firestore
  async addInventoryItem(item) {
    const inventoryRef = collection(this.db, 'inventory_items');
    await addDoc(inventoryRef, item);
  }

  // Method to update an existing inventory item in Cloud Firestore
  async updateInventoryItem(itemNo, updates) {
    const itemRef = doc(this.db, `inventory_items/${itemNo}`);
    await updateDoc(itemRef, updates);
  }

  // Method to delete an inventory item from Cloud Firestore
  async deleteInventoryItem(itemNo) {
    const itemRef = doc(this.db, `inventory_items/${itemNo}`);
    await deleteDoc(itemRef);
  }
}

export default new FirebaseService();
