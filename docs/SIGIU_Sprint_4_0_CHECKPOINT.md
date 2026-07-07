# SIGIU / Painel PPCI — Sprint 4.0 RC1

**Data:** 2026-07-07  
**Versão:** v4.0.0 RC1  
**Tema:** Preferências operacionais persistentes

## Objetivo

Melhorar a experiência operacional do painel preservando as escolhas do usuário entre recarregamentos da página.

## Entregas

### 1. Persistência da ordenação

A ordenação selecionada na Toolbar passa a ser salva no `localStorage` do navegador.

Exemplos:

- Prioridade;
- Vencimento;
- Prédio / Edificação;
- Responsável.

Ao recarregar o painel, a última ordenação escolhida é restaurada automaticamente.

### 2. Persistência do modo de visualização

A escolha entre **Cards** e **Lista** passa a ser salva no `localStorage`.

Ao recarregar o painel, o último modo utilizado é restaurado automaticamente.

## Arquivos alterados

```text
src/hooks/useFiltrosPainel.js
src/components/Cards/CardsPPCI.jsx
```

## Impacto técnico

- Não altera a API;
- Não altera o modal;
- Não altera a exportação CSV;
- Não altera filtros ativos;
- Não altera dashboard;
- Não altera estrutura visual da Sprint 3;
- Apenas adiciona persistência local de preferências.

## Validação recomendada

1. Alterar ordenação para Vencimento;
2. Recarregar a página;
3. Confirmar se Vencimento permanece selecionado;
4. Alterar visualização para Lista;
5. Recarregar a página;
6. Confirmar se Lista permanece ativa;
7. Voltar para Cards e repetir o teste;
8. Usar Limpar filtros e confirmar que a ordenação volta ao padrão configurado pelo sistema.
