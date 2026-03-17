/**
 * Dados simulados para o Radar Express de Inflação de Insumos
 * Baseado em variações reais de mercado para o setor de alimentação corporativa
 * Regiões: RS, SC, PR | Período: Jan/2024 – Mar/2026
 */

export type NivelRisco = 'alto' | 'moderado' | 'baixo';
export type Tendencia = 'alta' | 'queda' | 'estavel';
export type Categoria = 'Proteínas' | 'Hortifruti' | 'Grãos e Secos' | 'Outros Insumos' | 'Suprimentos';
export type Estado = 'RS' | 'SC' | 'PR';

export interface ProdutoMonitorado {
  id: string;
  nome: string;
  categoria: Categoria;
  unidade: string;
  precoAtual: number;
  precoAnterior: number;
  variacaoDiaria: number;
  variacaoMensal: number;
  variacaoTrimestral: number;
  tendencia: Tendencia;
  nivelRisco: NivelRisco;
  probabilidadeAumento: number; // 0-100
  volatilidade: number; // 0-100
  estado: Estado;
  fonte: string;
  ultimaAtualizacao: string;
}

export interface HistoricoPreco {
  data: string;
  preco: number;
  mediaMovel7d?: number;
  mediaMovel30d?: number;
}

export interface IndiceEconomico {
  nome: string;
  sigla: string;
  valorAtual: number;
  variacaoMensal: number;
  variacaoAcumulada12m: number;
  periodo: string;
}

export interface AlertaInflacao {
  id: string;
  produto: string;
  categoria: Categoria;
  tipo: 'aceleracao' | 'tendencia_alta' | 'variacao_acima_indice' | 'volatilidade_alta';
  descricao: string;
  percentualVariacao: number;
  tendenciaProjetada: number;
  nivelRisco: NivelRisco;
  dataAlerta: string;
  ativo: boolean;
}

// ─── PRODUTOS MONITORADOS (15 PRODUTOS) ───────────────────────────────────────

export const produtos: ProdutoMonitorado[] = [
  {
    id: 'carne-bovina-rs',
    nome: 'Carne Bovina (Traseiro)',
    categoria: 'Proteínas',
    unidade: 'kg',
    precoAtual: 32.80,
    precoAnterior: 30.50,
    variacaoDiaria: 0.8,
    variacaoMensal: 7.5,
    variacaoTrimestral: 12.3,
    tendencia: 'alta',
    nivelRisco: 'alto',
    probabilidadeAumento: 82,
    volatilidade: 68,
    estado: 'RS',
    fonte: 'CEPEA',
    ultimaAtualizacao: '2026-03-17T12:03:26',
  },
  {
    id: 'frango-rs',
    nome: 'Frango Inteiro',
    categoria: 'Proteínas',
    unidade: 'kg',
    precoAtual: 9.20,
    precoAnterior: 8.90,
    variacaoDiaria: 0.3,
    variacaoMensal: 3.4,
    variacaoTrimestral: 5.7,
    tendencia: 'alta',
    nivelRisco: 'moderado',
    probabilidadeAumento: 55,
    volatilidade: 42,
    estado: 'RS',
    fonte: 'CEPEA',
    ultimaAtualizacao: '2026-03-17T12:03:26',
  },
  {
    id: 'ovo-rs',
    nome: 'Ovo Branco',
    categoria: 'Proteínas',
    unidade: 'dz',
    precoAtual: 5.60,
    precoAnterior: 5.20,
    variacaoDiaria: 0.5,
    variacaoMensal: 7.7,
    variacaoTrimestral: 10.2,
    tendencia: 'alta',
    nivelRisco: 'alto',
    probabilidadeAumento: 75,
    volatilidade: 50,
    estado: 'RS',
    fonte: 'CEPEA',
    ultimaAtualizacao: '2026-03-17T12:03:26',
  },
  {
    id: 'leite-rs',
    nome: 'Leite Longa Vida',
    categoria: 'Proteínas',
    unidade: 'L',
    precoAtual: 5.80,
    precoAnterior: 5.40,
    variacaoDiaria: 0.2,
    variacaoMensal: 7.4,
    variacaoTrimestral: 12.1,
    tendencia: 'alta',
    nivelRisco: 'alto',
    probabilidadeAumento: 80,
    volatilidade: 45,
    estado: 'RS',
    fonte: 'CEPEA',
    ultimaAtualizacao: '2026-03-17T12:03:26',
  },
  {
    id: 'arroz-rs',
    nome: 'Arroz Parboilizado',
    categoria: 'Grãos e Secos',
    unidade: 'kg',
    precoAtual: 6.20,
    precoAnterior: 5.80,
    variacaoDiaria: 0.4,
    variacaoMensal: 6.9,
    variacaoTrimestral: 15.5,
    tendencia: 'alta',
    nivelRisco: 'alto',
    probabilidadeAumento: 85,
    volatilidade: 60,
    estado: 'RS',
    fonte: 'CEPEA',
    ultimaAtualizacao: '2026-03-17T12:03:26',
  },
  {
    id: 'feijao-preto-rs',
    nome: 'Feijão Preto',
    categoria: 'Grãos e Secos',
    unidade: 'kg',
    precoAtual: 8.50,
    precoAnterior: 7.38,
    variacaoDiaria: 0.9,
    variacaoMensal: 15.2,
    variacaoTrimestral: 22.4,
    tendencia: 'alta',
    nivelRisco: 'alto',
    probabilidadeAumento: 90,
    volatilidade: 75,
    estado: 'RS',
    fonte: 'CEPEA',
    ultimaAtualizacao: '2026-03-17T12:03:26',
  },
  {
    id: 'milho-rs',
    nome: 'Milho',
    categoria: 'Grãos e Secos',
    unidade: 'kg',
    precoAtual: 1.17,
    precoAnterior: 1.05,
    variacaoDiaria: 0.3,
    variacaoMensal: 11.4,
    variacaoTrimestral: 18.2,
    tendencia: 'alta',
    nivelRisco: 'alto',
    probabilidadeAumento: 88,
    volatilidade: 65,
    estado: 'RS',
    fonte: 'CEPEA',
    ultimaAtualizacao: '2026-03-17T12:03:26',
  },
  {
    id: 'trigo-rs',
    nome: 'Trigo em Grão',
    categoria: 'Grãos e Secos',
    unidade: 'kg',
    precoAtual: 1.50,
    precoAnterior: 1.42,
    variacaoDiaria: 0.1,
    variacaoMensal: 5.6,
    variacaoTrimestral: 8.9,
    tendencia: 'alta',
    nivelRisco: 'moderado',
    probabilidadeAumento: 65,
    volatilidade: 40,
    estado: 'RS',
    fonte: 'CEPEA',
    ultimaAtualizacao: '2026-03-17T12:03:26',
  },
  {
    id: 'batata-rs',
    nome: 'Batata Inglesa',
    categoria: 'Hortifruti',
    unidade: 'kg',
    precoAtual: 5.50,
    precoAnterior: 4.80,
    variacaoDiaria: 1.2,
    variacaoMensal: 14.6,
    variacaoTrimestral: 25.4,
    tendencia: 'alta',
    nivelRisco: 'alto',
    probabilidadeAumento: 85,
    volatilidade: 80,
    estado: 'RS',
    fonte: 'CEASA-RS',
    ultimaAtualizacao: '2026-03-17T12:03:26',
  },
  {
    id: 'tomate-rs',
    nome: 'Tomate Saladete',
    categoria: 'Hortifruti',
    unidade: 'kg',
    precoAtual: 7.80,
    precoAnterior: 6.50,
    variacaoDiaria: 2.1,
    variacaoMensal: 20.0,
    variacaoTrimestral: 35.2,
    tendencia: 'alta',
    nivelRisco: 'alto',
    probabilidadeAumento: 92,
    volatilidade: 90,
    estado: 'RS',
    fonte: 'CEASA-RS',
    ultimaAtualizacao: '2026-03-17T12:03:26',
  },
  {
    id: 'cebola-rs',
    nome: 'Cebola Nacional',
    categoria: 'Hortifruti',
    unidade: 'kg',
    precoAtual: 4.20,
    precoAnterior: 3.90,
    variacaoDiaria: 0.5,
    variacaoMensal: 7.7,
    variacaoTrimestral: 12.3,
    tendencia: 'alta',
    nivelRisco: 'moderado',
    probabilidadeAumento: 60,
    volatilidade: 55,
    estado: 'RS',
    fonte: 'CEASA-RS',
    ultimaAtualizacao: '2026-03-17T12:03:26',
  },
  {
    id: 'banana-rs',
    nome: 'Banana Caturra',
    categoria: 'Hortifruti',
    unidade: 'kg',
    precoAtual: 4.50,
    precoAnterior: 4.20,
    variacaoDiaria: 0.3,
    variacaoMensal: 7.1,
    variacaoTrimestral: 10.5,
    tendencia: 'alta',
    nivelRisco: 'moderado',
    probabilidadeAumento: 55,
    volatilidade: 45,
    estado: 'RS',
    fonte: 'CEASA-RS',
    ultimaAtualizacao: '2026-03-17T12:03:26',
  },
  {
    id: 'laranja-rs',
    nome: 'Laranja Pera',
    categoria: 'Hortifruti',
    unidade: 'kg',
    precoAtual: 3.80,
    precoAnterior: 3.60,
    variacaoDiaria: 0.2,
    variacaoMensal: 5.6,
    variacaoTrimestral: 8.2,
    tendencia: 'estavel',
    nivelRisco: 'baixo',
    probabilidadeAumento: 40,
    volatilidade: 35,
    estado: 'RS',
    fonte: 'CEASA-RS',
    ultimaAtualizacao: '2026-03-17T12:03:26',
  },
  {
    id: 'oleo-soja-pr',
    nome: 'Oléo de soja',
    categoria: 'Outros Insumos',
    unidade: 'L',
    precoAtual: 8.90,
    precoAnterior: 7.80,
    variacaoDiaria: 1.2,
    variacaoMensal: 14.1,
    variacaoTrimestral: 22.8,
    tendencia: 'alta',
    nivelRisco: 'alto',
    probabilidadeAumento: 91,
    volatilidade: 78,
    estado: 'PR',
    fonte: 'CEPEA/Esalq',
    ultimaAtualizacao: '2026-03-17T12:03:26',
  },
  {
    id: 'cafe-rs',
    nome: 'Café Torrado e Moído',
    categoria: 'Outros Insumos',
    unidade: 'kg',
    precoAtual: 52.40,
    precoAnterior: 44.20,
    variacaoDiaria: 1.8,
    variacaoMensal: 18.6,
    variacaoTrimestral: 28.4,
    tendencia: 'alta',
    nivelRisco: 'alto',
    probabilidadeAumento: 93,
    volatilidade: 85,
    estado: 'RS',
    fonte: 'CEPEA',
    ultimaAtualizacao: '2026-03-17T12:03:26',
  },
];

// ─── HISTÓRICO DE PREÇOS ─────────────────────────────────────────────────────

function gerarHistorico(
  precoBase: number,
  meses: number,
  tendencia: number,
  volatilidade: number
): HistoricoPreco[] {
  const historico: HistoricoPreco[] = [];
  let preco = precoBase * (1 - (tendencia * meses) / 100);
  const dataBase = new Date('2024-09-01');

  for (let i = 0; i < meses * 30; i += 7) {
    const data = new Date(dataBase.getTime() + i * 24 * 60 * 60 * 1000);
    const variacao = (Math.random() - 0.45) * volatilidade * 0.02;
    preco = preco * (1 + tendencia / 100 / 52 + variacao);
    historico.push({
      data: data.toISOString().split('T')[0],
      preco: Math.round(preco * 100) / 100,
    });
  }

  for (let i = 0; i < historico.length; i++) {
    if (i >= 1) {
      const slice7 = historico.slice(Math.max(0, i - 1), i + 1);
      historico[i].mediaMovel7d =
        Math.round((slice7.reduce((s, h) => s + h.preco, 0) / slice7.length) * 100) / 100;
    }
    if (i >= 4) {
      const slice30 = historico.slice(Math.max(0, i - 4), i + 1);
      historico[i].mediaMovel30d =
        Math.round((slice30.reduce((s, h) => s + h.preco, 0) / slice30.length) * 100) / 100;
    }
  }

  return historico;
}

export const historicoPorProduto: Record<string, HistoricoPreco[]> = {
  'carne-bovina-rs': gerarHistorico(28.0, 18, 1.2, 0.8),
  'frango-rs': gerarHistorico(8.2, 18, 0.5, 0.5),
  'arroz-rs': gerarHistorico(4.8, 18, 1.8, 1.2),
  'feijao-preto-rs': gerarHistorico(6.5, 18, 2.5, 1.5),
  'oleo-soja-pr': gerarHistorico(6.5, 18, 2.2, 1.5),
  'cafe-rs': gerarHistorico(35.0, 18, 2.8, 2.0),
  'batata-rs': gerarHistorico(4.0, 18, 2.0, 3.0),
  'tomate-rs': gerarHistorico(5.0, 18, 3.0, 4.0),
};

// ─── PREVISÃO DE PREÇOS ───────────────────────────────────────────────────────

export interface PrevisaoPreco {
  produto: string;
  precoAtual: number;
  previsao3m: number;
  previsao6m: number;
  variacaoEsperada3m: number;
  variacaoEsperada6m: number;
  confianca: number; // 0-100
}

export const previsoes: PrevisaoPreco[] = [
  { produto: 'Café Torrado e Moído', precoAtual: 52.40, previsao3m: 61.20, previsao6m: 68.50, variacaoEsperada3m: 16.8, variacaoEsperada6m: 30.7, confianca: 78 },
  { produto: 'Oléo de soja', precoAtual: 8.90, previsao3m: 10.20, previsao6m: 11.40, variacaoEsperada3m: 14.6, variacaoEsperada6m: 28.1, confianca: 72 },
  { produto: 'Feijão Preto', precoAtual: 8.50, previsao3m: 9.80, previsao6m: 10.50, variacaoEsperada3m: 15.3, variacaoEsperada6m: 23.5, confianca: 82 },
  { produto: 'Arroz Parboilizado', precoAtual: 6.20, previsao3m: 6.80, previsao6m: 7.30, variacaoEsperada3m: 9.7, variacaoEsperada6m: 17.7, confianca: 85 },
  { produto: 'Tomate Saladete', precoAtual: 7.80, previsao3m: 9.50, previsao6m: 8.20, variacaoEsperada3m: 21.8, variacaoEsperada6m: 5.1, confianca: 60 },
  { produto: 'Batata Inglesa', precoAtual: 5.50, previsao3m: 6.40, previsao6m: 5.90, variacaoEsperada3m: 16.4, variacaoEsperada6m: 7.3, confianca: 65 },
];

// ─── ÍNDICES ECONÔMICOS ───────────────────────────────────────────────────────

export const indices: IndiceEconomico[] = [
  {
    nome: 'IPCA Alimentação — Porto Alegre',
    sigla: 'IPCA-POA',
    valorAtual: 8.42,
    variacaoMensal: 0.68,
    variacaoAcumulada12m: 8.42,
    periodo: 'Fev/2026',
  },
  {
    nome: 'IPCA Alimentação — Florianópolis',
    sigla: 'IPCA-FLN',
    valorAtual: 7.85,
    variacaoMensal: 0.55,
    variacaoAcumulada12m: 7.85,
    periodo: 'Fev/2026',
  },
  {
    nome: 'IPCA Alimentação — Curitiba',
    sigla: 'IPCA-CWB',
    valorAtual: 8.10,
    variacaoMensal: 0.62,
    variacaoAcumulada12m: 8.10,
    periodo: 'Fev/2026',
  },
  {
    nome: 'IGP-M (FGV)',
    sigla: 'IGP-M',
    valorAtual: 4.50,
    variacaoMensal: 0.45,
    variacaoAcumulada12m: 4.50,
    periodo: 'Fev/2026',
  },
  {
    nome: 'FIPE Alimentação',
    sigla: 'FIPE-Alim',
    valorAtual: 7.20,
    variacaoMensal: 0.72,
    variacaoAcumulada12m: 7.20,
    periodo: 'Fev/2026',
  },
];

// ─── ALERTAS ──────────────────────────────────────────────────────────────────

export const alertas: AlertaInflacao[] = produtos.map(p => {
  let tipo: AlertaInflacao['tipo'] = 'tendencia_alta';
  let descricao = '';
  
  if (p.variacaoMensal > 15) {
    tipo = 'aceleracao';
    descricao = `Aceleração crítica de preços: ${p.variacaoMensal.toFixed(1)}% no mês. Oferta extremamente restrita no mercado regional.`;
  } else if (p.variacaoMensal > 8) {
    tipo = 'variacao_acima_indice';
    descricao = `Variação de ${p.variacaoMensal.toFixed(1)}% no mês, superando significativamente os índices de inflação média.`;
  } else if (p.volatilidade > 70) {
    tipo = 'volatilidade_alta';
    descricao = `Alta volatilidade detectada (${p.volatilidade}%). Preços instáveis devido a fatores climáticos ou sazonais.`;
  } else {
    descricao = `Tendência de alta sustentada de ${p.variacaoMensal.toFixed(1)}% no mês. Monitoramento preventivo recomendado.`;
  }

  return {
    id: `alerta-${p.id}`,
    produto: p.nome,
    categoria: p.categoria,
    tipo,
    descricao,
    percentualVariacao: p.variacaoMensal,
    tendenciaProjetada: p.variacaoTrimestral * 1.5,
    nivelRisco: p.nivelRisco,
    dataAlerta: '2026-03-16',
    ativo: p.nivelRisco !== 'baixo',
  };
});

// ─── RANKING DE RISCO ─────────────────────────────────────────────────────────

export interface ItemRanking {
  posicao: number;
  produto: string;
  categoria: Categoria;
  nivelRisco: NivelRisco;
  scoreRisco: number; // 0-100
  probabilidadeAumento: number;
  volatilidade: number;
  variacaoTrimestral: number;
  impactoCusto: 'alto' | 'medio' | 'baixo'; // impacto no custo da refeição
  precoAtual: number;
  unidade: string;
  fonte: string;
}

export const rankingRisco: ItemRanking[] = produtos
  .map(p => ({
    produto: p.nome,
    categoria: p.categoria,
    nivelRisco: p.nivelRisco,
    scoreRisco: Math.round((p.probabilidadeAumento * 0.4) + (p.volatilidade * 0.3) + (Math.min(100, p.variacaoTrimestral * 3) * 0.3)),
    probabilidadeAumento: p.probabilidadeAumento,
    volatilidade: p.volatilidade,
    variacaoTrimestral: p.variacaoTrimestral,
    impactoCusto: (p.categoria === 'Proteínas' || p.nome.includes('Arroz') || p.nome.includes('Feijão') || p.nome.includes('Oléo')) ? 'alto' : 'medio' as any,
    precoAtual: p.precoAtual,
    unidade: p.unidade,
    fonte: p.fonte
  }))
  .sort((a, b) => b.scoreRisco - a.scoreRisco)
  .map((item, idx) => ({ ...item, posicao: idx + 1 }));

// ─── RESUMO EXECUTIVO ─────────────────────────────────────────────────────────

export const resumoExecutivo = {
  totalProdutosMonitorados: produtos.length,
  produtosEmAlerta: alertas.filter(a => a.ativo).length,
  variacaoMediaMensal: Math.round((produtos.reduce((acc, p) => acc + p.variacaoMensal, 0) / produtos.length) * 10) / 10,
  variacaoMediaTrimestral: Math.round((produtos.reduce((acc, p) => acc + p.variacaoTrimestral, 0) / produtos.length) * 10) / 10,
  ipca_alimentacao_media_sul: 8.12,
  impactoCustoRefeicao: 12.5,
  ultimaAtualizacao: '2026-03-17T12:03:26',
  proximaAtualizacao: '2026-03-18T06:00:00',
};
