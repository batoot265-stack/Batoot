import React from 'react';
import { StoreProvider } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { CustomOrderSection } from './components/CustomOrderSection';
import { AboutSection } from './components/AboutSection';
import { SocialsAndContact } from './components/SocialsAndContact';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { AdminPortal } from './components/AdminPortal';
import { Toast } from './components/Toast';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

function StoreLayout() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF6] text-[#2D241E] flex flex-col font-sans selection:bg-yellow-200 selection:text-yellow-950">
      {/* Navigation Header */}
      <Navbar onNavigate={scrollToSection} />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* 1. Hero Section ("الهيرو") */}
        <Hero />

        {/* 2. Product Catalog / Collection Grid */}
        <ProductGrid />

        {/* 3. Custom Handmade Orders (تنفيذ خاص) */}
        <CustomOrderSection />

        {/* 4. Brand Story & About Us in English */}
        <AboutSection />

        {/* 5. Contact, Socials & WhatsApp Hotline */}
        <SocialsAndContact />
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Modals & Overlays */}
      <CartDrawer />
      <ProductModal />
      <AdminPortal />
      <Toast />
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <StoreLayout />
    </StoreProvider>
  );
}
