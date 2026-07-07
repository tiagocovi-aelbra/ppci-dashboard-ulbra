# SIGIU / Painel PPCI — Sprint 3.4 RC1

## Tema
Alternância de visualização da listagem: **Cards** / **Lista compacta**.

## Base
Sprint 3.3 RC1 validada.

## Objetivo
Reduzir a rolagem vertical e melhorar a leitura executiva quando houver muitos PPCIs filtrados, mantendo a visualização em cards como padrão.

## Arquivos alterados

```text
src/components/Cards/CardsPPCI.jsx
src/App.css
```

## Entregas

- Inclusão de seletor visual no cabeçalho de **PPCIs Monitorados**:
  - Cards
  - Lista
- Visualização **Cards** permanece como padrão.
- Visualização **Lista** reorganiza cada PPCI em uma linha compacta.
- Mantida abertura do modal ao clicar no PPCI.
- Mantidos filtros por badges de categoria e status.
- Mantidos filtros ativos, ordenação, CSV e toolbar.
- Ajustes responsivos para telas menores.

## Validação sugerida

1. Abrir o painel em modo padrão.
2. Conferir que a listagem inicia em **Cards**.
3. Clicar em **Lista**.
4. Conferir cards em linhas compactas.
5. Abrir modal a partir de um item em lista.
6. Clicar em categoria/status dentro da lista e validar filtro.
7. Voltar para **Cards**.
8. Testar busca, ordenação, filtros ativos, limpar filtros e exportação CSV.

## Observações

- Não altera API.
- Não altera exportação CSV.
- Não altera modal.
- Não altera hooks de dados/filtros.
