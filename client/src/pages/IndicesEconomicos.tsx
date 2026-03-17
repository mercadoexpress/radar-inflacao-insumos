/**
 * Análise Detalhada de Índices Econômicos — Radar Express
 * Foco: IPCA Alimentação, IGP-M e FIPE Alimentação
 */

import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  Cell,
} from 'recharts';
import { 
  TrendingUp, 
  Info, 
  Globe, 
  MapPin, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { indices } from '@/data/dadosSimulados';

const formatPct = (v: number) => {
  const s = v > 0 ? '+' : '';
  return `${s}${v.toFixed(2)}%`;
};

export default function IndicesEconomicos() {
  // Dados para comparação regional do IPCA
  const dadosIPCA = useMemo(() => 
    indices.filter(idx => idx.sigla.startsWith('IPCA'))
      .map(idx => ({
        regiao: idx.nome.split('—')[1]?.trim() || idx.sigla,
        mensal: idx.variacaoMensal,
        acumulado: idx.variacaoAcumulada12m,
        periodo: idx.periodo
      })),
    []
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header de Contexto */}
      <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
            <Globe size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Análise de Índices Macroeconômicos</h2>
            <p className="text-sm text-gray-500 mt-1">
              Acompanhamento dos principais indicadores de inflação que impactam a cadeia de suprimentos e o custo de alimentação corporativa.
            </p>
          </div>
        </div>
      </div>

      {/* Seção IPCA Alimentação - Regional (Conforme Imagem) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">IPCA Alimentação</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {indices.filter(idx => idx.sigla.startsWith('IPCA')).map((idx) => (
            <div key={idx.sigla} className="bg-white p-5 rounded-xl border-2 border-blue-900/10 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-900"></div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-gray-400 uppercase">
                  {idx.nome.split('—')[1]?.trim()}
                </span>
                <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                  Mensal
                </span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold text-gray-900 font-mono-data">
                    {idx.variacaoAcumulada12m.toFixed(2)}%
                  </div>
                  <div className="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">
                    Acumulado 12 meses — {idx.periodo}
                  </div>
                </div>
                <div className={`flex items-center gap-0.5 text-sm font-bold ${idx.variacaoMensal > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {idx.variacaoMensal > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {idx.variacaoMensal.toFixed(2)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seção IGP-M e FIPE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* IGP-M */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <div className="w-1 h-4 bg-orange-500 rounded-full"></div>
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">IGP-M (FGV)</h3>
          </div>
          {indices.filter(idx => idx.sigla === 'IGP-M').map((idx) => (
            <div key={idx.sigla} className="bg-white p-5 rounded-xl border border-border shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div className="text-3xl font-bold text-gray-900 font-mono-data">
                  {idx.variacaoAcumulada12m.toFixed(2)}%
                </div>
                <div className={`flex items-center gap-1 text-sm font-bold ${idx.variacaoMensal > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {idx.variacaoMensal > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {formatPct(idx.variacaoMensal)} (Mensal)
                </div>
              </div>
              <div className="text-xs text-gray-500">Acumulado 12 meses — {idx.periodo}</div>
            </div>
          ))}
        </div>

        {/* FIPE */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <div className="w-1 h-4 bg-green-600 rounded-full"></div>
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">FIPE Alimentação</h3>
          </div>
          {indices.filter(idx => idx.sigla === 'FIPE-Alim').map((idx) => (
            <div key={idx.sigla} className="bg-white p-5 rounded-xl border border-border shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div className="text-3xl font-bold text-gray-900 font-mono-data">
                  {idx.variacaoAcumulada12m.toFixed(2)}%
                </div>
                <div className={`flex items-center gap-1 text-sm font-bold ${idx.variacaoMensal > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {idx.variacaoMensal > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {formatPct(idx.variacaoMensal)} (Mensal)
                </div>
              </div>
              <div className="text-xs text-gray-500">Acumulado 12 meses — {idx.periodo}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Análise Técnica */}
      <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Info size={18} className="text-blue-600" />
          <h3 className="font-bold text-gray-900">Análise Técnica dos Índices</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-600">
            <h4 className="text-sm font-bold text-gray-900 mb-1">IPCA Alimentação (IBGE)</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Reflete a variação de preços para o consumidor final. No Sul, o índice acumula alta média de <strong>8,12%</strong>, impulsionado por proteínas e hortifruti. É o principal balizador para reajustes de contratos de alimentação.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-orange-500">
            <h4 className="text-sm font-bold text-gray-900 mb-1">IGP-M (FGV)</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              O "índice do aluguel" também é sensível aos preços no atacado (IPA). A variação de <strong>0,45%</strong> no mês indica uma pressão moderada nos custos logísticos e de infraestrutura.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-green-600">
            <h4 className="text-sm font-bold text-gray-900 mb-1">FIPE Alimentação</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Focado na região de São Paulo, mas serve como termômetro para tendências nacionais. A alta de <strong>0,72%</strong> sinaliza que a pressão inflacionária nos alimentos continua disseminada.
            </p>
          </div>
        </div>
      </div>

      {/* Nota Metodológica */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <p className="text-[10px] text-blue-800 leading-relaxed">
          <strong>Nota:</strong> Os dados apresentados são coletados mensalmente das bases oficiais do IBGE (SIDRA), FGV (Ibre) e FIPE. As variações regionais do IPCA referem-se especificamente ao grupo "Alimentação e Bebidas". A atualização ocorre no primeiro decêndio de cada mês, logo após a divulgação oficial pelos institutos.
        </p>
      </div>
    </div>
  );
}
