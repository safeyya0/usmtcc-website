import { motion } from 'framer-motion';

export default function About() {
  const team = [
    { name: 'M. Alami', role: 'Président', icon: '👨‍💼' },
    { name: 'M. Benali', role: 'Directeur Technique', icon: '🎾' },
    { name: 'Mme. Radi', role: 'Secrétaire Générale', icon: '👩‍💼' },
    { name: 'M. Khourchi', role: 'Entraîneur Chef', icon: '🏫' },
  ];

  const facilities = [
    { name: 'Court Central', type: 'Terre battue', icon: '🏟️' },
    { name: ' Courts extérieurs', type: 'Dur & Gazon', icon: '🎾' },
    { name: 'Club House', type: 'Vestaires & Douches', icon: '🏠' },
    { name: 'Espace Détente', type: 'Café & Terrasse', icon: '☕' },
    { name: 'Tribune', type: '100 places assises', icon: '🪑' },
  ];

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
              À Propos de <span className="text-gold">l'USM/TCC</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Fondé en 2004, l'Union Sportive Marocaine Tennis Club De Casablanca 
              est devenu une référence du tennis au Maroc.
            </p>
          </motion.div>
        </div>
      </section>

      {/* History */}
      <section className="py-20 bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl font-bold text-white mb-6">Notre Histoire</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  L'USM/TCC est né d'une passion pour le tennis et d'une vision : 
                  créer un espace où les familles peuvent pratiquer ce sport dans 
                  une ambiance chaleureuse et professionnelle.
                </p>
                <p>
                  Depuis plus de 20 ans, notre club accueille des joueurs de tous niveaux, 
                  des débutants aux compétiteurs confirmé(e)s. Notre équipe d'entraîneurs 
                  certifiés accompagne chaque membre dans sa progression.
                </p>
                <p>
                  Situé au cœur de Casablanca, Place De La Ligue Arabe, notre club 
                  offre des installations de qualité et une communauté unique.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8"
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-5xl font-display font-bold text-gold">20+</div>
                  <div className="text-gray-400 mt-2">Années d'Existence</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-display font-bold text-gold">500+</div>
                  <div className="text-gray-400 mt-2">Membres Actifs</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-display font-bold text-gold">5</div>
                  <div className="text-gray-400 mt-2">Terrains</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-display font-bold text-gold">10+</div>
                  <div className="text-gray-400 mt-2">Coach Certifiés</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-white mb-4">Notre Équipe</h2>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-8 text-center card-hover"
              >
                <div className="text-6xl mb-4">{member.icon}</div>
                <h3 className="font-display text-xl text-white mb-1">{member.name}</h3>
                <p className="text-secondary text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20 bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-white mb-4">Nos Installations</h2>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {facilities.map((facility, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6 text-center"
              >
                <div className="text-4xl mb-3">{facility.icon}</div>
                <h3 className="font-display text-lg text-white mb-1">{facility.name}</h3>
                <p className="text-gray-400 text-sm">{facility.type}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-white mb-4">Pourquoi Choisir l'USM/TCC ?</h2>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '👨‍👩‍👧‍👦', title: 'Familial', desc: 'Une ambiance où parents et enfants se retrouvent' },
              { icon: '⭐', title: 'Professionnel', desc: 'Une équipe qualifiée et attentionnée' },
              { icon: '📍', title: 'Central', desc: 'Au cœur de Casablanca, facile d\'accès' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-8 text-center"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-display text-2xl text-white mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}