import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  const [stats, setStats] = useState({ members: 0, courts: 0, years: 0 });

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStats({ members: data.members, courts: data.courts, years: 20 }))
      .catch(() => {});
  }, []);

  const features = [
    { icon: '🎾', title: '5 Courts', desc: 'Terrains professionnels' },
    { icon: '👨‍🏫', title: 'Coach Certifiés', desc: 'Équipe professionnelle' },
    { icon: '🏆', title: 'Tournois', desc: 'Compétitions régulières' },
    { icon: '☕', title: 'Espace Détente', desc: 'Café & terrasse' },
  ];

  const reviews = [
    { name: 'BLA', text: 'Super club où tout le monde s\'y retrouve parents et enfants. Belle ambiance familiale.', stars: 5 },
    { name: 'Sabine', text: 'Mes enfants adorent venir ici et progressent rapidement grâce aux excellents coaches.', stars: 5 },
    { name: 'Mohamed', text: 'Un club mythique de Casablanca. Les installations sont impeccables.', stars: 5 },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-surface to-primary-dark">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          </div>
          {/* Tennis court pattern */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #c9a227 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-secondary/20 rounded-full text-secondary text-sm font-medium mb-6">
              🏆 Club de Tennis à Casablanca
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">
              Union Sportive <span className="text-gold">Marocaine</span>
              <br />Tennis Club
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
              Le club de tennis familial par excellence au cœur de Casablanca. 
              Une ambiance exceptionnelle pour tous les âges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking" className="btn-gold text-lg px-8 py-4">
                Réserver un Court
              </Link>
              <Link to="/services" className="btn-outline text-lg px-8 py-4">
                Découvrir les Services
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <div className="glass rounded-2xl p-6">
              <div className="text-4xl font-display font-bold text-gold">{stats.members}+</div>
              <div className="text-gray-400 mt-1">Membres</div>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="text-4xl font-display font-bold text-gold">{stats.courts}</div>
              <div className="text-gray-400 mt-1"> Courts</div>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="text-4xl font-display font-bold text-gold">4.3</div>
              <div className="text-gray-400 mt-1">Note Google</div>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="text-4xl font-display font-bold text-gold">{stats.years}+</div>
              <div className="text-gray-400 mt-1">Années</div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-secondary text-2xl"
        >
          ↓
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-20 bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-8 text-center card-hover"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="font-display text-xl text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-white mb-4">Nos Services</h2>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🎾', title: 'Cours de Tennis', desc: 'Particuliers & groupes pour tous niveaux' },
              { icon: '🏟️', title: 'Location de Courts', desc: 'Terrains disponibles 24h/24' },
              { icon: '🏆', title: 'Tournois', desc: 'Compétitions mensuelles & annuels' },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-8 card-hover"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="font-display text-2xl text-white mb-3">{service.title}</h3>
                <p className="text-gray-400">{service.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services" className="btn-outline inline-block">
              Voir Tous les Services
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-white mb-4">Avis de nos Membres</h2>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-8"
              >
                <div className="flex text-secondary mb-4">
                  {[...Array(review.stars)].map((_, j) => (
                    <span key={j}>★</span>
                  ))}
                </div>
                <p className="text-gray-300 italic mb-4">"{review.text}"</p>
                <div className="font-medium text-white">— {review.name}</div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 glass rounded-full px-6 py-3">
              <span className="text-2xl font-bold text-gold">4.3</span>
              <span className="text-gray-400">Note Google (88 avis)</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '30px 30px' }}></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="font-display text-4xl font-bold text-white mb-6">
            Prêt à Rejoindre le Club ?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Réservez votre premier court ou contactez-nous pour plus d'informations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking" className="btn-gold text-lg px-8 py-4">
              Réserver Maintenant
            </Link>
            <Link to="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-dark text-lg px-8 py-4">
              Nous Contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}