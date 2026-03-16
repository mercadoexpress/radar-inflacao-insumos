/**
 * Histórico e Tendências — Radar Express de Inflação de Insumos
 * Gráficos de linha com médias móveis e detecção de tendência
 * Previsão de preços para 3 e 6 meses
 */

import { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from 'recharts';
import { TrendingUp, TrendingDown, Minus, BarChart3, Target } from 'lucide-react';
import { historicoPorProduto, previsoes, produtos } from '@/data/dadosSimulados';
import { cn } from '@/lib/utils';

const formatBRL = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

const formatPct = (v: number) => {
  const s = v > 0 ? '+' : '';
  return `${s}${v.toFixed(1)}%`;
};

const PRODUTOS_OPCOES = [
  { id: 'cafe-rs', label: 'Café Torrado e Moído (RS)' },
  { id: 'oleo-soja-pr', label: 'Óleo de Soja (PR)' },
  { id: 'arroz-rs', label: 'Arroz Branco (RS)' },
  { id: 'feijao-pr', label: 'Feijão Carioca (PR)' },
  { id: 'carne-bovina-rs', label: 'Carne Bovina (RS)' },
  { id: 'acucar-sc', label: 'Açúcar Cristal (SC)' },
  { id: 'frango-rs', label: 'Frango Inteiro (RS)' },
  { id: 'massa-sc', label: 'Macarrão Espaguete (SC)' },
  { id: 'carne-suina-pr', label: 'Carne Suína (PR)' },
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-border rounded-lg shadow-lg p-3 text-xs">
      <div className="font-semibold text-gray-700 mb-2">{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-gray-500">{p.name}:</span>
          <span className="font-mono-data font-semibold" style={{ color: p.color }}>
            {formatBRL(p.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function HistoricoTendencias() {
  const [produtoSelecionado, setProdutoSelecionado] = useState('cafe-rs');

  const historico = useMemo(() => {
    const dados = historicoPorProduto[produtoSelecionado] || [];
    return dados.map((d) => ({
      data: d.data.substring(5),
      Preço: d.preco,
      'Média 7d': d.mediaMovel7d,
      'Média 30d': d.mediaMovel30d,
    }));
  }, [produtoSelecionado]);

  const produtoInfo = useMemo(() => {
    const p = produtos.find((x) => x.id === produtoSelecionado);
    return p;
  }, [produtoSelecionado]);

  const previsaoInfo = useMemo(() => {
    if (!produtoInfo) return null;
    return previsoes.find((p) => p.produto === produtoInfo.nome);
  }, [produtoInfo]);

  // Calcular tendência dos últimos 30 dias
  const tendencia30d = useMemo(() => {
    const dados = historicoPorProduto[produtoSelecionado] || [];
    if (dados.length < 5) return 0;
    const recentes = dados.slice(-5);
    const inicio = recentes[0].preco;
    const fim = recentes[recentes.length - 1].preco;
    return ((fim - inicio) / inicio) * 100;
  }, [produtoSelecionado]);

  return (
    <div className="space-y-6">
      {/* Seletor de produto */}
      <div className="kpi-card p-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <BarChart3 size={14} style={{ color: '#EE7D00' }} />
            <span className="text-sm font-semibold text-gray-700">Produto:</span>
          </div>
          <select
            value={produtoSelecionado}
            onChange={(e) => setProdutoSelecionado(e.target.value)}
            className="flex-1 max-w-xs px-3 py-2 text-sm border border-border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#EE7D00]/30 focus:border-[#EE7D00]"
          >
            {PRODUTOS_OPCOES.map((p) => (
              <option key={p.id} value={p.id}>{p.label}</option>
            ))}
          </select>

          {produtoInfo && (
            <div className="flex items-center gap-3 ml-auto">
              <div className="text-right">
                <div className="text-xs text-gray-400">Preço atual</div>
                <div className="font-mono-data font-bold text-gray-800 text-sm">
                  {formatBRL(produtoInfo.precoAtual)}/{produtoInfo.unidade}
                </div>
              </div>
              <div
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold',
                  produtoInfo.tendencia === 'alta' ? 'bg-red-50 text-red-600' :
                  produtoInfo.tendencia === 'queda' ? 'bg-green-50 text-green-600' :
                  'bg-gray-50 text-gray-500'
                )}
              >
                {produtoInfo.tendencia === 'alta' ? <TrendingUp size={12} /> :
                 produtoInfo.tendencia === 'queda' ? <TrendingDown size={12} /> :
                 <Minus size={12} />}
                {produtoInfo.tendencia === 'alta' ? 'Tendência de alta' :
                 produtoInfo.tendencia === 'queda' ? 'Tendência de queda' : 'Estável'}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Gráfico histórico */}
      <div className="kpi-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-gray-900 font-display">
              Evolução Histórica de Preços
            </h3>
            <p className="text-xs text-gray-400">
              {PRODUTOS_OPCOES.find((p) => p.id === produtoSelecionado)?.label} · Últimas 18 semanas
            </p>
          </div>
          <div
            className={cn(
              'flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full',
              tendencia30d > 2 ? 'bg-red-50 text-red-600' :
              tendencia30d < -2 ? 'bg-green-50 text-green-600' :
              'bg-gray-50 text-gray-500'
            )}
          >
            {tendencia30d > 2 ? <TrendingUp size={11} /> : tendencia30d < -2 ? <TrendingDown size={11} /> : <Minus size={11} />}
            {formatPct(tendencia30d)} (30d)
          </div>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={historico} margin={{ left: 0, right: 16, top: 8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
            <XAxis dataKey="data" tick={{ fontSize: 10, fill: '#9CA3AF' }} interval={3} />
            <YAxis
              tick={{ fontSize: 10, fill: '#9CA3AF' }}
              tickFormatter={(v) => `R$${v}`}
              domain={['auto', 'auto']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
            <Line
              type="monotone"
              dataKey="Preço"
              stroke="#003770"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4, fill: '#003770' }}
            />
            <Line
              type="monotone"
              dataKey="Média 7d"
              stroke="#EE7D00"
              strokeWidth={1.5}
              dot={false}
              strokeDasharray="6 3"
            />
            <Line
              type="monotone"
              dataKey="Média 30d"
              stroke="#16A34A"
              strokeWidth={1.5}
              dot={false}
              strokeDasharray="3 3"
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-3 p-3 rounded-md bg-gray-50 border border-border">
          <div className="text-xs text-gray-600">
            <span className="font-semibold text-gray-700">Interpretação:</span>{' '}
            {tendencia30d > 5
              ? 'Tendência de alta acelerada. Média móvel de 7 dias acima da média de 30 dias indica pressão crescente de preços. Recomenda-se antecipar compras ou negociar contratos de prazo fixo.'
              : tendencia30d > 2
              ? 'Tendência de alta moderada. Monitorar evolução nas próximas semanas antes de tomar decisões de compra.'
              : tendencia30d < -2
              ? 'Tendência de queda. Momento favorável para negociação com fornecedores e revisão de contratos.'
              : 'Preços estáveis. Variação dentro da faixa histórica normal. Manter estratégia atual de compras.'}
          </div>
        </div>
      </div>

      {/* Previsão de preços */}
      {previsaoInfo && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="kpi-card p-5 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Target size={16} style={{ color: '#EE7D00' }} />
              <div>
                <h3 className="text-sm font-bold text-gray-900 font-display">Previsão de Preços</h3>
                <p className="text-xs text-gray-400">Horizonte de 3 e 6 meses — modelo estatístico</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Previsão 3 meses */}
              <div
                className="p-4 rounded-lg border"
                style={{
                  background: previsaoInfo.variacaoEsperada3m > 5 ? '#FEF2F2' : '#F0FDF4',
                  borderColor: previsaoInfo.variacaoEsperada3m > 5 ? '#FECACA' : '#BBF7D0',
                }}
              >
                <div className="text-xs font-semibold text-gray-500 mb-2">Previsão 3 meses</div>
                <div className="font-mono-data text-2xl font-bold text-gray-900 mb-1">
                  {formatBRL(previsaoInfo.previsao3m)}
                </div>
                <div
                  className={cn(
                    'flex items-center gap-1 text-sm font-semibold',
                    previsaoInfo.variacaoEsperada3m > 0 ? 'text-red-600' : 'text-green-600'
                  )}
                >
                  {previsaoInfo.variacaoEsperada3m > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {formatPct(previsaoInfo.variacaoEsperada3m)}
                </div>
                <div className="text-xs text-gray-400 mt-1">vs. preço atual</div>
              </div>

              {/* Previsão 6 meses */}
              <div
                className="p-4 rounded-lg border"
                style={{
                  background: previsaoInfo.variacaoEsperada6m > 10 ? '#FEF2F2' : '#FFF7ED',
                  borderColor: previsaoInfo.variacaoEsperada6m > 10 ? '#FECACA' : '#FED7AA',
                }}
              >
                <div className="text-xs font-semibold text-gray-500 mb-2">Previsão 6 meses</div>
                <div className="font-mono-data text-2xl font-bold text-gray-900 mb-1">
                  {formatBRL(previsaoInfo.previsao6m)}
                </div>
                <div
                  className={cn(
                    'flex items-center gap-1 text-sm font-semibold',
                    previsaoInfo.variacaoEsperada6m > 0 ? 'text-red-600' : 'text-green-600'
                  )}
                >
                  {previsaoInfo.variacaoEsperada6m > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {formatPct(previsaoInfo.variacaoEsperada6m)}
                </div>
                <div className="text-xs text-gray-400 mt-1">vs. preço atual</div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-md bg-blue-50 border border-blue-100">
              <div className="text-xs text-blue-800">
                <span className="font-semibold">Confiança do modelo:</span>{' '}
                <span className="font-mono-data font-bold">{previsaoInfo.confianca}%</span>
                {' '}— Baseado em histórico de preços, sazonalidade agrícola, índices econômicos e volatilidade de mercado.
              </div>
            </div>
          </div>

          {/* Tabela de previsões */}
          <div className="kpi-card p-5">
            <h3 className="text-sm font-bold text-gray-900 font-display mb-4">
              Previsões — Todos os Produtos
            </h3>
            <div className="space-y-2">
              {previsoes.map((prev) => (
                <div
                  key={prev.produto}
                  className={cn(
                    'flex items-center justify-between p-2 rounded-md text-xs',
                    prev.produto === previsaoInfo.produto ? 'bg-orange-50 border border-orange-200' : 'hover:bg-gray-50'
                  )}
                >
                  <div className="font-medium text-gray-700 truncate flex-1 pr-2">
                    {prev.produto.split(' ').slice(0, 2).join(' ')}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <span
                      className={cn(
                        'font-mono-data font-semibold',
                        prev.variacaoEsperada6m > 15 ? 'text-red-600' :
                        prev.variacaoEsperada6m > 5 ? 'text-amber-600' : 'text-green-600'
                      )}
                    >
                      {formatPct(prev.variacaoEsperada6m)}
                    </span>
                    <span className="text-gray-300">6m</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
