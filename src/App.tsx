import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './components/pages/HomePage';
import EventPage from './components/pages/EventPage';
import AboutPage from './components/pages/AboutPage';
import TreatmentsPage from './components/pages/TreatmentsPage';

import AdminPage from './components/pages/AdminPage';
import BookingModal from './components/BookingModal';
import { Toaster } from './components/ui/sonner';
import { LanguageProvider } from './contexts/LanguageContext';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const openBookingModal = () => {
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  const handleDashboardBack = () => {
    setCurrentPage('home');
  };

  // 페이지 변경 시 스크롤 위치 관리
  useEffect(() => {
    // 홈 페이지로 이동할 때는 스크롤 관리를 컴포넌트 내에서 처리
    if (currentPage !== 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  const renderPage = () => {
    // Dashboard mode
    if (currentPage === 'dashboard-preview') {
      return <AdminPage onLogout={handleDashboardBack} isDemoMode={true} isPreviewMode={true} />;
    }

    // Regular pages
    switch (currentPage) {
      case 'home':
      case 'contacts': // contacts는 HomePage의 ContactSection으로 스크롤
        return <HomePage setCurrentPage={setCurrentPage} onBookNow={openBookingModal} />;
      case 'event':
        return <EventPage />;
      case 'about':
        return <AboutPage />;
      case 'treatments':
        return <TreatmentsPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} onBookNow={openBookingModal} />;
    }
  };

  // Dashboard mode - render only dashboard page without navigation/footer
  if (currentPage === 'dashboard-preview') {
    return (
      <LanguageProvider>
        <div className="min-h-screen">
          {renderPage()}
          <Toaster 
            position="top-center"
            toastOptions={{
              style: {
                background: 'white',
                color: '#374151',
                border: '1px solid #f3f4f6',
                fontSize: '14px'
              }
            }}
          />
        </div>
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-50 to-white">
        {/* Always show navigation */}
        <Navigation 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          onBookNow={openBookingModal} 
        />
        
        {/* Render the current page */}
        {renderPage()}
        
        {/* Always show footer */}
        <Footer />

        {/* Booking Modal - available on all pages */}
        <BookingModal 
          isOpen={isBookingModalOpen} 
          onClose={closeBookingModal} 
        />
        
        {/* Toast notifications */}
        <Toaster 
          position="top-center"
          toastOptions={{
            style: {
              background: 'white',
              color: '#374151',
              border: '1px solid #f3f4f6',
              fontSize: '14px'
            }
          }}
        />
      </div>
    </LanguageProvider>
  );
}