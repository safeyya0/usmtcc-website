import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';

// Court type visual components
function CourtVisual({ type, selected, onClick }) {
  const colors = {
    'terre-battue': { bg: 'bg-amber-700', lines: 'bg-amber-900', label: 'Terre Battue' },
    'dur': { bg: 'bg-cyan-600', lines: 'bg-cyan-800', label: 'Dur' },
    'gazon': { bg: 'bg-green-600', lines: 'bg-green-800', label: 'Gazon' }
  };
  const style = colors[type] || colors['dur'];
  
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative w-full p-4 rounded-2xl text-left transition-all border-2 ${
        selected 
          ? 'border-[#1B5E20] bg-[#1B5E20]/5 shadow-lg' 
          : 'border-gray-200 bg-white hover:border-[#1B5E20]/50'
      }`}
    >
      {/* Court visualization */}
      <div className={`h-24 rounded-lg ${style.bg} relative overflow-hidden mb-3`}>
        {/* Court lines */}
        <div className={`absolute inset-2 border-2 ${style.lines}/50 rounded`}>
          <div className={`absolute top-1/2 left-0 right-0 h-0.5 ${style.lines}/30`}></div>
          <div className={`absolute top-0 bottom-0 left-1/2 w-0.5 ${style.lines}/30`}></div>
        </div>
        {/* Net */}
        <div className="absolute top-1/2 left-2 right-2 h-0.5 bg-white/30"></div>
      </div>
      
      <div className="flex justify-between items-center">
        <div>
          <div className="font-semibold text-gray-800">{type === 'terre-battue' ? 'Court Central' : type === 'dur' ? 'Court Moderne' : 'Court en Gazon'}</div>
          <div className="text-xs text-gray-500">{style.label}</div>
        </div>
        <div className="font-bold text-[#1B5E20]">150 DH/h</div>
      </div>
    </motion.button>
  );
}

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
          time_end: `${parseInt(selectedSlot.split(':')[0]) + 1}:00`
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

  const courtTypes = ['terre-battue', 'dur', 'gazon'];

  return (
    <div className="min-h-screen pt-20 bg-[#FAFAFA]">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#4CAF50]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-5xl font-bold text-white mb-4">
              Réserver un <span className="text-[#A5D6A7]">Court</span>
            </h1>
            <p className="text-xl text-white/80">Choisissez votre terrain et votre créneau horaire</p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          {!booking ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Step 1: Select Court with Visual */}
              <div className="lg:col-span-1">
                <h3 className="font-display text-xl text-[#1B5E20] mb-4 font-semibold">1. Choisir le terrain</h3>
                <div className="space-y-3">
                  {courtTypes.map((type, i) => (
                    <CourtVisual
                      key={type}
                      type={type}
                      selected={selectedCourt === i + 1}
                      onClick={() => { setSelectedCourt(i + 1); setSelectedSlot(null); }}
                    />
                  ))}
                </div>
                
                {/* Court Info */}
                {selectedCourt && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 p-4 bg-[#1B5E20]/5 rounded-xl border border-[#1B5E20]/20">
                    <h4 className="font-semibold text-[#1B5E20] mb-2">Informations du terrain</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Surface: {selectedCourt === 1 ? 'Terre battue' : selectedCourt === 2 ? 'Dur synthétique' : 'Gazon naturel'}</li>
                      <li>• Éclairage: Oui</li>
                      <li>• Accès: Handicapé</li>
                      <li>• Horaires: 8h - 22h</li>
                    </ul>
                  </motion.div>
                )}
              </div>

              {/* Step 2: Select Date & Time */}
              <div className="lg:col-span-2">
                <h3 className="font-display text-xl text-[#1B5E20] mb-4 font-semibold">2. Choisir la date et l'heure</h3>
                
                {/* Date selection */}
                <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
                  {dates.map(d => (
                    <button
                      key={d.date}
                      onClick={() => setSelectedDate(d.date)}
                      className={`flex-shrink-0 px-4 py-3 rounded-xl text-sm transition-all font-medium ${
                        selectedDate === d.date
                          ? 'bg-[#1B5E20] text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-[#1B5E20]/10'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>

                {/* Time slots */}
                {selectedCourt ? (
                  <div>
                    <h4 className="text-gray-500 mb-3 font-medium">Créneaux disponibles</h4>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {availableSlots.map(slot => (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                            selectedSlot === slot
                              ? 'bg-[#1B5E20] text-white shadow-md'
                              : 'bg-gray-100 text-gray-600 hover:bg-[#1B5E20]/10'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                    {availableSlots.length === 0 && (
                      <p className="text-gray-400 text-center py-8">Aucun créneau disponible pour cette date</p>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-2xl">
                    <div className="text-4xl mb-2">🎾</div>
                    Sélectionnez un terrain d'abord
                  </div>
                )}

                {/* Step 3: Contact info */}
                {selectedSlot && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-6 bg-[#F5F5F5] rounded-2xl">
                    <h3 className="font-display text-lg text-[#1B5E20] mb-4 font-semibold">3. Vos coordonnées</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input
                        type="text"
                        placeholder="Nom complet *"
                        required
                        className="w-full p-4 rounded-xl bg-white border border-gray-200 focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/20 outline-none text-gray-800"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                      <input
                        type="email"
                        placeholder="Email *"
                        required
                        className="w-full p-4 rounded-xl bg-white border border-gray-200 focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/20 outline-none text-gray-800"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                      <input
                        type="tel"
                        placeholder="Téléphone *"
                        required
                        className="w-full p-4 rounded-xl bg-white border border-gray-200 focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/20 outline-none text-gray-800"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-green py-4 text-lg disabled:opacity-50"
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
              <h2 className="font-display text-3xl text-[#1B5E20] mb-4">Réservation Confirmée !</h2>
              <p className="text-gray-600 mb-8">Un email de confirmation a été envoyé à {booking.member_email}</p>
              <div className="bg-[#F5F5F5] rounded-2xl p-8 max-w-md mx-auto mb-8 border border-gray-200">
                <div className="space-y-4 text-left">
                  <div className="flex justify-between pb-3 border-b border-gray-200">
                    <span className="text-gray-500">Terrain:</span>
                    <span className="font-medium text-[#1B5E20]">{booking.court_name}</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-gray-200">
                    <span className="text-gray-500">Date:</span>
                    <span className="font-medium text-gray-800">{booking.date}</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-gray-200">
                    <span className="text-gray-500">Horaire:</span>
                    <span className="font-medium text-gray-800">{booking.time_start} - {booking.time_end}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Nom:</span>
                    <span className="font-medium text-gray-800">{booking.member_name}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => { setBooking(null); setSelectedCourt(null); setSelectedSlot(null); setFormData({name:'', email:'', phone:''}); }} className="btn-outline">
                Nouvelle Réservation
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}