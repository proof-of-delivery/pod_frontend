import { faker } from '@faker-js/faker';

export const mockCustomers = [
  {
    id: "C001",
    name: "Customer 1"
  },
  {
    id: "C002",
    name: "Customer 2"
  }
];

const generateMockWarehouseOrders = (numOrders) => {
  const mockWarehouseOrders = [];

  for (let i = 0; i < numOrders; i++) {
    const order = {
      orderNo: `WO00${i + 1}`,
      customerId: mockCustomers[Math.floor(Math.random() * mockCustomers.length)].id,
      assistanceId: `A00${i + 1}`,
      shipName: faker.company.buzzAdjective(),
      deliveryDate: faker.date.future().toLocaleDateString(),
      deliveryAddress: faker.address.streetAddress(),
      items: generateMockItems(),
    };

    mockWarehouseOrders.push(order);
  }

  return mockWarehouseOrders;
};

const generateMockItems = () => {
  const unitOptions = ['pcs', 'kg', 'm'];
  const randomIndex = Math.floor(Math.random() * unitOptions.length);
  const numItems = faker.number.bigInt({ min: 1, max: 5 });
  const items = [];

  for (let i = 0; i < numItems; i++) {
    const item = {
      position: i + 1,
      so: `SO00${i + 1}`,
      itemNumber: `Item00${i + 1}`,
      itemDescription: faker.commerce.productName(),
      unit: unitOptions[randomIndex],
      quantity: faker.number.bigInt({ min: 1, max: 10 }),
      requestQuantity: 0,
      confirmedQuantity: 0,
      totalRequestedQuantity: 0,
      totalConfirmedQuantity: 0,
      pickedUpQuantity: 0,
      quantityOnHand: 0,
      quantityReserved: 0,
      quantityBackordered: 0,
      backorderQuantityReceived: 0,
    };

    items.push(item);
  }

  return items;
};

export const mockWarehouseOrders = generateMockWarehouseOrders(20);
