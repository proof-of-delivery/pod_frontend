import FirebaseService from './firebaseService.js';

const populateFirebase = async () => {
  // Define an array of inventory items
  const inventoryItems = [
    {
      "item_no": "140108001",
      "description": "Wood",
      "supplier_no": "123",
      "quantity_on_hand": 100,
      "quantity_reserved": 10,
      "quantity_free": 90
    },
    {
      "item_no": "140108002",
      "description": "Steel",
      "supplier_no": "456",
      "quantity_on_hand": 200,
      "quantity_reserved": 20,
      "quantity_free": 180
    },
    {
      "item_no": "140108003",
      "description": "Aluminum",
      "supplier_no": "789",
      "quantity_on_hand": 150,
      "quantity_reserved": 15,
      "quantity_free": 135
    },
    {
      "item_no": "140108004",
      "description": "Copper",
      "supplier_no": "321",
      "quantity_on_hand": 120,
      "quantity_reserved": 12,
      "quantity_free": 108
    },
    {
        "item_no": "140108011",
        "description": "Brass",
        "supplier_no": "159",
        "quantity_on_hand": 400,
        "quantity_reserved": 40,
        "quantity_free": 360
      },
      {
        "item_no": "140108012",
        "description": "Bronze",
        "supplier_no": "753",
        "quantity_on_hand": 500,
        "quantity_reserved": 50,
        "quantity_free": 450
      },
      {
        "item_no": "140108013",
        "description": "Iron",
        "supplier_no": "951",
        "quantity_on_hand": 600,
        "quantity_reserved": 60,
        "quantity_free": 540
      },
      {
        "item_no": "140108014",
        "description": "Lead",
        "supplier_no": "357",
        "quantity_on_hand": 700,
        "quantity_reserved": 70,
        "quantity_free": 630
      },
    
];


  // Create a new instance of the FirebaseService class
 

  // Loop over the array of inventory items and add each one to Cloud Firestore
  for (const item of inventoryItems) {
    await FirebaseService.addInventoryItem(item);
  }
};

// Call the populateFirebase function to populate Cloud Firestore with inventory items
populateFirebase();
