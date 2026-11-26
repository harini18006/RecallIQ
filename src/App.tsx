import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { RecallDetailModal } from './components/common/RecallDetailModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { ScannerPage } from './pages/ScannerPage';
import { VerificationReportPage } from './pages/VerificationReportPage';
import { GlobalRecallsPage } from './pages/GlobalRecallsPage';
import { SafetyVaultPage } from './pages/SafetyVaultPage';
import { VoiceAssistantPage } from './pages/VoiceAssistantPage';

const AppContent: React.FC = () => {
  const { activeTab, selectedRecallForModal, setSelectedRecallForModal } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-ivory-100 text-charcoal-800 font-sans selection:bg-safety-orange selection:text-white">
      <Navbar />

      <main className="flex-1">
        {activeTab === 'landing' && <LandingPage />}
        {activeTab === 'scanner' && <ScannerPage />}
        {activeTab === 'report' && <VerificationReportPage />}
        {activeTab === 'recalls' && <GlobalRecallsPage />}
        {activeTab === 'vault' && <SafetyVaultPage />}
        {activeTab === 'voice' && <VoiceAssistantPage />}
      </main>

      <Footer />

      {/* Global Toast Alerts */}
      <ToastContainer />

      {/* Global Official Recall Bulletin Modal */}
      <RecallDetailModal
        recall={selectedRecallForModal}
        onClose={() => setSelectedRecallForModal(null)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
