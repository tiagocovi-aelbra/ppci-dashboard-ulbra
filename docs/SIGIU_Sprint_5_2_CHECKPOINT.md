# SIGIU / Painel PPCI — Sprint 5.2 RC1

## Entrega

**Filtro operacional por pendência da Saúde da Base de Dados.**

## Objetivo

Transformar a seção **Saúde da Base de Dados** em uma ferramenta operacional, permitindo que uma pendência cadastral filtre diretamente a listagem principal de PPCIs.

## Escopo implementado

- Botão **Filtrar esta pendência** em cada inconsistência da saúde da base.
- Destaque visual da pendência filtrada.
- Barra de filtros ativos passa a exibir o chip **Pendência**.
- Remoção individual do filtro de pendência pelo chip.
- Estado vazio filtrado reconhece o filtro de pendência.
- A visão salva/restaurada passa a preservar também o filtro de pendência.
- Botão **Limpar todos** remove também o filtro de pendência.

## Arquivos alterados

```text
src/App.jsx
src/App.css
src/hooks/useFiltros.js
src/hooks/useFiltrosPainel.js
src/hooks/usePainelPPCIDados.js
src/hooks/usePesquisa.js
src/components/QualidadeDados/QualidadeDados.jsx
src/components/FiltrosAtivos/FiltrosAtivos.jsx
src/components/Feedback/ResultadoVazioFiltros.jsx
```

## Validação recomendada

1. Expandir **Saúde da Base de Dados**.
2. Clicar em **Filtrar esta pendência** em uma inconsistência.
3. Confirmar se a listagem principal exibe apenas PPCIs daquela pendência.
4. Confirmar se o chip **Pendência** aparece em filtros ativos.
5. Remover o chip e conferir se a listagem volta.
6. Usar **Limpar todos** e confirmar que o filtro de pendência também é removido.
7. Salvar visão com uma pendência filtrada, limpar e restaurar.
