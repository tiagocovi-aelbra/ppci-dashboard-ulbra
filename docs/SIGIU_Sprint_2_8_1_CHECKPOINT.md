# SIGIU / Painel PPCI — Sprint 2.8.1 RC1

## Objetivo

Corrigir a Sprint 2.8, removendo a ocorrência inferior duplicada de **Status dos PPCIs**, localizada abaixo da **Distribuição das Responsabilidades**, e mantendo o filtro de Status dentro da seção **Análise da Carteira PPCI**.

## Correção aplicada

### Mantido

- **Análise da Carteira PPCI**
  - Status dos PPCIs
  - Categorias

### Removido

- Bloco de **Status dos PPCIs** do `DashboardExecutivo`, que aparecia abaixo da Distribuição das Responsabilidades.

### Preservado

- Filtro por categoria pela Análise da Carteira.
- Filtro por status pela Análise da Carteira.
- Situação Geral no Dashboard Executivo.
- Conclusão Média no Dashboard Executivo.
- Modal PPCI.
- Exportação CSV.
- Busca textual.
- Ordenação.
- Limpar filtros.

## Arquivos alterados

- `src/App.jsx`
- `src/components/Analises/AnaliseCarteira.jsx`
- `src/components/Analises/PainelAnalises.jsx`
- `src/components/Dashboard/DashboardExecutivo.jsx`

## Arquivo CSS

- `src/App.css` não exige alteração funcional obrigatória nesta correção.
- Foi mantido no pacote para consolidação da versão.

## Validação recomendada

1. Rodar `npm run dev`.
2. Abrir **Análise da Carteira PPCI**.
3. Confirmar que aparecem **Status dos PPCIs** e **Categorias**.
4. Abrir **Distribuição das Responsabilidades**.
5. Confirmar que, abaixo dela, não aparece mais outro bloco de **Status dos PPCIs**.
6. Confirmar que o Dashboard Executivo mostra apenas **Situação Geral** e **Conclusão Média**.
7. Testar filtro por Status pela Análise da Carteira.
8. Testar botão **Limpar filtros**.

## Status

Sprint 2.8.1 RC1 pronta para validação.
