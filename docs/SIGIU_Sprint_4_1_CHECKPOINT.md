# SIGIU / Painel PPCI — Sprint 4.1 RC1

## Tema
Estado vazio filtrado aprimorado.

## Base
Sprint 4.0 RC1 — preferências operacionais persistentes.

## Objetivo
Melhorar a experiência quando a combinação de filtros não retorna nenhum PPCI, substituindo a mensagem genérica por uma orientação operacional mais clara.

## Entregas

- Criação do componente `ResultadoVazioFiltros.jsx`.
- Exibição dos filtros ativos que geraram resultado vazio.
- Remoção individual de filtros diretamente no estado vazio.
- Botão para limpar todos os filtros.
- Texto explicativo informando o total de PPCIs da base e a ausência de registros compatíveis com a combinação atual.
- CSS responsivo específico para o novo estado vazio.

## Arquivos alterados

- `src/App.jsx`
- `src/App.css`
- `src/components/Cards/CardsPPCI.jsx`

## Arquivo criado

- `src/components/Feedback/ResultadoVazioFiltros.jsx`

## Validação recomendada

1. Aplicar um filtro que não retorne nenhum PPCI.
2. Conferir se aparece a mensagem aprimorada.
3. Remover um filtro individual pelo chip exibido no estado vazio.
4. Aplicar novamente filtros combinados e clicar em `Limpar todos os filtros`.
5. Confirmar se a listagem volta a exibir os PPCIs.
6. Confirmar se as preferências da Sprint 4.0 continuam funcionando: modo Cards/Lista e ordenação persistente.

## Status
Pronto para validação.
