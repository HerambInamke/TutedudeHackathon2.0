# Deployment Guide

This guide covers how to deploy the Chotu application in various environments.

## Prerequisites

- Docker and Docker Compose installed
- Node.js 18+ (for local development)
- MongoDB (local or cloud instance)

## Quick Start with Docker

1. **Clone and setup**:
   ```bash
   git clone <repository-url>
   cd TutedudeHackathon2.0
   chmod +x deploy.sh
   ./deploy.sh
   ```

2. **Configure environment variables**:
   - Update `server/.env` with your MongoDB URI and other settings
   - Update `client/.env` with your API endpoints

3. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000
   - MongoDB: mongodb://localhost:27017

## Environment Variables

### Server (.env)
```env
MONGO_URI=mongodb://username:password@host:port/database
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.com
JWT_SECRET=your-secret-key
```

### Client (.env)
```env
VITE_API_BASE_URL=https://your-api-domain.com/api
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-key
```

## Production Deployment

### Option 1: Docker Compose (Recommended)

1. **Update production environment variables**
2. **Run deployment script**:
   ```bash
   ./deploy.sh
   ```

### Option 2: Separate Deployments

#### Backend Deployment (Node.js)
```bash
cd server
npm install --production
npm start
```

#### Frontend Deployment (Static Files)
```bash
cd client
npm install
npm run build
# Deploy dist/ folder to your static hosting service
```

## Cloud Deployment Options

### 1. Railway
- Connect your GitHub repository
- Set environment variables in Railway dashboard
- Deploy automatically on push

### 2. Vercel (Frontend) + Railway (Backend)
- Deploy client to Vercel
- Deploy server to Railway
- Update CORS settings

### 3. DigitalOcean App Platform
- Use docker-compose.yml for full-stack deployment
- Configure environment variables
- Set up custom domains

### 4. AWS/GCP/Azure
- Use container services (ECS, Cloud Run, Container Instances)
- Set up load balancers and databases
- Configure SSL certificates

## Database Setup

### MongoDB Atlas (Recommended for Production)
1. Create a MongoDB Atlas cluster
2. Get connection string
3. Update MONGO_URI in server/.env
4. Configure IP whitelist

### Local MongoDB
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:6.0

# Using MongoDB Community Edition
mongod --dbpath /path/to/data/directory
```

## SSL/HTTPS Setup

### Using Nginx (Recommended)
1. **Install Certbot**:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   ```

2. **Get SSL certificate**:
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

3. **Update nginx configuration** to proxy to your application

### Using Cloudflare
1. Add your domain to Cloudflare
2. Enable SSL/TLS encryption
3. Configure DNS records

## Monitoring and Logging

### Application Logs
```bash
# View all service logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f server
docker-compose logs -f client
```

### Health Checks
- Server health: `GET /health`
- Database connection status included in health response

### Monitoring Tools
- **Uptime monitoring**: UptimeRobot, Pingdom
- **Error tracking**: Sentry
- **Performance**: New Relic, DataDog

## Backup Strategy

### Database Backups
```bash
# MongoDB backup
mongodump --uri="mongodb://username:password@host:port/database" --out=/backup/path

# Automated backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mongodump --uri="$MONGO_URI" --out="/backups/backup_$DATE"
```

### File Backups
- User uploads (if any)
- Configuration files
- SSL certificates

## Security Checklist

- [ ] Environment variables secured
- [ ] Database access restricted
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Input validation in place
- [ ] Security headers configured
- [ ] Regular security updates

## Troubleshooting

### Common Issues

1. **Port conflicts**:
   ```bash
   # Check what's using the port
   lsof -i :5000
   # Kill the process or change port
   ```

2. **Database connection issues**:
   - Check MongoDB URI format
   - Verify network connectivity
   - Check firewall settings

3. **CORS errors**:
   - Update CORS_ORIGIN in server/.env
   - Ensure frontend URL matches

4. **Build failures**:
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify environment variables

### Logs and Debugging
```bash
# Check container status
docker-compose ps

# View detailed logs
docker-compose logs --tail=100 -f server

# Access container shell
docker-compose exec server sh
```

## Performance Optimization

### Frontend
- Enable gzip compression
- Implement caching headers
- Optimize images and assets
- Use CDN for static files

### Backend
- Implement database indexing
- Add response caching
- Use connection pooling
- Monitor query performance

### Database
- Regular index optimization
- Connection pooling
- Read replicas for scaling
- Regular maintenance tasks

## Scaling Considerations

### Horizontal Scaling
- Load balancer configuration
- Session management
- Database clustering
- File storage solutions

### Vertical Scaling
- Resource monitoring
- Performance bottleneck identification
- Capacity planning

## Support and Maintenance

### Regular Tasks
- [ ] Security updates
- [ ] Database maintenance
- [ ] Log rotation
- [ ] Backup verification
- [ ] Performance monitoring
- [ ] SSL certificate renewal

### Emergency Procedures
- Rollback strategy
- Database recovery
- Service restart procedures
- Contact information for critical issues