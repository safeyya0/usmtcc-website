import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Admin() {
  const [stats, setStats] = useState({ members: 0, bookings: 0, courts: 0, todayBookings: 0 });
  const [bookings, setBookings] = useState([]);
  const [members, setMembers] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => {});
    
    fetch('/api/bookings')
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(() => {});
    
    fetch('/api/members')
      .then(res => res.json())
      .then(data => setMembers(data))
      .catch(() => {});
  }, []);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'bookings', label: 'Réservations', icon: '📅' },
    { id: 'members', label: 'Membres', icon: '👥' },
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="py-8 bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="font-display text-4xl font-bold text-white mb-2">
            Admin <span className="text-gold">Dashboard</span>
          </h1>
          <p className="text-gray-400">Gérez votre club</p>
        </div>
      </section>

      <section className="py-8 bg-dark">
        <div className="max-w-7xl mx-auto px-4">
          {/* Tabs */}
          <div className="flex gap-4 mb-8 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? 'bg-secondary text-dark font-medium'
                    : 'glass hover:border-secondary'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="glass rounded-2xl p-6">
                  <div className="text-3xl mb-2">👥</div>
                  <div className="text-4xl font-display font-bold text-gold">{stats.members}</div>
                  <div className="text-gray-400 text-sm">Membres</div>
                </div>
                <div className="glass rounded-2xl p-6">
                  <div className="text-3xl mb-2">📅</div>
                  <div className="text-4xl font-display font-bold text-gold">{stats.bookings}</div>
                  <div className="text-gray-400 text-sm">Réservations</div>
                </div>
                <div className="glass rounded-2xl p-6">
                  <div className="text-3xl mb-2">🏟️</div>
                  <div className="text-4xl font-display font-bold text-gold">{stats.courts}</div>
                  <div className="text-gray-400 text-sm">Terrains</div>
                </div>
                <div className="glass rounded-2xl p-6">
                  <div className="text-3xl mb-2">📅</div>
                  <div className="text-4xl font-display font-bold text-gold">{stats.todayBookings}</div>
                  <div className="text-gray-400 text-sm">Aujourd'hui</div>
                </div>
              </div>

              {/* Recent bookings */}
              <div className="glass rounded-2xl p-6">
                <h3 className="font-display text-xl text-white mb-4">Dernières Réservations</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-400 text-sm border-b border-dark-card">
                        <th className="pb-3">Terrain</th>
                        <th className="pb-3">Client</th>
                        <th className="pb-3">Date</th>
                        <th className="pb-3">Horaire</th>
                        <th className="pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.slice(0, 5).map(b => (
                        <tr key={b.id} className="border-b border-dark-card/50">
                          <td className="py-3 text-white">{b.court_name}</td>
                          <td className="py-3 text-gray-300">{b.member_name}</td>
                          <td className="py-3 text-gray-300">{b.date}</td>
                          <td className="py-3 text-gray-300">{b.time_start} - {b.time_end}</td>
                          <td className="py-3">
                            <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="glass rounded-2xl p-6">
                <h3 className="font-display text-xl text-white mb-4">Toutes les Réservations</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-400 text-sm border-b border-dark-card">
                        <th className="pb-3">ID</th>
                        <th className="pb-3">Terrain</th>
                        <th className="pb-3">Client</th>
                        <th className="pb-3">Email</th>
                        <th className="pb-3">Date</th>
                        <th className="pb-3">Horaire</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map(b => (
                        <tr key={b.id} className="border-b border-dark-card/50">
                          <td className="py-3 text-gray-300">#{b.id}</td>
                          <td className="py-3 text-white">{b.court_name}</td>
                          <td className="py-3 text-gray-300">{b.member_name}</td>
                          <td className="py-3 text-gray-300">{b.member_email}</td>
                          <td className="py-3 text-gray-300">{b.date}</td>
                          <td className="py-3 text-gray-300">{b.time_start} - {b.time_end}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Members Tab */}
          {activeTab === 'members' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="glass rounded-2xl p-6">
                <h3 className="font-display text-xl text-white mb-4">Tous les Membres</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-400 text-sm border-b border-dark-card">
                        <th className="pb-3">ID</th>
                        <th className="pb-3">Nom</th>
                        <th className="pb-3">Email</th>
                        <th className="pb-3">Téléphone</th>
                        <th className="pb-3">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map(m => (
                        <tr key={m.id} className="border-b border-dark-card/50">
                          <td className="py-3 text-gray-300">#{m.id}</td>
                          <td className="py-3 text-white">{m.name}</td>
                          <td className="py-3 text-gray-300">{m.email}</td>
                          <td className="py-3 text-gray-300">{m.phone}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              m.membership_type === 'premium' 
                                ? 'bg-secondary/20 text-secondary' 
                                : 'bg-gray-500/20 text-gray-400'
                            }`}>
                              {m.membership_type}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}