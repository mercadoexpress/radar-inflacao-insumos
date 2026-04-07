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

// ─── PRODUTOS MONITORADOS ─────────────────────────────────────────────────────

export const produtos: ProdutoMonitorado[] = [
  {
    id: 'arroz-parboilizado-rs',
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
    ultimaAtualizacao: '2026-04-07T09:50:50',
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
    ultimaAtualizacao: '2026-04-07T09:50:50',
  },
  {
    id: 'oleo-soja-pr',
    nome: 'Óleo de Soja',
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
    ultimaAtualizacao: '2026-04-07T09:50:50',
  },
  {
    id: 'carne-bovina-traseira-rs',
    nome: 'Carne Bovina Traseira',
    categoria: 'Proteínas',
    unidade: 'kg',
    precoAtual: 34.50,
    precoAnterior: 32.10,
    variacaoDiaria: 0.7,
    variacaoMensal: 7.4,
    variacaoTrimestral: 11.2,
    tendencia: 'alta',
    nivelRisco: 'alto',
    probabilidadeAumento: 80,
    volatilidade: 65,
    estado: 'RS',
    fonte: 'CEPEA',
    ultimaAtualizacao: '2026-04-07T09:50:50',
  },
  {
    id: 'frango-rs',
    nome: 'Frango',
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
    ultimaAtualizacao: '2026-04-07T09:50:50',
  },
  {
    id: 'carne-suina-sc',
    nome: 'Carne Suína',
    categoria: 'Proteínas',
    unidade: 'kg',
    precoAtual: 14.80,
    precoAnterior: 13.90,
    variacaoDiaria: 0.5,
    variacaoMensal: 6.5,
    variacaoTrimestral: 9.8,
    tendencia: 'alta',
    nivelRisco: 'moderado',
    probabilidadeAumento: 65,
    volatilidade: 50,
    estado: 'SC',
    fonte: 'CEPEA',
    ultimaAtualizacao: '2026-04-07T09:50:50',
  },
  {
    id: 'cafe-rs',
    nome: 'Café',
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
    ultimaAtualizacao: '2026-04-07T09:50:50',
  },
  {
    id: 'acucar-rs',
    nome: 'Açúcar',
    categoria: 'Grãos e Secos',
    unidade: 'kg',
    precoAtual: 4.15,
    precoAnterior: 3.95,
    variacaoDiaria: 0.2,
    variacaoMensal: 5.1,
    variacaoTrimestral: 7.8,
    tendencia: 'estavel',
    nivelRisco: 'baixo',
    probabilidadeAumento: 45,
    volatilidade: 30,
    estado: 'RS',
    fonte: 'CEPEA',
    ultimaAtualizacao: '2026-04-07T09:50:50',
  },
  {
    id: 'macarrao-rs',
    nome: 'Macarrão',
    categoria: 'Grãos e Secos',
    unidade: 'kg',
    precoAtual: 5.80,
    precoAnterior: 5.50,
    variacaoDiaria: 0.1,
    variacaoMensal: 5.4,
    variacaoTrimestral: 8.2,
    tendencia: 'alta',
    nivelRisco: 'baixo',
    probabilidadeAumento: 50,
    volatilidade: 25,
    estado: 'RS',
    fonte: 'IBGE',
    ultimaAtualizacao: '2026-04-07T09:50:50',
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
    ultimaAtualizacao: '2026-04-07T09:50:50',
  },
  {
    id: 'trigo-rs',
    nome: 'Trigo para Farinha (Panificação)',
    categoria: 'Grãos e Secos',
    unidade: 'kg',
    precoAtual: 1.65,
    precoAnterior: 1.52,
    variacaoDiaria: 0.2,
    variacaoMensal: 8.5,
    variacaoTrimestral: 12.4,
    tendencia: 'alta',
    nivelRisco: 'alto',
    probabilidadeAumento: 78,
    volatilidade: 55,
    estado: 'RS',
    fonte: 'CEPEA',
    ultimaAtualizacao: '2026-04-07T09:50:50',
  },
  {
    id: 'ovos-rs',
    nome: 'Ovos',
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
    ultimaAtualizacao: '2026-04-07T09:50:50',
  },
  {
    id: 'leite-rs',
    nome: 'Leite',
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
    ultimaAtualizacao: '2026-04-07T09:50:50',
  },
  {
    id: 'batata-rs',
    nome: 'Batata Inglesa (Hortifruti 1)',
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
    ultimaAtualizacao: '2026-04-07T09:50:50',
  },
  {
    id: 'tomate-rs',
    nome: 'Tomate Saladete (Hortifruti 2)',
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
    ultimaAtualizacao: '2026-04-07T09:50:50',
  },
  {
    id: 'cebola-rs',
    nome: 'Cebola Nacional (Hortifruti 3)',
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
    ultimaAtualizacao: '2026-04-07T09:50:50',
  },
  {
    id: 'banana-rs',
    nome: 'Banana Caturra (Hortifruti 4)',
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
    ultimaAtualizacao: '2026-04-07T09:50:50',
  },
  {
    id: 'laranja-rs',
    nome: 'Laranja Pera (Hortifruti 5)',
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
    ultimaAtualizacao: '2026-04-07T09:50:50',
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
  'arroz-parboilizado-rs': gerarHistorico(4.8, 18, 1.8, 1.2),
  'feijao-preto-rs': gerarHistorico(6.5, 18, 2.5, 1.5),
  'oleo-soja-pr': gerarHistorico(6.5, 18, 2.2, 1.5),
  'carne-bovina-traseira-rs': gerarHistorico(28.0, 18, 1.2, 0.8),
  'frango-rs': gerarHistorico(8.2, 18, 0.5, 0.5),
  'carne-suina-sc': gerarHistorico(12.5, 18, 0.8, 0.6),
  'cafe-rs': gerarHistorico(35.0, 18, 2.8, 2.0),
  'acucar-rs': gerarHistorico(3.5, 18, 0.6, 0.4),
  'macarrao-rs': gerarHistorico(4.8, 18, 0.7, 0.3),
  'milho-rs': gerarHistorico(0.85, 18, 1.5, 1.0),
  'trigo-rs': gerarHistorico(1.2, 18, 1.1, 0.7),
  'ovos-rs': gerarHistorico(4.2, 18, 1.3, 0.9),
  'leite-rs': gerarHistorico(4.5, 18, 1.4, 0.8),
  'batata-rs': gerarHistorico(4.2, 18, 2.2, 1.8),
  'tomate-rs': gerarHistorico(5.5, 18, 2.8, 2.5),
  'cebola-rs': gerarHistorico(3.2, 18, 1.5, 1.2),
  'banana-rs': gerarHistorico(3.5, 18, 1.2, 1.0),
  'laranja-rs': gerarHistorico(3.0, 18, 0.8, 0.6),
};

// ─── ÍNDICES ECONÔMICOS ──────────────────────────────────────────────────────

export const indices: IndiceEconomico[] = [
  {
    nome: 'IPCA (Alimentos e Bebidas)',
    sigla: 'IPCA-AB',
    valorAtual: 0.85,
    variacaoMensal: 0.12,
    variacaoAcumulada12m: 6.24,
    periodo: 'Fev/2026',
  },
  {
    nome: 'IGP-M',
    sigla: 'IGP-M',
    valorAtual: 0.48,
    variacaoMensal: -0.05,
    variacaoAcumulada12m: 4.12,
    periodo: 'Fev/2026',
  },
  {
    nome: 'Índice FIPE (Alimentação)',
    sigla: 'FIPE-AL',
    valorAtual: 0.72,
    variacaoMensal: 0.08,
    variacaoAcumulada12m: 5.85,
    periodo: 'Fev/2026',
  },
];

// ─── ALERTAS DE INFLAÇÃO ─────────────────────────────────────────────────────

export const alertas: AlertaInflacao[] = [
  {
    id: 'alerta-1',
    produto: 'Feijão Preto',
    categoria: 'Grãos e Secos',
    tipo: 'aceleracao',
    descricao: 'Aceleração atípica no preço do feijão preto no RS (+15.2% no mês).',
    percentualVariacao: 15.2,
    tendenciaProjetada: 5.5,
    nivelRisco: 'alto',
    dataAlerta: '2026-03-15',
    ativo: true,
  },
  {
    id: 'alerta-2',
    produto: 'Café',
    categoria: 'Outros Insumos',
    tipo: 'variacao_acima_indice',
    descricao: 'Variação do café 12x acima do IPCA-AB no período.',
    percentualVariacao: 18.6,
    tendenciaProjetada: 8.2,
    nivelRisco: 'alto',
    dataAlerta: '2026-03-10',
    ativo: true,
  },
  {
    id: 'alerta-3',
    produto: 'Tomate Saladete',
    categoria: 'Hortifruti',
    tipo: 'volatilidade_alta',
    descricao: 'Alta volatilidade detectada em hortifruti devido a fatores climáticos.',
    percentualVariacao: 20.0,
    tendenciaProjetada: -12.0,
    nivelRisco: 'alto',
    dataAlerta: '2026-03-17',
    ativo: true,
  },
];

// ─── RANKING DE RISCO ────────────────────────────────────────────────────────

export const rankingRisco = [
  { produto: 'Café', score: 94, tendencia: 'alta' },
  { produto: 'Tomate Saladete', score: 92, tendencia: 'alta' },
  { produto: 'Óleo de Soja', score: 89, tendencia: 'alta' },
  { produto: 'Feijão Preto', score: 88, tendencia: 'alta' },
  { produto: 'Arroz Parboilizado', score: 85, tendencia: 'alta' },
];

// ─── RESUMO EXECUTIVO ────────────────────────────────────────────────────────

export const resumoExecutivo = {
  ultimaAtualizacao: '2026-04-07T09:50:50',
  proximaAtualizacao: '2026-04-08T06:00:00',
  statusMercado: 'Pressão de Alta',
  variacaoMediaMensal: 8.4,
  riscoGeral: 'alto' as NivelRisco,
};

// ─── PREVISÕES ──────────────────────────────────────────────────────────────

export const previsoes = [
  { mes: 'Abr/26', ipca: 0.75, igpm: 0.42 },
  { mes: 'Mai/26', ipca: 0.68, igpm: 0.38 },
  { mes: 'Jun/26', ipca: 0.62, igpm: 0.35 },
  { mes: 'Jul/26', ipca: 0.58, igpm: 0.32 },
  { mes: 'Ago/26', ipca: 0.55, igpm: 0.30 },
  { mes: 'Set/26', ipca: 0.52, igpm: 0.28 },
];
