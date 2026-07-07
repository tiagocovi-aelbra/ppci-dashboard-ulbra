# SIGIU / Painel PPCI — Sprint 5.0 RC1

## Tema
Qualidade da Base PPCI.

## Objetivo
Adicionar uma camada de conferência cadastral e operacional dos dados PPCI, permitindo identificar rapidamente campos ausentes ou incompletos na base consumida pela API/planilha.

## Entregas

- Novo hook `useQualidadeDados.js`.
- Novo componente `QualidadeDados.jsx`.
- Inclusão do painel **Qualidade da Base PPCI** no fluxo principal do painel.
- CSS completo para os indicadores e detalhamento de pendências.

## Campos avaliados

### Campos críticos

- Status / Situação.
- Responsável.
- Data limite / vencimento PPCI.
- Prédio / Edificação.

### Campos de atenção

- Número do PPCI / Processo CBMRS.
- Prioridade.
- Categoria.
- Link Processo.
- Providência / Próximo passo.

## Indicadores exibidos

- Preenchimento geral da base.
- Registros completos.
- Registros com pendência.
- Pendências críticas.
- Pendências de atenção.
- Detalhamento por tipo de pendência.
- Exemplos dos primeiros PPCIs afetados por cada pendência.

## Arquivos alterados/criados

### Alterados

- `src/App.jsx`
- `src/App.css`

### Criados

- `src/hooks/useQualidadeDados.js`
- `src/components/QualidadeDados/QualidadeDados.jsx`
- `src/components/QualidadeDados/index.js`

## Validação recomendada

1. Rodar `npm run dev`.
2. Confirmar que o painel carrega normalmente.
3. Verificar a nova seção **Qualidade da Base PPCI** após o Dashboard Executivo.
4. Conferir os cards de resumo.
5. Clicar em **Ver detalhes**.
6. Confirmar que os exemplos de pendências aparecem sem quebrar o layout.
7. Testar em modo Cards e Lista.
8. Confirmar que filtros, modal, exportação CSV e preferências continuam funcionando.

## Observação

Esta sprint não altera a API, a planilha, o modal, a exportação CSV nem a regra de filtros. A análise é feita no frontend, com base nos dados já carregados.
