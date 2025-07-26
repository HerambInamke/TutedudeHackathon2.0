# TutedudeHackathon2.0 - Technical Index

## API Documentation

### Base URL
- **Server**: `http://localhost:5000`
- **API Prefix**: `/api`

### Endpoints

#### Supplier Endpoints
- **GET** `/api/suppliers`
  - **Description**: Get nearby suppliers based on location
  - **Query Parameters**:
    - `longitude` (required): Longitude coordinate
    - `latitude` (required): Latitude coordinate
  - **Response**: Array of supplier objects
  - **Max Distance**: 5km radius
  - **Controller**: `supplier.controller.js::getNearbySuppliers`

## Database Schemas

### User Model (`User`)
```javascript
{
  name: String (required),
  phoneNumber: String (required),
  role: String (enum: ['vendor', 'supplier'], default: 'vendor'),
  location: {
    type: String (enum: ['Point'], default: 'Point'),
    coordinates: [Number] (required) // [longitude, latitude]
  },
  address: {
    line1: String,
    city: String (default: 'Secunderabad'),
    pincode: String,
    landmark: String
  },
  timestamps: true
}
```
- **Indexes**: `location: '2dsphere'` for geospatial queries

### Transaction Model (`Transaction`)
```javascript
{
  userId: ObjectId (ref: 'User', required),
  type: String (enum: ['income', 'expense'], required),
  amount: Number (required),
  category: String (default: 'misc'),
  date: Date (default: Date.now)
}
```

### Product Model (`Product`)
- **Status**: Empty/Not implemented

## Frontend Routes

### Application Routes (`PageRoutes.jsx`)

#### Public Routes
- `/` - SplashPage (Landing page)
- `/login` - Login page
- `/signup` - Signup page

#### Buyer Routes
- `/buyer/dashboard` - BuyerDashboard
- `/buyer/order-milk` - OrderMilk (Main ordering interface)
- `/buyer/my-orders` - MyOrders (Order history)
- `/buyer/group-buy` - GroupBuy (Group purchasing)
- `/buyer/todays-accounts` - TodaysAccounts (Daily financial summary)

#### Seller Routes
- `/seller/dashboard` - SellerDashboard

#### Fallback
- `*` - Redirects to `/` (SplashPage)

### Route Features
- **Lazy Loading**: All components are lazy-loaded for performance
- **Suspense**: Loading fallback during component loading
- **Navigation**: React Router DOM with programmatic navigation

## React Components

### Core Components

#### `App.jsx`
- Main application wrapper
- Renders PageRoutes component

#### `main.jsx`
- React application entry point
- Renders App component to DOM

### Reusable Components

#### `Button.jsx`
- Reusable button component
- Customizable styling and behavior

#### `Header.jsx`
- Application header component
- Navigation and branding

#### `IconCard.jsx`
- Card component with icon support
- Used for dashboard tiles and feature cards

#### `Modal.jsx`
- Modal dialog component
- Overlay and content management

### Page Components

#### Authentication Pages
- **`Login.jsx`** (110 lines): User authentication form
- **`Signup.jsx`** (143 lines): User registration form

#### Buyer Pages
- **`BuyerDashboard.jsx`** (66 lines): Buyer main dashboard
- **`OrderMilk.jsx`** (182 lines): Primary milk ordering interface
- **`MyOrders.jsx`** (79 lines): Order history and management
- **`GroupBuy.jsx`** (80 lines): Collaborative purchasing feature
- **`TodaysAccounts.jsx`** (65 lines): Daily financial overview

#### Seller Pages
- **`SellerDashboard.jsx`** (19 lines): Seller management interface (minimal)

#### Landing Page
- **`SplashPage.jsx`** (49 lines): Application landing page

## Backend Architecture

### Server Configuration (`index.js`)
```javascript
// Middleware
app.use(cors())
app.use(express.json())

// Database Connection
mongoose.connect(process.env.MONGO_URI, {family: 4})

// Routes
app.use('/api', supplierRoutes)

// Server
PORT = process.env.PORT || 5000
```

### Controllers

#### `supplier.controller.js`
- **Function**: `getNearbySuppliers(req, res)`
  - **Purpose**: Find suppliers within 5km radius
  - **Input**: longitude, latitude query parameters
  - **Output**: Array of supplier objects
  - **Technology**: MongoDB geospatial queries with `$nearSphere`

### Models

#### Geospatial Features
- **Location-based queries**: Using MongoDB 2dsphere index
- **Proximity search**: 5km radius for supplier discovery
- **Coordinate system**: GeoJSON Point format [longitude, latitude]

## Development Environment

### Frontend Development
```bash
cd client
npm run dev    # Vite dev server (http://localhost:5173)
npm run build  # Production build
npm run lint   # ESLint checking
```

### Backend Development
```bash
cd server
npm run dev    # Nodemon server (http://localhost:5000)
```

### Environment Variables
- `MONGO_URI`: MongoDB connection string
- `PORT`: Server port (default: 5000)

## Technology Stack Details

### Frontend Stack
- **React 19.1.0**: Latest React with concurrent features
- **Vite 7.0.4**: Fast build tool and dev server
- **TailwindCSS 4.1.11**: Utility-first CSS framework
- **React Router DOM 6.30.1**: Client-side routing
- **Lucide React 0.525.0**: Icon library
- **ESLint 9.30.1**: Code linting and formatting

### Backend Stack
- **Express 5.1.0**: Web framework
- **Mongoose 8.16.5**: MongoDB ODM
- **CORS 2.8.5**: Cross-origin resource sharing
- **dotenv 17.2.1**: Environment variable management

## Key Features Analysis

### Implemented Features
1. **Location-based supplier discovery**
2. **User role management** (vendor/supplier)
3. **Geospatial indexing** for performance
4. **Transaction tracking** system
5. **Multi-role frontend** (buyer/seller interfaces)
6. **Lazy-loaded routing** for performance

### Missing/Incomplete Features
1. **Product model implementation**
2. **Authentication middleware**
3. **Order management system**
4. **Payment integration**
5. **Real-time updates**
6. **Error handling middleware**
7. **Input validation**
8. **API documentation**

## Database Operations

### Geospatial Queries
```javascript
// Find nearby suppliers
User.find({
  role: 'supplier',
  location: {
    $nearSphere: {
      $geometry: {
        type: 'Point',
        coordinates: [longitude, latitude]
      },
      $maxDistance: 5000
    }
  }
})
```

## Performance Considerations

### Frontend Optimizations
- Component lazy loading
- Route-based code splitting
- Suspense boundaries for loading states

### Backend Optimizations
- MongoDB geospatial indexing
- Efficient proximity queries
- Connection pooling with Mongoose

## Security Considerations

### Current Status
- CORS enabled for cross-origin requests
- No authentication middleware implemented
- No input validation
- No rate limiting

### Recommendations
1. Implement JWT authentication
2. Add input validation middleware
3. Implement rate limiting
4. Add request sanitization
5. Secure MongoDB connection
6. Environment variable protection

## Deployment Readiness

### Frontend
- Vite build system ready for production
- Static asset optimization
- Environment configuration needed

### Backend
- Express server production-ready
- MongoDB connection configured
- Environment variables required
- Process management needed (PM2/Docker)

## Next Development Priorities

1. **Complete Product Model**: Implement product schema and CRUD operations
2. **Authentication System**: JWT-based auth with role-based access
3. **Order Management**: Complete order lifecycle implementation
4. **API Expansion**: Add CRUD operations for all models
5. **Error Handling**: Comprehensive error middleware
6. **Testing Suite**: Unit and integration tests
7. **Documentation**: API documentation with Swagger/OpenAPI