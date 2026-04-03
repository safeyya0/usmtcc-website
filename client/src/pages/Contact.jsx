import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-dark via-dark-surface to-dark">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-5xl font-bold text-white mb-4">
              Nous <span className="text-gold">Contacter</span>
            </h1>
            <p className="text-xl text-gray-400">Une question ? N'hésitez pas à nous envoyer un message</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-12 bg-dark-surface">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="font-display text-3xl font-bold text-white mb-8">Informations de Contact</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-2xl">📍</div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Adresse</h4>
                    <p className="text-gray-400">Place De La Ligue Arabe, Casablanca 20100</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-2xl">📞</div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Téléphone</h4>
                    <p className="text-gray-400">06 61 85 37 81</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-2xl">✉️</div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Email</h4>
                    <p className="text-gray-400">contact@usmtcc.ma</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-2xl">🕐</div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Horaires</h4>
                    <p className="text-gray-400">Ouvert 24h/24 - 7j/7</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-2xl">📘</div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Facebook</h4>
                    <a href="https://facebook.com" className="text-secondary hover:underline">facebook.com/USMTCC</a>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-8 glass rounded-2xl p-4 h-64 flex items-center justify-center">
                <p className="text-gray-500">Carte Google Maps</p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="font-display text-3xl font-bold text-white mb-8">Envoyez un Message</h2>
              {!sent ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      placeholder="Nom complet"
                      required
                      className="w-full p-4 rounded-xl bg-dark border border-dark-card focus:border-secondary outline-none text-white"
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      className="w-full p-4 rounded-xl bg-dark border border-dark-card focus:border-secondary outline-none text-white"
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Sujet"
                    required
                    className="w-full p-4 rounded-xl bg-dark border border-dark-card focus:border-secondary outline-none text-white"
                    value={form.subject}
                    onChange={e => setForm({...form, subject: e.target.value})}
                  />
                  <textarea
                    placeholder="Votre message..."
                    required
                    rows={6}
                    className="w-full p-4 rounded-xl bg-dark border border-dark-card focus:border-secondary outline-none text-white resize-none"
                    value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                  />
                  <button type="submit" className="btn-gold w-full py-4 text-lg">
                    Envoyer le Message
                  </button>
                </form>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="font-display text-2xl text-white mb-2">Message Envoyé !</h3>
                  <p className="text-gray-400 mb-6">Nous vous répondrons dans les plus brefs délais</p>
                  <button onClick={() => setSent(false)} className="btn-outline">
                    Nouveau Message
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}