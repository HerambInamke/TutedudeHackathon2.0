const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const api = {
  // Generic fetch wrapper with error handling
  async fetch(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, { ...defaultOptions, ...options });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Auth endpoints
  auth: {
    signup: (userData) => api.fetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
    
    login: (phoneNumber) => api.fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ phoneNumber }),
    }),
  },

  // Product endpoints
  products: {
    add: (productData) => api.fetch('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    }),
    
    getAll: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return api.fetch(`/products${queryString ? `?${queryString}` : ''}`);
    },
    
    getBySeller: (sellerId) => api.fetch(`/products/seller/${sellerId}`),
    
    update: (productId, updateData) => api.fetch(`/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    }),
    
    delete: (productId) => api.fetch(`/products/${productId}`, {
      method: 'DELETE',
    }),
  },

  // Rating endpoints
  ratings: {
    add: (ratingData) => api.fetch('/ratings', {
      method: 'POST',
      body: JSON.stringify(ratingData),
    }),
    
    getProductRatings: (productId) => api.fetch(`/ratings/product/${productId}`),
    
    getSellerRatings: (sellerId) => api.fetch(`/ratings/seller/${sellerId}`),
  },

  // Order endpoints
  orders: {
    create: (orderData) => api.fetch('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),
    
    getBuyerOrders: (buyerId) => api.fetch(`/orders/buyer/${buyerId}`),
    
    getSellerOrders: (sellerId) => api.fetch(`/orders/seller/${sellerId}`),
    
    updateStatus: (orderId, status) => api.fetch(`/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),
  },
  groupBuy: {
    create: (dealData) => api.fetch('/groupbuy', { method: 'POST', body: JSON.stringify(dealData) }),
    getActive: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return api.fetch(`/groupbuy/active?${queryString}`);
    },
    join: (joinData) => api.fetch('/groupbuy/join', { method: 'POST', body: JSON.stringify(joinData) }),
    getUserDeals: (userId) => api.fetch(`/groupbuy/user/${userId}`),
  },
};

export default api; 