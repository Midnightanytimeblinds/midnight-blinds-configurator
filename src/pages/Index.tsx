
import React from 'react';
import ProductConfigurator from '@/components/ProductConfigurator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Midnight Anytime Blinds
            </h1>
            <nav className="text-sm text-gray-600">
              <span>Custom Blackout Blinds</span>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Design Your Perfect Blackout Blind
          </h2>
          <p className="text-xl text-blue-100 mb-6">
            Custom-made to your exact specifications with live pricing
          </p>
          <div className="flex justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">✅</span>
              <span>100% Blackout Guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🚚</span>
              <span>Free Installation</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">⚡</span>
              <span>Motorisation Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Configurator */}
      <main className="py-8">
        <ProductConfigurator />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Midnight Anytime Blinds</h3>
          <p className="text-gray-400 text-sm">
            Custom blackout blinds designed and manufactured to perfection
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
