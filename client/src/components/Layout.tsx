/**
 * Layout principal do Radar Express de Inflação de Insumos
 * Design: Sidebar azul Express (#003770) + conteúdo principal
 * Logo Express horizontal no topo da sidebar
 */

import { useState } from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  BarChart3,
  Bell,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Activity,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const LOGO_HORIZONTAL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663443994167/jT2UUUNJKLcCqzAqU9WifS/express_logo_horizontal_22312e17.png';

export type PageId = 'dashboard' | 'monitor' | 'alertas' | 'ranking';

interface NavItem {
  id: PageId;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard Gerencial', icon: <LayoutDashboard size={18} /> },
  { id: 'monitor', label: 'Monitor de Preços', icon: <Activity size={18} /> },
  { id: 'alertas', label: 'Alertas de Inflação', icon: <Bell size={18} />, badge: 4 },
  { id: 'ranking', label: 'Ranking de Risco', icon: <ShieldAlert size={18} /> },
];

interface LayoutProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  children: React.ReactNode;
}

export default function Layout({ currentPage, onNavigate, children }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          'express-sidebar flex flex-col transition-all duration-300 ease-in-out relative z-20 flex-shrink-0',
          collapsed ? 'w-16' : 'w-60'
        )}
        style={{ background: 'linear-gradient(180deg, #003770 0%, #002255 100%)' }}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-white/10">
          {collapsed ? (
            <div className="w-8 h-8 flex items-center justify-center">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663443994167/jT2UUUNJKLcCqzAqU9WifS/express_logo_icon_fb58b4c8.png"
                alt="Express"
                className="w-8 h-8 object-contain"
              />
            </div>
          ) : (
            <img
              src={LOGO_HORIZONTAL}
              alt="Express Soluções em Alimentação"
              className="h-8 object-contain brightness-0 invert"
            />
          )}
        </div>

        {/* Título da ferramenta */}
        {!collapsed && (
          <div className="px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full animate-alert-pulse"
                style={{ background: '#EE7D00' }}
              />
              <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                Radar de Inflação
              </span>
            </div>
          </div>
        )}

        {/* Navegação */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150',
                    currentPage === item.id
                      ? 'text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  )}
                  style={
                    currentPage === item.id
                      ? { background: 'rgba(238, 125, 0, 0.25)', borderLeft: '3px solid #EE7D00' }
                      : {}
                  }
                  title={collapsed ? item.label : undefined}
                >
                  <span className={cn('flex-shrink-0', currentPage === item.id && 'text-[#EE7D00]')}>
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <span className="flex-1 text-left truncate">{item.label}</span>
                  )}
                  {!collapsed && item.badge && (
                    <span
                      className="flex-shrink-0 text-xs font-bold px-1.5 py-0.5 rounded-full text-white"
                      style={{ background: '#EE7D00' }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Rodapé da sidebar */}
        {!collapsed && (
          <div className="px-4 py-3 border-t border-white/10">
            <div className="text-xs text-white/40 leading-relaxed">
              <div className="font-semibold text-white/60 mb-1">Fontes de dados</div>
              <div>CEPEA · CEASA-PR · CEASA-SC · CEASA-RS</div>
              <div className="mt-1">IBGE · FGV · FIPE</div>
            </div>
          </div>
        )}

        {/* Botão de colapso */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white border border-border shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors z-30"
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </aside>

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header
          className="h-16 flex items-center justify-between px-6 border-b border-border bg-white shadow-sm flex-shrink-0"
        >
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-base font-bold text-gray-900 font-display leading-tight">
                {navItems.find((n) => n.id === currentPage)?.label}
              </h1>
              <p className="text-xs text-gray-500">
                Express Soluções em Alimentação · Área de Compras
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Indicador de atualização */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Atualizado: 16/03/2026 10:00</span>
            </div>

            {/* Badge de alertas ativos */}
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white"
              style={{ background: '#EE7D00' }}
            >
              <Bell size={12} />
              <span>5 alertas ativos</span>
            </div>
          </div>
        </header>

        {/* Área de conteúdo */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
