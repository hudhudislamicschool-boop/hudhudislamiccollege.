# Hudhud Islamic College Chat App Deployment

**Domain:** hudhudislamiccollege.com.et  
**Username:** hudhudis  
**Server:** lin4.ethiotelecom.et  
**IP:** 213.55.96.152  
**SSL:** Valid (Aug 19 - Nov 17, 2025), Issuer: R11  
**Nameservers:** ns1.telecom.net.et, ns2.telecom.net.et

**Stack:** MERN (MongoDB Atlas, Express, React, Node.js), Nginx, PM2  
**Real-time Chat:** Socket.io  
**Video:** Stream, WebRTC (future)  
**Auth:** Clerk  
**Error Monitoring:** Sentry  
**Health:** /api/health

## Basic setup steps:
1. SSH in: `ssh hudhudis@213.55.96.152`
2. Install Node.js, Nginx, PM2
3. Clone repo, run npm install/build
4. Configure Nginx reverse proxy for HTTPS, API, Socket.io
5. Start backend with PM2, serve frontend via Nginx
6. Test at https://hudhudislamiccollege.com.et
