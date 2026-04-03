import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, '../data/db.json');

// Ensure data directory
const dataDir = path.dirname(DB_FILE);
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

// Load or create database
function loadDB() {
  try {
    if (fs.existsSync(DB_FILE)) return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  } catch (e) {}
  return {
    members: [
      { id: 1, name: 'Ali Benali', email: 'ali@example.com', phone: '0661122334', membership_type: 'premium', created_at: new Date().toISOString() },
      { id: 2, name: 'Fatima Zahra', email: 'fatima@example.com', phone: '0662345678', membership_type: 'standard', created_at: new Date().toISOString() },
      { id: 3, name: 'Youssef Mensouri', email: 'youssef@example.com', phone: '0663456789', membership_type: 'premium', created_at: new Date().toISOString() }
    ],
    courts: [
      { id: 1, name: 'Court Central', type: 'terre-battue', price_per_hour: 150, status: 'available' },
      { id: 2, name: 'Court 1', type: 'dur', price_per_hour: 120, status: 'available' },
      { id: 3, name: 'Court 2', type: 'dur', price_per_hour: 120, status: 'available' },
      { id: 4, name: 'Court 3', type: 'terre-battue', price_per_hour: 150, status: 'maintenance' },
      { id: 5, name: 'Court 4', type: 'gazon', price_per_hour: 180, status: 'available' }
    ],
    bookings: [],
    services: [
      { id: 1, name: 'Cours Individuel', description: 'Cours particulier avec un coach certifié', price: 300, category: 'lessons', icon: '🎾' },
      { id: 2, name: 'Cours Collectif', description: 'Cours en groupe de 4-6 personnes', price: 150, category: 'lessons', icon: '👥' },
      { id: 3, name: 'Location Court', description: 'Réservation de terrain pour jouer', price: 120, category: 'rental', icon: '🏟️' },
      { id: 4, name: 'Tournoi Mensuel', description: 'Compétition mensuelle ouverte à tous', price: 200, category: 'events', icon: '🏆' },
      { id: 5, name: 'École de Tennis', description: 'Formation pour les jeunes 6-16 ans', price: 400, category: 'academy', icon: '🎓' },
      { id: 6, name: 'Stage Vacances', description: 'Stage intensif pendant les vacances', price: 800, category: 'academy', icon: '☀️' }
    ]
  };
}

function saveDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

let db = loadDB();
let memberId = Math.max(0, ...db.members.map(m => m.id)) + 1;
let bookingId = Math.max(0, ...db.bookings.map(b => b.id)) + 1;

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

// API Routes
app.get('/api/courts', (req, res) => res.json(db.courts));

app.get('/api/courts/:id/availability', (req, res) => {
  const { id } = req.params;
  const { date } = req.query;
  const bookings = db.bookings.filter(b => b.court_id == id && b.date === date && b.status === 'confirmed');
  const allSlots = [];
  for (let hour = 8; hour < 22; hour++) allSlots.push(`${hour.toString().padStart(2, '0')}:00`);
  const bookedSlots = bookings.map(b => b.time_start);
  res.json({ court_id: id, date, available: allSlots.filter(s => !bookedSlots.includes(s)), booked: bookedSlots });
});

app.post('/api/bookings', (req, res) => {
  const { court_id, member_name, member_email, date, time_start, time_end } = req.body;
  const existing = db.bookings.find(b => b.court_id === court_id && b.date === date && b.time_start === time_start && b.status === 'confirmed');
  if (existing) return res.status(400).json({ error: 'Ce créneau est déjà réservéré' });
  const court = db.courts.find(c => c.id === court_id);
  const booking = { id: bookingId++, court_id, court_name: court?.name || '', court_type: court?.type || '', member_name, member_email, date, time_start, time_end, status: 'confirmed', created_at: new Date().toISOString() };
  db.bookings.push(booking);
  saveDB(db);
  res.status(201).json(booking);
});

app.get('/api/bookings', (req, res) => res.json(db.bookings));
app.get('/api/services', (req, res) => res.json(db.services));
app.get('/api/members', (req, res) => res.json(db.members));

app.post('/api/members', (req, res) => {
  const { name, email, phone, membership_type } = req.body;
  const member = { id: memberId++, name, email, phone, membership_type: membership_type || 'standard', created_at: new Date().toISOString() };
  db.members.push(member);
  saveDB(db);
  res.status(201).json(member);
});

app.get('/api/stats', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  res.json({ members: db.members.length, bookings: db.bookings.length, courts: db.courts.length, todayBookings: db.bookings.filter(b => b.date === today).length });
});

app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../client/dist/index.html')));

app.listen(PORT, () => console.log(`🏆 Server on http://localhost:${PORT}`));