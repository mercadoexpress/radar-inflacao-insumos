/**
 * Dashboard Gerencial — Radar Express de Inflação de Insumos
 * Design: Cards KPI + gráficos Recharts + ranking resumido
 * Paleta: Azul Express #003770, Laranja #EE7D00, semáforo de risco
 */

import { useMemo } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  ShieldAlert,
  Activity,
  DollarSign,
  BarChart3,
} from 'lucide-react';
import {
  produtos,
  rankingRisco,
  indices,
  alertas,
  resumoExecutivo,
  historicoPorProduto,
} from '@/data/dadosSimulados';
import { cn } from '@/lib/utils';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const formatBRL = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

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

// ─── KPI Card ────────────────────────────────────────────────────────────────

interface KpiCardProps {
  titulo: string;
  valor: string;
  subtitulo: string;
  variacao?: number;
  icon: React.ReactNode;
  accentColor?: string;
  delay?: number;
}

function KpiCard({ titulo, valor, subtitulo, variacao, icon, accentColor = '#EE7D00', delay = 0 }: KpiCardProps) {
  return (
    <div
      className="kpi-card p-5 animate-slide-in"
      style={{ animationDelay: `${delay}ms`, borderLeft: `4px solid ${accentColor}` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: `${accentColor}18`, color: accentColor }}
        >
          {icon}
        </div>
        {variacao !== undefined && (
          <div
            className={cn(
              'flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full',
              variacao > 0 ? 'bg-red-50 text-red-600' : variacao < 0 ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-500'
            )}
          >
            {variacao > 0 ? <TrendingUp size={10} /> : variacao < 0 ? <TrendingDown size={10} /> : <Minus size={10} />}
            {formatPct(variacao)}
          </div>
        )}
      </div>
      <div className="font-mono-data text-2xl font-bold text-gray-900 mb-1">{valor}</div>
      <div className="text-xs font-semibold text-gray-700 mb-0.5">{titulo}</div>
      <div className="text-xs text-gray-400">{subtitulo}</div>
    </div>
  );
}

// ─── Tooltip customizado ──────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-border rounded-lg shadow-lg p-3 text-xs">
      <div className="font-semibold text-gray-700 mb-2">{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-gray-500">{p.name}:</span>
          <span className="font-mono-data font-semibold" style={{ color: p.color }}>
            {typeof p.value === 'number' && p.value > 10 ? formatBRL(p.value) : `${p.value?.toFixed(1)}%`}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export default function Dashboard() {
  // Dados para gráfico de variação mensal por produto
  const dadosVariacaoMensal = useMemo(() =>
    produtos
      .filter((p, i, arr) => arr.findIndex(x => x.nome === p.nome) === i) // dedup por nome
      .sort((a, b) => b.variacaoMensal - a.variacaoMensal)
      .slice(0, 8)
      .map((p) => ({
        nome: p.nome.split(' ').slice(0, 2).join(' '),
        variacao: p.variacaoMensal,
        risco: p.nivelRisco,
      })),
    []
  );

  // Dados para gráfico de evolução histórica (café e óleo de soja)
  const dadosEvolucao = useMemo(() => {
    const cafe = historicoPorProduto['cafe-rs'] || [];
    const oleo = historicoPorProduto['oleo-soja-pr'] || [];
    const arroz = historicoPorProduto['arroz-rs'] || [];

    return cafe.slice(-26).map((c, i) => ({
      data: c.data.substring(5), // MM-DD
      Café: c.preco,
      'Óleo de Soja': oleo[i]?.preco,
      Arroz: arroz[i]?.preco,
    }));
  }, []);

  // Dados para gráfico de índices
  const dadosIndices = useMemo(() =>
    indices.map((idx) => ({
      sigla: idx.sigla,
      acumulado: idx.variacaoAcumulada12m,
      mensal: idx.variacaoMensal,
    })),
    []
  );

  const alertasAtivos = alertas.filter((a) => a.ativo);

  return (
    <div className="space-y-6">
      {/* Faixa de contexto */}
      <div
        className="rounded-lg p-4 flex items-start gap-3 border"
        style={{ background: '#FFF3E0', borderColor: '#FBBF24' }}
      >
        <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" style={{ color: '#EE7D00' }} />
        <div className="text-sm">
          <span className="font-semibold" style={{ color: '#003770' }}>
            Atenção, área de compras:
          </span>{' '}
          <span className="text-gray-700">
            {resumoExecutivo.produtosEmAlerta} produtos com alerta ativo. Variação média mensal de{' '}
            <strong>{formatPct(resumoExecutivo.variacaoMediaMensal)}</strong> nos insumos monitorados —
            impacto estimado de{' '}
            <strong>{formatPct(resumoExecutivo.impactoCustoRefeicao)}</strong> no custo da refeição.
          </span>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          titulo="Produtos Monitorados"
          valor={String(resumoExecutivo.totalProdutosMonitorados)}
          subtitulo="9 insumos prioritários"
          icon={<Activity size={20} />}
          accentColor="#003770"
          delay={0}
        />
        <KpiCard
          titulo="Em Alerta Ativo"
          valor={String(resumoExecutivo.produtosEmAlerta)}
          subtitulo="Requerem ação imediata"
          icon={<AlertTriangle size={20} />}
          accentColor="#DC2626"
          delay={40}
        />
        <KpiCard
          titulo="Variação Média Mensal"
          valor={formatPct(resumoExecutivo.variacaoMediaMensal)}
          subtitulo="vs. IPCA Alim. Sul: +8,12%"
          variacao={resumoExecutivo.variacaoMediaMensal}
          icon={<TrendingUp size={20} />}
          accentColor="#EE7D00"
          delay={80}
        />
        <KpiCard
          titulo="Impacto no Custo/Refeição"
          valor={formatPct(resumoExecutivo.impactoCustoRefeicao)}
          subtitulo="Estimativa trimestral"
          variacao={resumoExecutivo.impactoCustoRefeicao}
          icon={<DollarSign size={20} />}
          accentColor="#F59E0B"
          delay={120}
        />
      </div>

      {/* Gráficos principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Variação mensal por produto */}
        <div className="kpi-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={16} style={{ color: '#EE7D00' }} />
            <div>
              <h3 className="text-sm font-bold text-gray-900 font-display">Variação Mensal por Produto</h3>
              <p className="text-xs text-gray-400">Março/2026 — ordenado por variação</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={dadosVariacaoMensal} layout="vertical" margin={{ left: 8, right: 24, top: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#9CA3AF' }} tickFormatter={(v) => `${v}%`} />
              <YAxis type="category" dataKey="nome" tick={{ fontSize: 11, fill: '#374151' }} width={90} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="variacao" name="Variação" radius={[0, 4, 4, 0]}>
                {dadosVariacaoMensal.map((entry, index) => (
                  <Cell key={index} fill={RISK_COLORS[entry.risco]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-3 justify-center">
            {Object.entries(RISK_COLORS).map(([k, v]) => (
              <div key={k} className="flex items-center gap-1.5 text-xs text-gray-500">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: v }} />
                {RISK_LABELS[k]}
              </div>
            ))}
          </div>
        </div>

        {/* Evolução histórica */}
        <div className="kpi-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} style={{ color: '#003770' }} />
            <div>
              <h3 className="text-sm font-bold text-gray-900 font-display">Evolução de Preços — Insumos Críticos</h3>
              <p className="text-xs text-gray-400">Últimas 26 semanas (R$/unidade)</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={dadosEvolucao} margin={{ left: 0, right: 8, top: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gradCafe" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EE7D00" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#EE7D00" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradOleo" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#003770" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#003770" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="data" tick={{ fontSize: 10, fill: '#9CA3AF' }} interval={4} />
              <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} tickFormatter={(v) => `R$${v}`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              <Area type="monotone" dataKey="Café" stroke="#EE7D00" strokeWidth={2} fill="url(#gradCafe)" dot={false} />
              <Area type="monotone" dataKey="Óleo de Soja" stroke="#003770" strokeWidth={2} fill="url(#gradOleo)" dot={false} />
              <Area type="monotone" dataKey="Arroz" stroke="#16A34A" strokeWidth={1.5} fill="none" dot={false} strokeDasharray="4 2" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Índices econômicos + Alertas recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Índices */}
        <div className="kpi-card p-5 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={16} style={{ color: '#003770' }} />
            <div>
              <h3 className="text-sm font-bold text-gray-900 font-display">Índices Econômicos — Alimentação</h3>
              <p className="text-xs text-gray-400">Acumulado 12 meses vs. variação mensal</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dadosIndices} margin={{ left: 0, right: 8, top: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="sigla" tick={{ fontSize: 11, fill: '#374151' }} />
              <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="acumulado" name="Acum. 12m (%)" fill="#003770" radius={[4, 4, 0, 0]} />
              <Bar dataKey="mensal" name="Var. Mensal (%)" fill="#EE7D00" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Alertas recentes */}
        <div className="kpi-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={16} style={{ color: '#DC2626' }} />
            <div>
              <h3 className="text-sm font-bold text-gray-900 font-display">Alertas Ativos</h3>
              <p className="text-xs text-gray-400">{alertasAtivos.length} produtos em monitoramento</p>
            </div>
          </div>
          <div className="space-y-2">
            {alertasAtivos.slice(0, 5).map((alerta) => (
              <div
                key={alerta.id}
                className="flex items-start gap-2.5 p-2.5 rounded-md border"
                style={{
                  background: RISK_BG[alerta.nivelRisco],
                  borderColor: `${RISK_COLORS[alerta.nivelRisco]}40`,
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 animate-alert-pulse"
                  style={{ background: RISK_COLORS[alerta.nivelRisco] }}
                />
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-gray-800 truncate">{alerta.produto}</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    <span className="font-mono-data font-semibold" style={{ color: RISK_COLORS[alerta.nivelRisco] }}>
                      {formatPct(alerta.percentualVariacao)}
                    </span>{' '}
                    no mês
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top 5 Ranking de Risco */}
      <div className="kpi-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShieldAlert size={16} style={{ color: '#EE7D00' }} />
            <div>
              <h3 className="text-sm font-bold text-gray-900 font-display">Ranking de Pressão Inflacionária</h3>
              <p className="text-xs text-gray-400">Classificação por score de risco composto</p>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-3 text-gray-500 font-semibold w-8">#</th>
                <th className="text-left py-2 px-3 text-gray-500 font-semibold">Produto</th>
                <th className="text-left py-2 px-3 text-gray-500 font-semibold hidden sm:table-cell">Categoria</th>
                <th className="text-right py-2 px-3 text-gray-500 font-semibold">Var. Trim.</th>
                <th className="text-right py-2 px-3 text-gray-500 font-semibold">Score</th>
                <th className="text-center py-2 px-3 text-gray-500 font-semibold">Risco</th>
              </tr>
            </thead>
            <tbody>
              {rankingRisco.slice(0, 7).map((item) => (
                <tr key={item.posicao} className="border-b border-border/50 hover:bg-gray-50 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-gray-400">{item.posicao}</td>
                  <td className="py-2.5 px-3 font-semibold text-gray-800">{item.produto}</td>
                  <td className="py-2.5 px-3 text-gray-500 hidden sm:table-cell">{item.categoria}</td>
                  <td className="py-2.5 px-3 text-right font-mono-data font-semibold" style={{ color: RISK_COLORS[item.nivelRisco] }}>
                    {formatPct(item.variacaoTrimestral)}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${item.scoreRisco}%`,
                            background: RISK_COLORS[item.nivelRisco],
                          }}
                        />
                      </div>
                      <span className="font-mono-data font-semibold text-gray-700 w-6 text-right">{item.scoreRisco}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-center">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
