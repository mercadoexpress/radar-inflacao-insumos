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
  // Proteínas
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
    ultimaAtualizacao: '2026-03-16',
  },
  {
    id: 'carne-bovina-pr',
    nome: 'Carne Bovina (Traseiro)',
    categoria: 'Proteínas',
    unidade: 'kg',
    precoAtual: 31.40,
    precoAnterior: 29.80,
    variacaoDiaria: 0.5,
    variacaoMensal: 5.4,
    variacaoTrimestral: 10.1,
    tendencia: 'alta',
    nivelRisco: 'alto',
    probabilidadeAumento: 78,
    volatilidade: 62,
    estado: 'PR',
    fonte: 'CEASA-PR',
    ultimaAtualizacao: '2026-03-16',
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
    ultimaAtualizacao: '2026-03-16',
  },
  {
    id: 'frango-sc',
    nome: 'Frango Inteiro',
    categoria: 'Proteínas',
    unidade: 'kg',
    precoAtual: 8.75,
    precoAnterior: 8.60,
    variacaoDiaria: 0.2,
    variacaoMensal: 1.7,
    variacaoTrimestral: 4.2,
    tendencia: 'estavel',
    nivelRisco: 'baixo',
    probabilidadeAumento: 35,
    volatilidade: 28,
    estado: 'SC',
    fonte: 'CEASA-SC',
    ultimaAtualizacao: '2026-03-16',
  },
  {
    id: 'carne-suina-pr',
    nome: 'Carne Suína (Pernil)',
    categoria: 'Proteínas',
    unidade: 'kg',
    precoAtual: 14.60,
    precoAnterior: 15.20,
    variacaoDiaria: -0.4,
    variacaoMensal: -3.9,
    variacaoTrimestral: 2.1,
    tendencia: 'queda',
    nivelRisco: 'baixo',
    probabilidadeAumento: 22,
    volatilidade: 35,
    estado: 'PR',
    fonte: 'CEASA-PR',
    ultimaAtualizacao: '2026-03-16',
  },
  // Grãos e Secos
  {
    id: 'arroz-rs',
    nome: 'Arroz Branco (Tipo 1)',
    categoria: 'Grãos e Secos',
    unidade: 'kg',
    precoAtual: 4.85,
    precoAnterior: 4.40,
    variacaoDiaria: 0.6,
    variacaoMensal: 10.2,
    variacaoTrimestral: 18.5,
    tendencia: 'alta',
    nivelRisco: 'alto',
    probabilidadeAumento: 88,
    volatilidade: 72,
    estado: 'RS',
    fonte: 'CEPEA',
    ultimaAtualizacao: '2026-03-16',
  },
  {
    id: 'feijao-pr',
    nome: 'Feijão Carioca',
    categoria: 'Grãos e Secos',
    unidade: 'kg',
    precoAtual: 7.30,
    precoAnterior: 6.80,
    variacaoDiaria: 0.7,
    variacaoMensal: 7.4,
    variacaoTrimestral: 14.2,
    tendencia: 'alta',
    nivelRisco: 'alto',
    probabilidadeAumento: 80,
    volatilidade: 65,
    estado: 'PR',
    fonte: 'CEASA-PR',
    ultimaAtualizacao: '2026-03-16',
  },
  {
    id: 'massa-sc',
    nome: 'Macarrão Espaguete',
    categoria: 'Grãos e Secos',
    unidade: 'kg',
    precoAtual: 5.20,
    precoAnterior: 5.10,
    variacaoDiaria: 0.1,
    variacaoMensal: 2.0,
    variacaoTrimestral: 3.8,
    tendencia: 'estavel',
    nivelRisco: 'baixo',
    probabilidadeAumento: 30,
    volatilidade: 22,
    estado: 'SC',
    fonte: 'CEASA-SC',
    ultimaAtualizacao: '2026-03-16',
  },
  // Outros Insumos
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
    fonte: 'CEPEA',
    ultimaAtualizacao: '2026-03-16',
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
    ultimaAtualizacao: '2026-03-16',
  },
  {
    id: 'acucar-sc',
    nome: 'Açúcar Cristal',
    categoria: 'Outros Insumos',
    unidade: 'kg',
    precoAtual: 3.45,
    precoAnterior: 3.30,
    variacaoDiaria: 0.3,
    variacaoMensal: 4.5,
    variacaoTrimestral: 8.2,
    tendencia: 'alta',
    nivelRisco: 'moderado',
    probabilidadeAumento: 60,
    volatilidade: 48,
    estado: 'SC',
    fonte: 'CEASA-SC',
    ultimaAtualizacao: '2026-03-16',
  },
];

// ─── HISTÓRICO DE PREÇOS (18 meses) ──────────────────────────────────────────

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

  // Calcular médias móveis
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
  'arroz-rs': gerarHistorico(3.8, 18, 1.8, 1.2),
  'feijao-pr': gerarHistorico(5.8, 18, 1.5, 1.0),
  'oleo-soja-pr': gerarHistorico(6.5, 18, 2.2, 1.5),
  'cafe-rs': gerarHistorico(35.0, 18, 2.8, 2.0),
  'acucar-sc': gerarHistorico(3.0, 18, 0.8, 0.6),
  'carne-suina-pr': gerarHistorico(15.5, 18, -0.2, 0.7),
  'massa-sc': gerarHistorico(4.9, 18, 0.4, 0.3),
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
  { produto: 'Óleo de Soja', precoAtual: 8.90, previsao3m: 10.20, previsao6m: 11.40, variacaoEsperada3m: 14.6, variacaoEsperada6m: 28.1, confianca: 72 },
  { produto: 'Arroz Branco (Tipo 1)', precoAtual: 4.85, previsao3m: 5.40, previsao6m: 5.90, variacaoEsperada3m: 11.3, variacaoEsperada6m: 21.6, confianca: 80 },
  { produto: 'Feijão Carioca', precoAtual: 7.30, previsao3m: 8.10, previsao6m: 8.80, variacaoEsperada3m: 11.0, variacaoEsperada6m: 20.5, confianca: 68 },
  { produto: 'Carne Bovina (Traseiro)', precoAtual: 32.80, previsao3m: 35.60, previsao6m: 37.90, variacaoEsperada3m: 8.5, variacaoEsperada6m: 15.5, confianca: 65 },
  { produto: 'Açúcar Cristal', precoAtual: 3.45, previsao3m: 3.70, previsao6m: 3.90, variacaoEsperada3m: 7.2, variacaoEsperada6m: 13.0, confianca: 70 },
  { produto: 'Frango Inteiro', precoAtual: 9.20, previsao3m: 9.60, previsao6m: 9.90, variacaoEsperada3m: 4.3, variacaoEsperada6m: 7.6, confianca: 75 },
  { produto: 'Macarrão Espaguete', precoAtual: 5.20, previsao3m: 5.35, previsao6m: 5.50, variacaoEsperada3m: 2.9, variacaoEsperada6m: 5.8, confianca: 82 },
  { produto: 'Carne Suína (Pernil)', precoAtual: 14.60, previsao3m: 14.20, previsao6m: 14.80, variacaoEsperada3m: -2.7, variacaoEsperada6m: 1.4, confianca: 60 },
];

// ─── ÍNDICES ECONÔMICOS ───────────────────────────────────────────────────────

export const indices: IndiceEconomico[] = [
  {
    nome: 'IPCA Alimentação — Rio Grande do Sul',
    sigla: 'IPCA-RS',
    valorAtual: 8.42,
    variacaoMensal: 0.68,
    variacaoAcumulada12m: 8.42,
    periodo: 'Fev/2026',
  },
  {
    nome: 'IPCA Alimentação — Santa Catarina',
    sigla: 'IPCA-SC',
    valorAtual: 7.85,
    variacaoMensal: 0.55,
    variacaoAcumulada12m: 7.85,
    periodo: 'Fev/2026',
  },
  {
    nome: 'IPCA Alimentação — Paraná',
    sigla: 'IPCA-PR',
    valorAtual: 8.10,
    variacaoMensal: 0.62,
    variacaoAcumulada12m: 8.10,
    periodo: 'Fev/2026',
  },
  {
    nome: 'IGP-M (FGV)',
    sigla: 'IGP-M',
    valorAtual: 6.28,
    variacaoMensal: 0.48,
    variacaoAcumulada12m: 6.28,
    periodo: 'Fev/2026',
  },
  {
    nome: 'FIPE Alimentação',
    sigla: 'FIPE-Alim',
    valorAtual: 9.14,
    variacaoMensal: 0.72,
    variacaoAcumulada12m: 9.14,
    periodo: 'Fev/2026',
  },
];

// ─── ALERTAS ──────────────────────────────────────────────────────────────────

export const alertas: AlertaInflacao[] = [
  {
    id: 'alerta-cafe',
    produto: 'Café Torrado e Moído',
    categoria: 'Outros Insumos',
    tipo: 'variacao_acima_indice',
    descricao: 'Variação mensal de 18,6% — mais que o dobro do IPCA Alimentação regional (8,4%). Tendência de alta sustentada por quebra de safra no Brasil e demanda internacional crescente.',
    percentualVariacao: 18.6,
    tendenciaProjetada: 30.7,
    nivelRisco: 'alto',
    dataAlerta: '2026-03-16',
    ativo: true,
  },
  {
    id: 'alerta-oleo',
    produto: 'Óleo de Soja',
    categoria: 'Outros Insumos',
    tipo: 'aceleracao',
    descricao: 'Aceleração de preços: +14,1% no mês e +22,8% no trimestre. Alta correlação com cotação da soja no mercado internacional (CBOT) e câmbio desfavorável.',
    percentualVariacao: 14.1,
    tendenciaProjetada: 28.1,
    nivelRisco: 'alto',
    dataAlerta: '2026-03-16',
    ativo: true,
  },
  {
    id: 'alerta-arroz',
    produto: 'Arroz Branco (Tipo 1)',
    categoria: 'Grãos e Secos',
    tipo: 'tendencia_alta',
    descricao: 'Tendência de alta persistente: +18,5% no trimestre. Estoque nacional abaixo da média histórica e entressafra no RS impulsionam preços.',
    percentualVariacao: 10.2,
    tendenciaProjetada: 21.6,
    nivelRisco: 'alto',
    dataAlerta: '2026-03-16',
    ativo: true,
  },
  {
    id: 'alerta-feijao',
    produto: 'Feijão Carioca',
    categoria: 'Grãos e Secos',
    tipo: 'volatilidade_alta',
    descricao: 'Alta volatilidade detectada: variação de +14,2% no trimestre com oscilações diárias acima de 0,7%. Período de entressafra com oferta reduzida no Sul.',
    percentualVariacao: 7.4,
    tendenciaProjetada: 20.5,
    nivelRisco: 'alto',
    dataAlerta: '2026-03-15',
    ativo: true,
  },
  {
    id: 'alerta-carne',
    produto: 'Carne Bovina (Traseiro)',
    categoria: 'Proteínas',
    tipo: 'tendencia_alta',
    descricao: 'Alta de 12,3% no trimestre. Aumento das exportações reduz oferta interna. Monitorar negociação com fornecedores para contratos de médio prazo.',
    percentualVariacao: 7.5,
    tendenciaProjetada: 15.5,
    nivelRisco: 'alto',
    dataAlerta: '2026-03-14',
    ativo: true,
  },
];

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
}

export const rankingRisco: ItemRanking[] = [
  { posicao: 1, produto: 'Café Torrado e Moído', categoria: 'Outros Insumos', nivelRisco: 'alto', scoreRisco: 93, probabilidadeAumento: 93, volatilidade: 85, variacaoTrimestral: 28.4, impactoCusto: 'medio' },
  { posicao: 2, produto: 'Óleo de Soja', categoria: 'Outros Insumos', nivelRisco: 'alto', scoreRisco: 91, probabilidadeAumento: 91, volatilidade: 78, variacaoTrimestral: 22.8, impactoCusto: 'alto' },
  { posicao: 3, produto: 'Arroz Branco (Tipo 1)', categoria: 'Grãos e Secos', nivelRisco: 'alto', scoreRisco: 88, probabilidadeAumento: 88, volatilidade: 72, variacaoTrimestral: 18.5, impactoCusto: 'alto' },
  { posicao: 4, produto: 'Feijão Carioca', categoria: 'Grãos e Secos', nivelRisco: 'alto', scoreRisco: 80, probabilidadeAumento: 80, volatilidade: 65, variacaoTrimestral: 14.2, impactoCusto: 'alto' },
  { posicao: 5, produto: 'Carne Bovina (Traseiro)', categoria: 'Proteínas', nivelRisco: 'alto', scoreRisco: 78, probabilidadeAumento: 78, volatilidade: 62, variacaoTrimestral: 12.3, impactoCusto: 'alto' },
  { posicao: 6, produto: 'Açúcar Cristal', categoria: 'Outros Insumos', nivelRisco: 'moderado', scoreRisco: 60, probabilidadeAumento: 60, volatilidade: 48, variacaoTrimestral: 8.2, impactoCusto: 'medio' },
  { posicao: 7, produto: 'Frango Inteiro', categoria: 'Proteínas', nivelRisco: 'moderado', scoreRisco: 55, probabilidadeAumento: 55, volatilidade: 42, variacaoTrimestral: 5.7, impactoCusto: 'alto' },
  { posicao: 8, produto: 'Macarrão Espaguete', categoria: 'Grãos e Secos', nivelRisco: 'baixo', scoreRisco: 30, probabilidadeAumento: 30, volatilidade: 22, variacaoTrimestral: 3.8, impactoCusto: 'medio' },
  { posicao: 9, produto: 'Carne Suína (Pernil)', categoria: 'Proteínas', nivelRisco: 'baixo', scoreRisco: 22, probabilidadeAumento: 22, volatilidade: 35, variacaoTrimestral: 2.1, impactoCusto: 'medio' },
];

// ─── RESUMO EXECUTIVO ─────────────────────────────────────────────────────────

export const resumoExecutivo = {
  totalProdutosMonitorados: 9,
  produtosEmAlerta: 5,
  variacaoMediaMensal: 7.8,
  variacaoMediaTrimestral: 13.2,
  ipca_alimentacao_media_sul: 8.12,
  impactoCustoRefeicao: 11.4, // % estimado de aumento no custo da refeição
  ultimaAtualizacao: '2026-03-16T10:00:00',
  proximaAtualizacao: '2026-03-17T06:00:00',
};
