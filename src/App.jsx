function App() {
  return (
    <div className="min-h-screen flex flex-col justify-center" style={{ backgroundColor: '#1E1E1E' }}>
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge - Glass style */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 backdrop-blur-sm"
            style={{
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)'
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#22c55e' }}></span>
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: '#22c55e' }}></span>
            </span>
            <span className="text-sm font-medium" style={{ color: '#22c55e' }}>Creato con STUD</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Benvenuto su{' '}
            <span style={{ color: '#22c55e' }}>Elevia</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10">
            Il tuo nuovo sito web e pronto per essere personalizzato.
          </p>

          {/* Call to action */}
          <div
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl backdrop-blur-sm"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '2px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <span className="text-2xl">👈</span>
            <p className="text-white/80 text-lg">
              Usa la <span style={{ color: '#22c55e' }} className="font-semibold">chat a sinistra</span> per iniziare a sviluppare il tuo sito
            </p>
          </div>
        </div>

        {/* Features Grid - Glass cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {[
            {
              icon: '⚡',
              title: 'Veloce',
              description: 'Costruito con Vite e React per prestazioni ottimali'
            },
            {
              icon: '🎯',
              title: 'Personalizzabile',
              description: 'Tailwind CSS per uno stile completamente flessibile'
            },
            {
              icon: '💎',
              title: 'Moderno',
              description: 'Design contemporaneo e responsive su tutti i dispositivi'
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02]"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '2px solid rgba(255, 255, 255, 0.1)'
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.3)'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-white/60">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer - minimal */}
      <footer className="mt-16 text-center">
        <p className="text-white/30 text-sm">
          Creato con{' '}
          <a
            href="https://studio.webwiseitalia.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            style={{ color: '#22c55e' }}
          >
            STUD
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App
