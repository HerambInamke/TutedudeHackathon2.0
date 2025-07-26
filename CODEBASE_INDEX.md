# TutedudeHackathon2.0 - Codebase Index

## Project Overview
A full-stack web application built for TutedudeHackathon2.0, featuring a React frontend with Vite and a Node.js/Express backend with MongoDB.

## Project Structure

```
/workspace/
├── client/                     # Frontend React application
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   ├── pages/              # Application pages
│   │   │   ├── Auth/          # Authentication pages
│   │   │   ├── Buyer/         # Buyer-specific pages
│   │   │   └── Seller/        # Seller-specific pages
│   │   └── routes/            # Frontend routing
│   ├── public/                # Static assets
│   ├── package.json           # Frontend dependencies
│   ├── vite.config.js         # Vite configuration
│   └── index.html             # Main HTML entry point
├── server/                     # Backend Node.js application
│   ├── controller/            # API controllers
│   ├── models/                # Database models
│   ├── routes/                # API routes
│   ├── package.json           # Backend dependencies
│   └── index.js               # Server entry point
└── README.md                  # Project documentation
```

## Technology Stack

### Frontend (Client)
- **Framework**: React 19.1.0
- **Build Tool**: Vite 7.0.4
- **Styling**: TailwindCSS 4.1.11
- **Routing**: React Router DOM 6.30.1
- **Icons**: Lucide React 0.525.0
- **Linting**: ESLint 9.30.1

### Backend (Server)
- **Runtime**: Node.js
- **Framework**: Express 5.1.0
- **Database**: MongoDB (Mongoose 8.16.5)
- **CORS**: cors 2.8.5
- **Environment**: dotenv 17.2.1
- **Development**: nodemon 3.1.10

## File Index

### Frontend Files

#### Core Application
- `client/src/App.jsx` (19 lines) - Main application component
- `client/src/main.jsx` (11 lines) - React application entry point
- `client/src/routes/PageRoutes.jsx` (39 lines) - Application routing configuration

#### Components
- `client/src/components/Button.jsx` (15 lines) - Reusable button component
- `client/src/components/Header.jsx` (14 lines) - Application header component
- `client/src/components/IconCard.jsx` (17 lines) - Icon card component
- `client/src/components/Modal.jsx` (29 lines) - Modal dialog component

#### Authentication Pages
- `client/src/pages/Auth/Login.jsx` (110 lines) - User login page
- `client/src/pages/Auth/Signup.jsx` (143 lines) - User registration page

#### Buyer Pages
- `client/src/pages/Buyer/BuyerDashboard.jsx` (66 lines) - Buyer dashboard
- `client/src/pages/Buyer/GroupBuy.jsx` (80 lines) - Group buying functionality
- `client/src/pages/Buyer/MyOrders.jsx` (79 lines) - Order history and management
- `client/src/pages/Buyer/OrderMilk.jsx` (182 lines) - Milk ordering interface
- `client/src/pages/Buyer/TodaysAccounts.jsx` (65 lines) - Daily account summary

#### Seller Pages
- `client/src/pages/Seller/SellerDashboard.jsx` (19 lines) - Seller dashboard

#### Other Pages
- `client/src/pages/SplashPage.jsx` (49 lines) - Landing/splash page

#### Styling
- `client/src/App.css` (1 line) - Application styles
- `client/src/index.css` (1 line) - Global styles

### Backend Files

#### Core Server
- `server/index.js` (29 lines) - Express server setup and configuration

#### Controllers
- `server/controller/supplier.controller.js` (32 lines) - Supplier business logic

#### Models
- `server/models/user.model.js` (29 lines) - User data model
- `server/models/transaction.model.js` (9 lines) - Transaction data model
- `server/models/product.model.js` (0 lines) - Product data model (empty)

#### Routes
- `server/routes/supplier.routes.js` (7 lines) - Supplier API endpoints

### Configuration Files
- `client/package.json` - Frontend dependencies and scripts
- `client/vite.config.js` - Vite build configuration
- `client/eslint.config.js` - ESLint configuration
- `server/package.json` - Backend dependencies and scripts

## Key Features Identified

### Authentication System
- User login and signup functionality
- Role-based access (Buyer/Seller)

### Buyer Features
- Dashboard with overview
- Milk ordering system
- Group buying functionality
- Order history and tracking
- Daily account management

### Seller Features
- Basic seller dashboard (minimal implementation)

### Backend API
- Express server with CORS enabled
- MongoDB integration with Mongoose
- Supplier management endpoints
- User and transaction models

## Development Commands

### Frontend
```bash
cd client
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
```

### Backend
```bash
cd server
npm run dev      # Start development server with nodemon
```

## Database Models

### User Model (`user.model.js`)
- 29 lines of user schema definition

### Transaction Model (`transaction.model.js`)
- 9 lines of transaction schema definition

### Product Model (`product.model.js`)
- Currently empty (0 lines)

## API Endpoints

### Supplier Routes (`/api`)
- Managed by `supplier.controller.js`
- 7 lines of route definitions

## Notes
- The application appears to be a marketplace or ordering system focused on milk/dairy products
- Frontend is well-structured with separate buyer and seller interfaces
- Backend is basic but functional with MongoDB integration
- Product model is not yet implemented
- Seller functionality is minimal compared to buyer features

## Next Steps for Development
1. Implement product model and related functionality
2. Expand seller dashboard and features
3. Add more comprehensive API endpoints
4. Implement authentication middleware
5. Add error handling and validation
6. Create comprehensive testing suite