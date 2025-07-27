// MongoDB initialization script
db = db.getSiblingDB('chotu');

// Create collections with indexes
db.createCollection('users');
db.createCollection('products');
db.createCollection('orders');
db.createCollection('ratings');
db.createCollection('transactions');
db.createCollection('groupbuys');

// Create indexes for better performance
db.users.createIndex({ "phoneNumber": 1 }, { unique: true });
db.users.createIndex({ "location": "2dsphere" });
db.users.createIndex({ "role": 1 });

db.products.createIndex({ "sellerId": 1 });
db.products.createIndex({ "category": 1 });
db.products.createIndex({ "location": "2dsphere" });
db.products.createIndex({ "isAvailable": 1 });

db.orders.createIndex({ "buyerId": 1 });
db.orders.createIndex({ "sellerId": 1 });
db.orders.createIndex({ "productId": 1 });
db.orders.createIndex({ "status": 1 });
db.orders.createIndex({ "deliveryDate": 1 });

db.ratings.createIndex({ "productId": 1 });
db.ratings.createIndex({ "sellerId": 1 });
db.ratings.createIndex({ "buyerId": 1, "productId": 1, "orderId": 1 }, { unique: true });

db.transactions.createIndex({ "userId": 1 });
db.transactions.createIndex({ "date": 1 });

db.groupbuys.createIndex({ "sellerId": 1 });
db.groupbuys.createIndex({ "status": 1 });
db.groupbuys.createIndex({ "location": "2dsphere" });
db.groupbuys.createIndex({ "category": 1 });
db.groupbuys.createIndex({ "participants.buyerId": 1 });

print('Database initialized successfully!');