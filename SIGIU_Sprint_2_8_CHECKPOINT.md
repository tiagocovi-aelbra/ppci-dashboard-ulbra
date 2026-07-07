# SIGIU / Painel PPCI — Sprint 2.8.0 RC1

## Objetivo

Remover o filtro duplicado de **Status dos PPCIs** da seção **Análise da Carteira PPCI**, mantendo o filtro oficial de status centralizado no **Dashboard Executivo**.

## Alterações

- Removido o bloco **Status dos PPCIs** de `AnaliseCarteira.jsx`;
- Mantido o bloco **Categorias** na Análise da Carteira PPCI;
- Removida a passagem de `statusOrdenados` para `PainelAnalises`;
- Mantido `statusOrdenados` no `DashboardExecutivo`, onde o filtro de status continua funcionando;
- Acrescentada a classe CSS `graficos-grid-unico` para melhor ocupação visual do card de categorias quando exibido sozinho.

## Arquivos alterados

- `src/App.jsx`;
- `src/components/Analises/PainelAnalises.jsx`;
- `src/components/Analises/AnaliseCarteira.jsx`;
- `src/App.css`.

## Validação recomendada

1. Rodar `npm run dev`;
2. Abrir **Análise da Carteira PPCI**;
3. Confirmar que aparece apenas **Categorias**;
4. Confirmar que o filtro por status permanece no **Dashboard Executivo**;
5. Confirmar que filtros, cards, modal e exportação CSV seguem funcionando.

## Status

Sprint 2.8.0 RC1 pronta para validação.
