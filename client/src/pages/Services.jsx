import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(() => {});
  }, []);

  const categories = {
    lessons: { title: 'Cours de Tennis', icon: '🎾', desc: 'Apprenez ou perfectionnez votre jeu avec nos coaches certifiés' },
    rental: { title: 'Location de Courts', icon: '🏟️', desc: 'Réservez un terrain pour vos entrainements personnels' },
    events: { title: 'Tournois & Événements', icon: '🏆', desc: 'Participez à nos compétitions régulières' },
    academy: { title: 'École de Tennis', icon: '🎓', desc: 'Formation complète pour les jeunes talents' },
  };

  const groupedServices = services.reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {});

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-dark via-dark-surface to-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-display text-5xl font-bold text-white mb-6">
              Nos <span className="text-gold">Services</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Des offres adaptées à tous les niveaux et tous les âges
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services by Category */}
      {Object.entries(categories).map(([cat, { title, icon, desc }]) => (
        <section key={cat} className="py-16 bg-dark-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-10">
              <span className="text-4xl">{icon}</span>
              <div>
                <h2 className="font-display text-3xl font-bold text-white">{title}</h2>
                <p className="text-gray-400">{desc}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(groupedServices[cat] || []).map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="glass rounded-2xl p-6 card-hover"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-2xl">{service.icon}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-display font-bold text-gold">{service.price} DH</div>
                      <div className="text-xs text-gray-400">/session</div>
                    </div>
                  </div>
                  <h3 className="font-display text-xl text-white mb-2">{service.name}</h3>
                  <p className="text-gray-400 text-sm">{service.description}</p>
                </motion.div>
              ))}
              {(!groupedServices[cat] || groupedServices[cat].length === 0) && (
                <div className="col-span-full text-center py-8 text-gray-500">
                  Bientôt disponible
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* Membership CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl font-bold text-white mb-6">
            Devenez Membre !
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Profitez de tarifs préférentiels et d'un accès illimité aux installations
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Standard', price: '1500 DH/an', features: ['Accès aux terrains', 'Cours collectif', 'Events membres'] },
              { name: 'Premium', price: '2500 DH/an', features: ['Tout Standard', 'Cours illimités', 'Réservation prioritaire', 'Invités'] },
              { name: 'Famille', price: '3500 DH/an', features: ['Tout Premium', 'Membres famille', 'Enfants inclus'] },
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`glass rounded-2xl p-6 ${i === 1 ? 'border-2 border-secondary' : ''}`}
              >
                {i === 1 && <div className="text-xs text-secondary mb-2">Plus Populaire</div>}
                <h3 className="font-display text-xl text-white mb-2">{plan.name}</h3>
                <div className="text-3xl font-display font-bold text-gold mb-4">{plan.price}</div>
                <ul className="text-gray-400 text-sm space-y-2 mb-6">
                  {plan.features.map((f, j) => (
                    <li key={j}>✓ {f}</li>
                  ))}
                </ul>
                <button className="w-full btn-gold text-sm">Choisir</button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}