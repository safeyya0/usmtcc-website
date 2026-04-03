import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database(path.join(__dirname, 'usmtcc.db'));

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create tables
db.exec(`
  DROP TABLE IF EXISTS bookings;
  DROP TABLE IF EXISTS members;
  DROP TABLE IF EXISTS courts;
  DROP TABLE IF EXISTS services;

  CREATE TABLE members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    membership_type TEXT DEFAULT 'standard',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE courts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    price_per_hour REAL NOT NULL,
    status TEXT DEFAULT 'available'
  );

  CREATE TABLE bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    court_id INTEGER NOT NULL,
    member_name TEXT NOT NULL,
    member_email TEXT NOT NULL,
    date TEXT NOT NULL,
    time_start TEXT NOT NULL,
    time_end TEXT NOT NULL,
    status TEXT DEFAULT 'confirmed',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (court_id) REFERENCES courts(id)
  );

  CREATE TABLE services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL,
    category TEXT,
    icon TEXT
  );
`);

// Seed data
const insertCourt = db.prepare('INSERT INTO courts (name, type, price_per_hour, status) VALUES (?, ?, ?, ?)');
insertCourt.run('Court Central', 'terre-battue', 150, 'available');
insertCourt.run('Court 1', 'dur', 120, 'available');
insertCourt.run('Court 2', 'dur', 120, 'available');
insertCourt.run('Court 3', 'terre-battue', 150, 'maintenance');
insertCourt.run('Court 4', 'gazon', 180, 'available');

const insertService = db.prepare('INSERT INTO services (name, description, price, category, icon) VALUES (?, ?, ?, ?, ?)');
insertService.run('Cours Individuel', 'Cours particulier avec un coach certifié', 300, 'lessons', '🎾');
insertService.run('Cours Collectif', 'Cours en groupe de 4-6 personnes', 150, 'lessons', '👥');
insertService.run('Location Court', 'Réservation de terrain pour игра', 120, 'rental', '🏟️');
insertService.run('Tournoi Mensuel', 'Compétition mensuelle ouverte à tous', 200, 'events', '🏆');
insertService.run('École de Tennis', 'Formation pour les jeunes 6-16 ans', 400, 'academy', '🎓');
insertService.run('Stage Vacances', 'Stage intensif pendant les vacances', 800, 'academy', '☀️');

const insertMember = db.prepare('INSERT INTO members (name, email, phone, membership_type) VALUES (?, ?, ?, ?)');
insertMember.run('Ali Benali', 'ali@example.com', '0661122334', 'premium');
insertMember.run('Fatima Zahra', 'fatima@example.com', '0662345678', 'standard');
insertMember.run('Youssef Mensouri', 'youssef@example.com', '0663456789', 'premium');

console.log('Database initialized successfully!');
console.log('Tables: members, courts, bookings, services');

export default db;