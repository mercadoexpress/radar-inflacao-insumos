# Guia de Deployment — Radar Express de Inflação de Insumos

## 📋 Configuração do GitHub Pages

Para que o site seja publicado automaticamente no GitHub Pages, siga os passos abaixo:

### 1. Ativar GitHub Pages no Repositório

1. Acesse **Settings** do repositório
2. Navegue até **Pages** (na barra lateral esquerda)
3. Em **Source**, selecione:
   - **Branch:** `gh-pages`
   - **Folder:** `/ (root)`
4. Clique em **Save**

### 2. Configurar Domínio Customizado (Opcional)

Se desejar usar um domínio customizado (ex: `radar-inflacao.mercadoexpress.com.br`):

1. Em **Pages**, adicione o domínio em **Custom domain**
2. Configure os registros DNS do seu domínio:
   - **CNAME:** aponte para `mercadoexpress.github.io`
   - Ou use os registros **A** fornecidos pelo GitHub

### 3. Verificar Workflows

1. Acesse **Actions** no repositório
2. Você verá o workflow `Build e Deploy para GitHub Pages`
3. O workflow será executado automaticamente:
   - **A cada push** na branch `main`
   - **Diariamente às 06:00 BRT** (conforme configurado no cron)
   - **Manualmente** via botão "Run workflow"

## 🔄 Atualização Automática Diária

O workflow `deploy.yml` está configurado para:

1. **Executar diariamente às 06:00 BRT** (UTC-3)
2. **Atualizar os dados** via script Python (`scripts/update_data.py`)
3. **Fazer build** da aplicação React
4. **Publicar** automaticamente no GitHub Pages
5. **Fazer commit** das alterações de dados (se houver)

### Modificar Horário de Atualização

Para alterar o horário, edite `.github/workflows/deploy.yml`:

```yaml
schedule:
  - cron: '0 6 * * *'  # Altere os números conforme necessário
```

**Formato Cron:** `minuto hora dia_do_mês mês dia_da_semana`

Exemplos:
- `0 6 * * *` = 06:00 todos os dias
- `0 9 * * 1-5` = 09:00 segundas a sextas
- `0 */4 * * *` = A cada 4 horas

## 🚀 Acesso ao Site

Após a configuração, o site estará disponível em:

- **GitHub Pages padrão:** `https://mercadoexpress.github.io/radar-inflacao-insumos/`
- **Domínio customizado:** `https://radar-inflacao.mercadoexpress.com.br/`

## 📊 Dados e Atualizações

### Estrutura de Dados

Os dados são armazenados em: `client/src/data/dadosSimulados.ts`

**Campos principais:**
- `produtos`: Array com 15 produtos monitorados
- `indices`: Índices econômicos (IPCA regional, IGP-M, FIPE)
- `alertas`: Alertas automáticos baseados em variações
- `rankingRisco`: Ranking de risco dos produtos

### Integração com APIs Reais

Para integrar dados reais de APIs (CEPEA, IBGE, etc.), modifique:

```python
# scripts/update_data.py
# Adicione chamadas de API aqui
```

## 🔐 Segurança

- O token do GitHub é gerenciado automaticamente pelo GitHub Actions
- Nenhuma credencial é armazenada no repositório
- As alterações são commitadas com o usuário `GitHub Action`

## 📝 Troubleshooting

### O workflow não está executando?

1. Verifique se o branch `gh-pages` foi criado automaticamente
2. Confirme que o workflow está ativado em **Settings > Actions > General**
3. Verifique os logs em **Actions** para erros específicos

### O site não está sendo atualizado?

1. Verifique se o `publish_dir` está correto em `deploy.yml`
2. Confirme que o build está gerando arquivos em `dist/public`
3. Aguarde alguns minutos após o push (o deploy pode levar tempo)

### Erros de build?

1. Execute localmente: `pnpm install && pnpm build`
2. Verifique se todas as dependências estão instaladas
3. Consulte os logs do workflow em **Actions**

## 📞 Suporte

Para dúvidas ou problemas, consulte:
- [Documentação do GitHub Pages](https://docs.github.com/en/pages)
- [Documentação do GitHub Actions](https://docs.github.com/en/actions)
- Logs do workflow em **Actions** do repositório
