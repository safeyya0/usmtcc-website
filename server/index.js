import express from 'express';
import cors from 'cors';
import db from './db/database.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from client build
app.use(express.static(path.join(__dirname, '../client/dist')));

// === API ROUTES ===

// Get all courts
app.get('/api/courts', (req, res) => {
  try {
    const courts = db.prepare('SELECT * FROM courts ORDER BY id').all();
    res.json(courts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get available time slots for a court on a specific date
app.get('/api/courts/:id/availability', (req, res) => {
  const { id } = req.params;
  const { date } = req.query;
  
  try {
    const bookings = db.prepare(`
      SELECT time_start, time_end FROM bookings 
      WHERE court_id = ? AND date = ? AND status = 'confirmed'
    `).all(id, date);
    
    // Generate all time slots (8:00 - 22:00)
    const allSlots = [];
    for (let hour = 8; hour < 22; hour++) {
      allSlots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    
    // Filter out booked slots
    const bookedSlots = bookings.map(b => b.time_start);
    const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));
    
    res.json({ court_id: id, date, available: availableSlots, booked: bookedSlots });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a booking
app.post('/api/bookings', (req, res) => {
  const { court_id, member_name, member_email, date, time_start, time_end } = req.body;
  
  try {
    // Check if slot is available
    const existing = db.prepare(`
      SELECT id FROM bookings 
      WHERE court_id = ? AND date = ? AND time_start = ? AND status = 'confirmed'
    `).get(court_id, date, time_start);
    
    if (existing) {
      return res.status(400).json({ error: 'Ce créneau est déjà réservé' });
    }
    
    const result = db.prepare(`
      INSERT INTO bookings (court_id, member_name, member_email, date, time_start, time_end)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(court_id, member_name, member_email, date, time_start, time_end);
    
    const booking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all bookings
app.get('/api/bookings', (req, res) => {
  try {
    const bookings = db.prepare(`
      SELECT b.*, c.name as court_name, c.type as court_type 
      FROM bookings b 
      JOIN courts c ON b.court_id = c.id 
      ORDER BY b.date DESC, b.time_start
    `).all();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all services
app.get('/api/services', (req, res) => {
  try {
    const services = db.prepare('SELECT * FROM services ORDER BY category, id').all();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all members
app.get('/api/members', (req, res) => {
  try {
    const members = db.prepare('SELECT * FROM members ORDER BY created_at DESC').all();
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add member
app.post('/api/members', (req, res) => {
  const { name, email, phone, membership_type } = req.body;
  
  try {
    const result = db.prepare(`
      INSERT INTO members (name, email, phone, membership_type)
      VALUES (?, ?, ?, ?)
    `).run(name, email, phone, membership_type || 'standard');
    
    const member = db.prepare('SELECT * FROM members WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get stats
app.get('/api/stats', (req, res) => {
  try {
    const memberCount = db.prepare('SELECT COUNT(*) as count FROM members').get();
    const bookingCount = db.prepare('SELECT COUNT(*) as count FROM bookings').get();
    const courtCount = db.prepare('SELECT COUNT(*) as count FROM courts').get();
    const todayBookings = db.prepare(`
      SELECT COUNT(*) as count FROM bookings 
      WHERE date = date('now') AND status = 'confirmed'
    `).get();
    
    res.json({
      members: memberCount.count,
      bookings: bookingCount.count,
      courts: courtCount.count,
      todayBookings: todayBookings.count
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`🏆 Server running on http://localhost:${PORT}`);
});