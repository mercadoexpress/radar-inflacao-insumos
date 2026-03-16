/**
 * App.tsx — Radar Express de Inflação de Insumos
 * Roteamento entre as 5 seções do dashboard
 * Design: Sidebar azul Express + conteúdo principal
 */

import { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout, { type PageId } from './components/Layout';
import Dashboard from './pages/Dashboard';
import MonitorPrecos from './pages/MonitorPrecos';
import HistoricoTendencias from './pages/HistoricoTendencias';
import AlertasInflacao from './pages/AlertasInflacao';
import RankingRisco from './pages/RankingRisco';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'monitor':
        return <MonitorPrecos />;
      case 'historico':
        return <HistoricoTendencias />;
      case 'alertas':
        return <AlertasInflacao />;
      case 'ranking':
        return <RankingRisco />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <AppContent />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
