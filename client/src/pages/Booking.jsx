import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function Booking() {
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/courts')
      .then(res => res.json())
      .then(data => setCourts(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (selectedCourt) {
      fetch(`/api/courts/${selectedCourt}/availability?date=${selectedDate}`)
        .then(res => res.json())
        .then(data => setAvailableSlots(data.available || []))
        .catch(() => {});
    }
  }, [selectedCourt, selectedDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCourt || !selectedSlot) return;
    
    setLoading(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          court_id: selectedCourt,
          member_name: formData.name,
          member_email: formData.email,
          date: selectedDate,
          time_start: selectedSlot,
          time_end: `${parseInt(selectedSlot) + 1}:00`
        })
      });
      const data = await res.json();
      setBooking(data);
    } catch (err) {
      alert('Erreur lors de la réservation');
    }
    setLoading(false);
  };

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = addDays(new Date(), i);
    return { date: format(d, 'yyyy-MM-dd'), label: format(d, 'EEE d MMM', { locale: fr }) };
  });

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-dark via-dark-surface to-dark">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-5xl font-bold text-white mb-4">
              Réserver un <span className="text-gold">Court</span>
            </h1>
            <p className="text-xl text-gray-400">Choisissez votre terrain et votre créneau horaire</p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12 bg-dark-surface">
        <div className="max-w-5xl mx-auto px-4">
          {!booking ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Step 1: Select Court */}
              <div className="lg:col-span-1">
                <h3 className="font-display text-xl text-white mb-4">1. Choisir le terrain</h3>
                <div className="space-y-3">
                  {courts.map(court => (
                    <button
                      key={court.id}
                      onClick={() => { setSelectedCourt(court.id); setSelectedSlot(null); }}
                      className={`w-full p-4 rounded-xl text-left transition-all ${
                        selectedCourt === court.id 
                          ? 'bg-secondary text-dark' 
                          : 'glass hover:border-secondary'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{court.name}</div>
                          <div className="text-sm opacity-70">{court.type}</div>
                        </div>
                        <div className="font-bold">{court.price_per_hour} DH/h</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Select Date & Time */}
              <div className="lg:col-span-2">
                <h3 className="font-display text-xl text-white mb-4">2. Choisir la date et l'heure</h3>
                
                {/* Date selection */}
                <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
                  {dates.map(d => (
                    <button
                      key={d.date}
                      onClick={() => setSelectedDate(d.date)}
                      className={`flex-shrink-0 px-4 py-3 rounded-xl text-sm transition-all ${
                        selectedDate === d.date
                          ? 'bg-secondary text-dark'
                          : 'glass hover:border-secondary'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>

                {/* Time slots */}
                {selectedCourt ? (
                  <div>
                    <h4 className="text-gray-400 mb-3">Créneaux disponibles</h4>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {availableSlots.map(slot => (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 px-3 rounded-lg text-sm transition-all ${
                            selectedSlot === slot
                              ? 'bg-secondary text-dark font-bold'
                              : 'glass hover:border-secondary'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                    {availableSlots.length === 0 && (
                      <p className="text-gray-500 text-center py-8">Aucun créneau disponible</p>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    Sélectionnez un terrain d'abord
                  </div>
                )}

                {/* Step 3: Contact info */}
                {selectedSlot && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
                    <h3 className="font-display text-xl text-white mb-4">3. Vos coordonnées</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input
                        type="text"
                        placeholder="Nom complet"
                        required
                        className="w-full p-4 rounded-xl bg-dark border border-dark-card focus:border-secondary outline-none text-white"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        className="w-full p-4 rounded-xl bg-dark border border-dark-card focus:border-secondary outline-none text-white"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                      <input
                        type="tel"
                        placeholder="Téléphone"
                        required
                        className="w-full p-4 rounded-xl bg-dark border border-dark-card focus:border-secondary outline-none text-white"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-gold py-4 text-lg disabled:opacity-50"
                      >
                        {loading ? 'Réservation...' : 'Confirmer la réservation'}
                      </button>
                    </form>
                  </motion.div>
                )}
              </div>
            </div>
          ) : (
            /* Success */
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
              <div className="text-6xl mb-6">✅</div>
              <h2 className="font-display text-3xl text-white mb-4">Réservation Confirmée !</h2>
              <div className="glass rounded-2xl p-8 max-w-md mx-auto mb-8">
                <div className="space-y-4 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Terrain:</span>
                    <span className="text-white">{booking.court_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date:</span>
                    <span className="text-white">{booking.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Horaire:</span>
                    <span className="text-white">{booking.time_start} - {booking.time_end}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Nom:</span>
                    <span className="text-white">{booking.member_name}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => { setBooking(null); setSelectedCourt(null); setSelectedSlot(null); }} className="btn-outline">
                Nouvelle Réservation
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}