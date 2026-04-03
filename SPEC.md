# USM/TCC - Tennis Club Website Specification

## Project Overview
- **Project Name**: USM/TCC - Union Sportive Marocaine Tennis Club De Casablanca
- **Type**: Full-stack web application (Frontend + Backend + Database)
- **Core Functionality**: Modern tennis club website with membership management, court booking, event registration, and news/blog
- **Target Users**: Club members, prospective members, tennis enthusiasts, families

## Technical Stack
- **Frontend**: React + Vite + Tailwind CSS (customized)
- **Backend**: Node.js + Express
- **Database**: SQLite (simple, file-based)
- **API**: RESTful

## Design Direction
- **Aesthetic**: Luxury Tennis Club - elegant, sophisticated, sporty
- **Theme**: Dark theme with gold accents (premium feel)
- **Typography**: 
  - Display: "Playfair Display" (elegant serif)
  - Body: "DM Sans" (modern, clean)
- **Colors**:
  - Primary: #1a472a (deep forest green)
  - Secondary: #c9a227 (gold)
  - Dark: #0d1117 (rich black)
  - Accent: #2d5a3d (lighter green)

## Pages Required

### 1. Home Page
- Hero with tennis court background
- Quick stats (rating, members, courts)
- Featured services
- Latest news/events
- Testimonials carousel

### 2. About Page
- Club history
- Team/coaches section
- Facilities showcase
- Why choose us

### 3. Services Page
- Tennis lessons (individual/group)
- Court rental
- Tournaments
- Events
- Membership plans

### 4. Booking Page
- Calendar view of available courts
- Time slot selection
- Player types
- Payment simulation

### 5. Contact Page
- Contact form
- Map integration
- Contact info
- Operating hours

### 6. Admin Dashboard
- Court management
- Member management
- Booking management
- Analytics

## API Endpoints

### Members
- GET /api/members
- POST /api/members
- GET /api/members/:id

### Courts
- GET /api/courts
- POST /api/courts
- PUT /api/courts/:id

### Bookings
- GET /api/bookings
- POST /api/bookings
- DELETE /api/bookings/:id

### Services
- GET /api/services

## Database Schema

### members
- id, name, email, phone, membership_type, created_at

### courts
- id, name, type, price_per_hour, status

### bookings
- id, court_id, member_id, date, time_start, time_end, status

### services
- id, name, description, price, category

## Acceptance Criteria
- Modern, premium design that stands out
- Fully responsive on all devices
- All pages navigable
- Forms functional
- Backend API responding correctly
- Database storing data properly