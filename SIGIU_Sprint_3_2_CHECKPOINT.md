# SIGIU / Painel PPCI — Sprint 3.2 RC1

## Tema
Barra compacta de filtros ativos e limpeza individual de filtros.

## Base
Sprint 3.1 validada pelo usuário, com compactação visual e correção de destaque dos filtros analíticos.

## Objetivo
Melhorar a leitura operacional quando filtros são aplicados a partir da busca, Análise da Carteira PPCI, Distribuição das Responsabilidades ou Situação Geral.

## Entregas

- Novo componente `src/components/FiltrosAtivos/FiltrosAtivos.jsx`.
- Novo barrel `src/components/FiltrosAtivos/index.js`.
- Atualização do `src/App.jsx` para renderizar a barra de filtros ativos entre a Toolbar e os Cards PPCI.
- Atualização do `src/App.css` com estilos compactos e responsivos.

## Comportamento

A barra aparece apenas quando houver pelo menos um filtro ativo:

- busca textual;
- status;
- situação;
- categoria;
- responsável;
- unidade.

Cada chip permite remover individualmente o respectivo filtro. Também foi incluído botão `Limpar todos`.

## Arquivos alterados

- `src/App.jsx`
- `src/App.css`

## Arquivos criados

- `src/components/FiltrosAtivos/FiltrosAtivos.jsx`
- `src/components/FiltrosAtivos/index.js`

## Validação sugerida

1. Filtrar por Status na Análise da Carteira PPCI.
2. Filtrar por Categoria.
3. Filtrar por Responsável e Unidade.
4. Usar busca textual.
5. Clicar no chip de um filtro individual.
6. Clicar em `Limpar todos`.
7. Validar responsividade.
