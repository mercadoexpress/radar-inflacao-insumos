/**
 * Alertas de Inflação — Radar Express de Inflação de Insumos
 * Sistema de alerta automático com cards detalhados e nível de risco
 */

import { useState } from 'react';
import { AlertTriangle, TrendingUp, Activity, Zap, Bell, CheckCircle2 } from 'lucide-react';
import { alertas, type NivelRisco } from '@/data/dadosSimulados';
import { cn } from '@/lib/utils';

const formatPct = (v: number) => {
  const s = v > 0 ? '+' : '';
  return `${s}${v.toFixed(1)}%`;
};

const RISK_COLORS: Record<string, string> = {
  alto: '#DC2626',
  moderado: '#F59E0B',
  baixo: '#16A34A',
};

const RISK_BG: Record<string, string> = {
  alto: '#FEF2F2',
  moderado: '#FFFBEB',
  baixo: '#F0FDF4',
};

const RISK_BORDER: Record<string, string> = {
  alto: '#FECACA',
  moderado: '#FDE68A',
  baixo: '#BBF7D0',
};

const RISK_LABELS: Record<string, string> = {
  alto: 'Alto Risco',
  moderado: 'Risco Moderado',
  baixo: 'Baixo Risco',
};

const TIPO_ICONS: Record<string, React.ReactNode> = {
  aceleracao: <Zap size={16} />,
  tendencia_alta: <TrendingUp size={16} />,
  variacao_acima_indice: <Activity size={16} />,
  volatilidade_alta: <AlertTriangle size={16} />,
};

const TIPO_LABELS: Record<string, string> = {
  aceleracao: 'Aceleração de Preços',
  tendencia_alta: 'Tendência de Alta',
  variacao_acima_indice: 'Acima dos Índices',
  volatilidade_alta: 'Alta Volatilidade',
};

export default function AlertasInflacao() {
  const [filtroRisco, setFiltroRisco] = useState<NivelRisco | 'Todos'>('Todos');
  const [alertasResolvidos, setAlertasResolvidos] = useState<Set<string>>(new Set());

  const alertasFiltrados = alertas
    .filter((a) => a.ativo && !alertasResolvidos.has(a.id))
    .filter((a) => filtroRisco === 'Todos' || a.nivelRisco === filtroRisco);

  const alertasAlto = alertas.filter((a) => a.ativo && a.nivelRisco === 'alto').length;
  const alertasModerado = alertas.filter((a) => a.ativo && a.nivelRisco === 'moderado').length;

  function marcarResolvido(id: string) {
    setAlertasResolvidos((prev) => { const next = new Set(prev); next.add(id); return next; });
  }

  return (
    <div className="space-y-6">
      {/* Resumo de alertas */}
      <div className="grid grid-cols-3 gap-4">
        <div
          className="kpi-card p-4 flex items-center gap-3"
          style={{ borderLeft: '4px solid #DC2626' }}
        >
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-red-50">
            <AlertTriangle size={20} className="text-red-600" />
          </div>
          <div>
            <div className="font-mono-data text-2xl font-bold text-gray-900">{alertasAlto}</div>
            <div className="text-xs text-gray-500 font-semibold">Alto Risco</div>
          </div>
        </div>
        <div
          className="kpi-card p-4 flex items-center gap-3"
          style={{ borderLeft: '4px solid #F59E0B' }}
        >
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-amber-50">
            <Bell size={20} className="text-amber-600" />
          </div>
          <div>
            <div className="font-mono-data text-2xl font-bold text-gray-900">{alertasModerado}</div>
            <div className="text-xs text-gray-500 font-semibold">Risco Moderado</div>
          </div>
        </div>
        <div
          className="kpi-card p-4 flex items-center gap-3"
          style={{ borderLeft: '4px solid #16A34A' }}
        >
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-green-50">
            <CheckCircle2 size={20} className="text-green-600" />
          </div>
          <div>
            <div className="font-mono-data text-2xl font-bold text-gray-900">{alertasResolvidos.size}</div>
            <div className="text-xs text-gray-500 font-semibold">Resolvidos</div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm font-semibold text-gray-600">Filtrar por risco:</span>
        {(['Todos', 'alto', 'moderado', 'baixo'] as const).map((r) => (
          <button
            key={r}
            onClick={() => setFiltroRisco(r)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-semibold transition-all',
              filtroRisco === r
                ? 'text-white shadow-sm'
                : 'bg-white border border-border text-gray-500 hover:border-gray-300'
            )}
            style={
              filtroRisco === r
                ? { background: r === 'Todos' ? '#003770' : RISK_COLORS[r] }
                : {}
            }
          >
            {r === 'Todos' ? 'Todos' : RISK_LABELS[r]}
          </button>
        ))}
      </div>

      {/* Cards de alerta */}
      {alertasFiltrados.length === 0 ? (
        <div className="kpi-card p-12 text-center">
          <CheckCircle2 size={40} className="text-green-400 mx-auto mb-3" />
          <div className="text-gray-500 font-semibold">Nenhum alerta ativo</div>
          <div className="text-xs text-gray-400 mt-1">
            {alertasResolvidos.size > 0
              ? `${alertasResolvidos.size} alerta(s) marcado(s) como resolvido(s)`
              : 'Todos os produtos estão dentro dos parâmetros normais'}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {alertasFiltrados.map((alerta, idx) => (
            <div
              key={alerta.id}
              className="rounded-lg border p-5 animate-slide-in"
              style={{
                background: RISK_BG[alerta.nivelRisco],
                borderColor: RISK_BORDER[alerta.nivelRisco],
                animationDelay: `${idx * 50}ms`,
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  {/* Ícone de tipo */}
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${RISK_COLORS[alerta.nivelRisco]}20`, color: RISK_COLORS[alerta.nivelRisco] }}
                  >
                    {TIPO_ICONS[alerta.tipo]}
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-sm font-bold text-gray-900 font-display">{alerta.produto}</h3>
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{
                          background: `${RISK_COLORS[alerta.nivelRisco]}20`,
                          color: RISK_COLORS[alerta.nivelRisco],
                          border: `1px solid ${RISK_COLORS[alerta.nivelRisco]}40`,
                        }}
                      >
                        {RISK_LABELS[alerta.nivelRisco]}
                      </span>
                      <span className="text-xs text-gray-400 bg-white/60 px-2 py-0.5 rounded-full border border-gray-200">
                        {TIPO_LABELS[alerta.tipo]}
                      </span>
                    </div>

                    {/* Categoria */}
                    <div className="text-xs text-gray-500 mb-2">{alerta.categoria}</div>

                    {/* Descrição */}
                    <p className="text-sm text-gray-700 leading-relaxed">{alerta.descricao}</p>

                    {/* Métricas */}
                    <div className="flex items-center gap-4 mt-3 flex-wrap">
                      <div className="text-xs">
                        <span className="text-gray-500">Variação no mês: </span>
                        <span
                          className="font-mono-data font-bold"
                          style={{ color: RISK_COLORS[alerta.nivelRisco] }}
                        >
                          {formatPct(alerta.percentualVariacao)}
                        </span>
                      </div>
                      <div className="text-xs">
                        <span className="text-gray-500">Projeção 6 meses: </span>
                        <span
                          className="font-mono-data font-bold"
                          style={{ color: RISK_COLORS[alerta.nivelRisco] }}
                        >
                          {formatPct(alerta.tendenciaProjetada)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400">
                        Detectado em: {new Date(alerta.dataAlerta).toLocaleDateString('pt-BR')}
                      </div>
                    </div>

                    {/* Barra de intensidade */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                        <span>Intensidade do alerta</span>
                        <span className="font-mono-data font-semibold" style={{ color: RISK_COLORS[alerta.nivelRisco] }}>
                          {Math.min(100, Math.round(alerta.percentualVariacao * 4))}%
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/60 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${Math.min(100, Math.round(alerta.percentualVariacao * 4))}%`,
                            background: RISK_COLORS[alerta.nivelRisco],
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ação */}
                <button
                  onClick={() => marcarResolvido(alerta.id)}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <CheckCircle2 size={12} />
                  Resolver
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Nota metodológica */}
      <div className="kpi-card p-4 border-l-4" style={{ borderLeftColor: '#003770' }}>
        <div className="text-xs text-gray-600">
          <span className="font-semibold text-gray-800">Metodologia de alertas:</span>{' '}
          Os alertas são gerados automaticamente quando: (1) variação mensal supera 2× o IPCA Alimentação regional;
          (2) tendência de alta é detectada por 3 semanas consecutivas; (3) volatilidade histórica ultrapassa 60% do índice;
          ou (4) variação diária supera 1,5% por 3 dias seguidos. Fontes: CEPEA, CEASA-PR/SC/RS, IBGE, FGV, FIPE.
        </div>
      </div>
    </div>
  );
}
