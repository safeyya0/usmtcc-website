import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, '../data/db.json');

// Ensure data directory exists
const dataDir = path.dirname(DB_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Load or create database
function loadDB() {
  try {
    if (fs.existsSync(DB_FILE)) {
      return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    }
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

// Export for use in routes
export { db, saveDB, memberId, bookingId };
export default { db, saveDB, memberId, bookingId };