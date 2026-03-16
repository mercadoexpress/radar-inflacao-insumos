/**
 * Ranking de Risco — Radar Express de Inflação de Insumos
 * Classificação por probabilidade de aumento, intensidade e volatilidade
 * Semáforo visual: alto / moderado / baixo risco
 */

import { useMemo } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from 'recharts';
import { ShieldAlert, TrendingUp, Activity, Zap } from 'lucide-react';
import { rankingRisco, previsoes } from '@/data/dadosSimulados';
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

const RISK_LABELS: Record<string, string> = {
  alto: 'Alto Risco',
  moderado: 'Risco Moderado',
  baixo: 'Baixo Risco',
};

const IMPACT_LABELS: Record<string, string> = {
  alto: 'Alto impacto',
  medio: 'Médio impacto',
  baixo: 'Baixo impacto',
};

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-border rounded-lg shadow-lg p-3 text-xs">
      <div className="font-semibold text-gray-700 mb-1">{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-gray-500">{p.name}:</span>
          <span className="font-mono-data font-semibold">{p.value}%</span>
        </div>
      ))}
    </div>
  );
}

export default function RankingRisco() {
  const dadosRadar = useMemo(() => {
    const top5 = rankingRisco.slice(0, 5);
    return [
      { metrica: 'Prob. Aumento', ...Object.fromEntries(top5.map((r) => [r.produto.split(' ')[0], r.probabilidadeAumento])) },
      { metrica: 'Volatilidade', ...Object.fromEntries(top5.map((r) => [r.produto.split(' ')[0], r.volatilidade])) },
      { metrica: 'Var. Trim.', ...Object.fromEntries(top5.map((r) => [r.produto.split(' ')[0], Math.min(100, r.variacaoTrimestral * 3)])) },
      { metrica: 'Score Risco', ...Object.fromEntries(top5.map((r) => [r.produto.split(' ')[0], r.scoreRisco])) },
    ];
  }, []);

  const dadosBarras = useMemo(() =>
    rankingRisco.map((r) => ({
      nome: r.produto.split(' ').slice(0, 2).join(' '),
      score: r.scoreRisco,
      risco: r.nivelRisco,
    })),
    []
  );

  const altosRisco = rankingRisco.filter((r) => r.nivelRisco === 'alto').length;
  const moderadoRisco = rankingRisco.filter((r) => r.nivelRisco === 'moderado').length;
  const baixoRisco = rankingRisco.filter((r) => r.nivelRisco === 'baixo').length;

  return (
    <div className="space-y-6">
      {/* Resumo */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Alto Risco', count: altosRisco, color: '#DC2626', bg: '#FEF2F2', icon: <ShieldAlert size={20} className="text-red-600" /> },
          { label: 'Risco Moderado', count: moderadoRisco, color: '#F59E0B', bg: '#FFFBEB', icon: <Activity size={20} className="text-amber-600" /> },
          { label: 'Baixo Risco', count: baixoRisco, color: '#16A34A', bg: '#F0FDF4', icon: <TrendingUp size={20} className="text-green-600" /> },
        ].map((item) => (
          <div
            key={item.label}
            className="kpi-card p-4 flex items-center gap-3"
            style={{ borderLeft: `4px solid ${item.color}` }}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: item.bg }}>
              {item.icon}
            </div>
            <div>
              <div className="font-mono-data text-2xl font-bold text-gray-900">{item.count}</div>
              <div className="text-xs text-gray-500 font-semibold">{item.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Gráfico de barras do score */}
      <div className="kpi-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={16} style={{ color: '#EE7D00' }} />
          <div>
            <h3 className="text-sm font-bold text-gray-900 font-display">Score de Risco por Produto</h3>
            <p className="text-xs text-gray-400">Índice composto: probabilidade × volatilidade × variação</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={dadosBarras} layout="vertical" margin={{ left: 8, right: 32, top: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#9CA3AF' }} tickFormatter={(v) => `${v}`} />
            <YAxis type="category" dataKey="nome" tick={{ fontSize: 11, fill: '#374151' }} width={100} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="score" name="Score de Risco" radius={[0, 4, 4, 0]}>
              {dadosBarras.map((entry, index) => (
                <Cell key={index} fill={RISK_COLORS[entry.risco]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabela detalhada de ranking */}
      <div className="kpi-card overflow-hidden">
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <ShieldAlert size={16} style={{ color: '#003770' }} />
            <div>
              <h3 className="text-sm font-bold text-gray-900 font-display">Ranking Detalhado de Risco</h3>
              <p className="text-xs text-gray-400">Classificação por score composto de pressão inflacionária</p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-border">
          {rankingRisco.map((item, idx) => {
            const previsao = previsoes.find((p) => p.produto === item.produto);
            return (
              <div
                key={item.posicao}
                className="p-5 hover:bg-gray-50 transition-colors animate-slide-in"
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                <div className="flex items-start gap-4">
                  {/* Posição */}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{
                      background: item.posicao <= 3 ? RISK_BG[item.nivelRisco] : '#F9FAFB',
                      color: item.posicao <= 3 ? RISK_COLORS[item.nivelRisco] : '#9CA3AF',
                    }}
                  >
                    {item.posicao}
                  </div>

                  {/* Info principal */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <h4 className="text-sm font-bold text-gray-900">{item.produto}</h4>
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{
                          background: RISK_BG[item.nivelRisco],
                          color: RISK_COLORS[item.nivelRisco],
                          border: `1px solid ${RISK_COLORS[item.nivelRisco]}40`,
                        }}
                      >
                        {RISK_LABELS[item.nivelRisco]}
                      </span>
                      <span className="text-xs text-gray-400">{item.categoria}</span>
                      <span
                        className={cn(
                          'text-xs px-2 py-0.5 rounded-full',
                          item.impactoCusto === 'alto' ? 'bg-red-50 text-red-600' :
                          item.impactoCusto === 'medio' ? 'bg-amber-50 text-amber-600' :
                          'bg-gray-50 text-gray-500'
                        )}
                      >
                        {IMPACT_LABELS[item.impactoCusto]} no custo
                      </span>
                    </div>

                    {/* Métricas em grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {/* Score */}
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Score de Risco</div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${item.scoreRisco}%`,
                                background: RISK_COLORS[item.nivelRisco],
                              }}
                            />
                          </div>
                          <span className="font-mono-data font-bold text-xs text-gray-700">{item.scoreRisco}</span>
                        </div>
                      </div>

                      {/* Prob. aumento */}
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Prob. Aumento</div>
                        <div className="font-mono-data font-bold text-sm" style={{ color: RISK_COLORS[item.nivelRisco] }}>
                          {item.probabilidadeAumento}%
                        </div>
                      </div>

                      {/* Var. trimestral */}
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Var. Trimestral</div>
                        <div className="font-mono-data font-bold text-sm" style={{ color: item.variacaoTrimestral > 0 ? '#DC2626' : '#16A34A' }}>
                          {formatPct(item.variacaoTrimestral)}
                        </div>
                      </div>

                      {/* Previsão 6m */}
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Previsão 6 meses</div>
                        <div
                          className="font-mono-data font-bold text-sm"
                          style={{ color: (previsao?.variacaoEsperada6m ?? 0) > 10 ? '#DC2626' : '#F59E0B' }}
                        >
                          {previsao ? formatPct(previsao.variacaoEsperada6m) : 'N/D'}
                        </div>
                      </div>
                    </div>

                    {/* Barra de volatilidade */}
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                        <span>Volatilidade histórica</span>
                        <span className="font-mono-data">{item.volatilidade}%</span>
                      </div>
                      <div className="h-1 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${item.volatilidade}%`,
                            background: `linear-gradient(90deg, #EE7D00, ${RISK_COLORS[item.nivelRisco]})`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legenda metodológica */}
      <div className="kpi-card p-4 border-l-4" style={{ borderLeftColor: '#EE7D00' }}>
        <div className="text-xs text-gray-600">
          <span className="font-semibold text-gray-800">Metodologia do Score de Risco:</span>{' '}
          O score é calculado como média ponderada de: probabilidade de aumento (40%), volatilidade histórica (30%)
          e variação trimestral normalizada (30%). Produtos com score acima de 70 são classificados como alto risco;
          entre 40 e 70, risco moderado; abaixo de 40, baixo risco. O impacto no custo da refeição considera
          o peso de cada insumo na composição do cardápio da Express.
        </div>
      </div>
    </div>
  );
}
