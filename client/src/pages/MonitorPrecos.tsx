/**
 * Monitor de Preços — Radar Express de Inflação de Insumos
 * Tabela com filtros por produto, categoria, estado, período e fonte
 * Variações diária, mensal, trimestral com indicadores visuais
 */

import { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, Minus, Search, Filter, RefreshCw } from 'lucide-react';
import { produtos, type Categoria, type Estado, type NivelRisco } from '@/data/dadosSimulados';
import { cn } from '@/lib/utils';

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
  alto: 'Alto',
  moderado: 'Moderado',
  baixo: 'Baixo',
};

function VarBadge({ valor }: { valor: number }) {
  const isUp = valor > 0.5;
  const isDown = valor < -0.5;
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold font-mono-data',
        isUp ? 'bg-red-50 text-red-600' : isDown ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-500'
      )}
    >
      {isUp ? <TrendingUp size={10} /> : isDown ? <TrendingDown size={10} /> : <Minus size={10} />}
      {formatPct(valor)}
    </div>
  );
}

type SortField = 'nome' | 'precoAtual' | 'variacaoDiaria' | 'variacaoMensal' | 'variacaoTrimestral' | 'scoreRisco';
type SortDir = 'asc' | 'desc';

export default function MonitorPrecos() {
  const [busca, setBusca] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState<Categoria | 'Todas'>('Todas');
  const [estadoFiltro, setEstadoFiltro] = useState<Estado | 'Todos'>('Todos');
  const [riscoFiltro, setRiscoFiltro] = useState<NivelRisco | 'Todos'>('Todos');
  const [sortField, setSortField] = useState<SortField>('variacaoMensal');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const categorias: (Categoria | 'Todas')[] = ['Todas', 'Proteínas', 'Grãos e Secos', 'Outros Insumos', 'Hortifruti', 'Suprimentos'];
  const estados: (Estado | 'Todos')[] = ['Todos', 'RS', 'SC', 'PR'];
  const riscos: (NivelRisco | 'Todos')[] = ['Todos', 'alto', 'moderado', 'baixo'];

  const produtosFiltrados = useMemo(() => {
    let lista = [...produtos];

    if (busca) {
      lista = lista.filter((p) => p.nome.toLowerCase().includes(busca.toLowerCase()));
    }
    if (categoriaFiltro !== 'Todas') {
      lista = lista.filter((p) => p.categoria === categoriaFiltro);
    }
    if (estadoFiltro !== 'Todos') {
      lista = lista.filter((p) => p.estado === estadoFiltro);
    }
    if (riscoFiltro !== 'Todos') {
      lista = lista.filter((p) => p.nivelRisco === riscoFiltro);
    }

    lista.sort((a, b) => {
      let va: number | string = 0;
      let vb: number | string = 0;
      if (sortField === 'nome') { va = a.nome; vb = b.nome; }
      else if (sortField === 'precoAtual') { va = a.precoAtual; vb = b.precoAtual; }
      else if (sortField === 'variacaoDiaria') { va = a.variacaoDiaria; vb = b.variacaoDiaria; }
      else if (sortField === 'variacaoMensal') { va = a.variacaoMensal; vb = b.variacaoMensal; }
      else if (sortField === 'variacaoTrimestral') { va = a.variacaoTrimestral; vb = b.variacaoTrimestral; }
      else if (sortField === 'scoreRisco') { va = a.probabilidadeAumento; vb = b.probabilidadeAumento; }

      if (typeof va === 'string') {
        return sortDir === 'asc' ? va.localeCompare(vb as string) : (vb as string).localeCompare(va);
      }
      return sortDir === 'asc' ? (va as number) - (vb as number) : (vb as number) - (va as number);
    });

    return lista;
  }, [busca, categoriaFiltro, estadoFiltro, riscoFiltro, sortField, sortDir]);

  function toggleSort(field: SortField) {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  }

  function SortIcon({ field }: { field: SortField }) {
    if (sortField !== field) return <span className="text-gray-300 ml-1">↕</span>;
    return <span className="ml-1" style={{ color: '#EE7D00' }}>{sortDir === 'asc' ? '↑' : '↓'}</span>;
  }

  return (
    <div className="space-y-5">
      {/* Filtros */}
      <div className="kpi-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter size={14} style={{ color: '#EE7D00' }} />
          <span className="text-sm font-semibold text-gray-700">Filtros</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Busca */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar produto..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#EE7D00]/30 focus:border-[#EE7D00]"
            />
          </div>

          {/* Categoria */}
          <select
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value as Categoria | 'Todas')}
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#EE7D00]/30 focus:border-[#EE7D00]"
          >
            {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          {/* Estado */}
          <select
            value={estadoFiltro}
            onChange={(e) => setEstadoFiltro(e.target.value as Estado | 'Todos')}
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#EE7D00]/30 focus:border-[#EE7D00]"
          >
            {estados.map((e) => <option key={e} value={e}>{e === 'Todos' ? 'Todos os estados' : e}</option>)}
          </select>

          {/* Nível de risco */}
          <select
            value={riscoFiltro}
            onChange={(e) => setRiscoFiltro(e.target.value as NivelRisco | 'Todos')}
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#EE7D00]/30 focus:border-[#EE7D00]"
          >
            {riscos.map((r) => <option key={r} value={r}>{r === 'Todos' ? 'Todos os riscos' : RISK_LABELS[r]}</option>)}
          </select>
        </div>
      </div>

      {/* Resumo dos filtros */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>
          Exibindo <strong className="text-gray-700">{produtosFiltrados.length}</strong> de{' '}
          <strong className="text-gray-700">{produtos.length}</strong> registros
        </span>
        <div className="flex items-center gap-1.5 text-gray-400">
          <RefreshCw size={11} />
          <span>Atualizado: 16/03/2026 10:00</span>
        </div>
      </div>

      {/* Tabela */}
      <div className="kpi-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: '#003770' }}>
                <th
                  className="text-left py-3 px-4 text-white/80 font-semibold cursor-pointer hover:text-white select-none"
                  onClick={() => toggleSort('nome')}
                >
                  Produto <SortIcon field="nome" />
                </th>
                <th className="text-left py-3 px-3 text-white/80 font-semibold hidden md:table-cell">Categoria</th>
                <th className="text-center py-3 px-3 text-white/80 font-semibold">Estado</th>
                <th
                  className="text-right py-3 px-4 text-white/80 font-semibold cursor-pointer hover:text-white select-none"
                  onClick={() => toggleSort('precoAtual')}
                >
                  Preço Atual <SortIcon field="precoAtual" />
                </th>
                <th
                  className="text-right py-3 px-3 text-white/80 font-semibold cursor-pointer hover:text-white select-none"
                  onClick={() => toggleSort('variacaoDiaria')}
                >
                  Diária <SortIcon field="variacaoDiaria" />
                </th>
                <th
                  className="text-right py-3 px-3 text-white/80 font-semibold cursor-pointer hover:text-white select-none"
                  onClick={() => toggleSort('variacaoMensal')}
                >
                  Mensal <SortIcon field="variacaoMensal" />
                </th>
                <th
                  className="text-right py-3 px-3 text-white/80 font-semibold cursor-pointer hover:text-white select-none hidden sm:table-cell"
                  onClick={() => toggleSort('variacaoTrimestral')}
                >
                  Trimestral <SortIcon field="variacaoTrimestral" />
                </th>
                <th className="text-center py-3 px-3 text-white/80 font-semibold">Risco</th>
                <th className="text-left py-3 px-3 text-white/80 font-semibold hidden lg:table-cell">Fonte</th>
              </tr>
            </thead>
            <tbody>
              {produtosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-gray-400">
                    Nenhum produto encontrado com os filtros selecionados.
                  </td>
                </tr>
              ) : (
                produtosFiltrados.map((produto, idx) => (
                  <tr
                    key={produto.id}
                    className="border-b border-border/50 hover:bg-gray-50 transition-colors animate-slide-in"
                    style={{ animationDelay: `${idx * 30}ms` }}
                  >
                    <td className="py-3 px-4">
                      <div className="font-semibold text-gray-800">{produto.nome}</div>
                      <div className="text-gray-400 text-xs mt-0.5">{produto.unidade}</div>
                    </td>
                    <td className="py-3 px-3 text-gray-500 hidden md:table-cell">{produto.categoria}</td>
                    <td className="py-3 px-3 text-center">
                      <span
                        className="px-2 py-0.5 rounded text-xs font-bold"
                        style={{
                          background: produto.estado === 'RS' ? '#EFF6FF' : produto.estado === 'SC' ? '#F5F3FF' : '#F0FDF4',
                          color: produto.estado === 'RS' ? '#1D4ED8' : produto.estado === 'SC' ? '#7C3AED' : '#15803D',
                        }}
                      >
                        {produto.estado}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono-data font-semibold text-gray-800">
                      {formatBRL(produto.precoAtual)}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <VarBadge valor={produto.variacaoDiaria} />
                    </td>
                    <td className="py-3 px-3 text-right">
                      <VarBadge valor={produto.variacaoMensal} />
                    </td>
                    <td className="py-3 px-3 text-right hidden sm:table-cell">
                      <VarBadge valor={produto.variacaoTrimestral} />
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{
                          background: RISK_BG[produto.nivelRisco],
                          color: RISK_COLORS[produto.nivelRisco],
                          border: `1px solid ${RISK_COLORS[produto.nivelRisco]}40`,
                        }}
                      >
                        {RISK_LABELS[produto.nivelRisco]}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-gray-400 hidden lg:table-cell">{produto.fonte}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
