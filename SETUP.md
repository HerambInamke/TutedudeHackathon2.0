# Authentication System Setup

This project now includes a location-based authentication system where users can sign up and login using their phone number and location.

## Features

### Signup Process
- User enters: Name, Phone Number, Address Line 1, Address Line 2 (optional), State, Pincode
- System automatically requests location access (latitude/longitude)
- No password required
- User selects role (Buyer/Seller)
- Data is saved to MongoDB with location coordinates

### Login Process
- User enters only their phone number
- System finds user by phone number
- No password verification
- Redirects to appropriate dashboard based on role

## Backend Setup

1. **Install Dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Set up MongoDB**
   - Make sure MongoDB is running locally
   - Or update the MONGO_URI in server/index.js to point to your MongoDB instance

3. **Start the Server**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on http://localhost:5000

## Frontend Setup

1. **Install Dependencies**
   ```bash
   cd client
   npm install
   ```

2. **Start the Client**
   ```bash
   cd client
   npm run dev
   ```
   Client will run on http://localhost:5173

## API Endpoints

### POST /api/auth/signup
Creates a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "phoneNumber": "1234567890",
  "addressLine1": "123 Main St",
  "addressLine2": "Apartment 4B",
  "state": "Karnataka",
  "pincode": "560001",
  "latitude": 12.9716,
  "longitude": 77.5946,
  "role": "buyer"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "phoneNumber": "1234567890",
    "role": "buyer",
    "addressLine1": "123 Main St",
    "addressLine2": "Apartment 4B",
    "state": "Karnataka",
    "pincode": "560001",
    "latitude": 12.9716,
    "longitude": 77.5946
  }
}
```

### POST /api/auth/login
Logs in a user by phone number.

**Request Body:**
```json
{
  "phoneNumber": "1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "phoneNumber": "1234567890",
    "role": "buyer",
    "addressLine1": "123 Main St",
    "addressLine2": "Apartment 4B",
    "state": "Karnataka",
    "pincode": "560001",
    "latitude": 12.9716,
    "longitude": 77.5946
  }
}
```

## Database Schema

The User model includes:
- `name`: String (required)
- `phoneNumber`: String (required, unique)
- `role`: String (enum: 'buyer', 'seller')
- `latitude`: Number (required)
- `longitude`: Number (required)
- `addressLine1`: String (required)
- `addressLine2`: String (optional)
- `state`: String (required)
- `pincode`: String (required, 6 digits)
- `location`: GeoJSON Point for spatial queries
- `timestamps`: Created/updated timestamps

## Location Features

- **Automatic Location Detection**: The signup form automatically requests location access
- **Manual Location Refresh**: Users can click the location button to refresh their coordinates
- **Error Handling**: Proper error messages for location permission denied, timeout, etc.
- **Spatial Indexing**: MongoDB 2dsphere index for efficient location-based queries

## Security Notes

- No password authentication (as requested)
- Phone number serves as the primary identifier
- Location data is stored for proximity-based features
- Consider implementing rate limiting for production use

## Testing

1. Start both server and client
2. Navigate to http://localhost:5173
3. Try signing up with a new phone number
4. Allow location access when prompted
5. Try logging in with the same phone number
6. Verify redirection to appropriate dashboard 