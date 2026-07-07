# SIGIU — Sprint 3.4.1 RC1

## Ajuste visual
Correção pontual da visualização em lista compacta dos PPCIs.

## Problema corrigido
A linha da visualização em lista podia extrapolar o limite lateral do painel devido à combinação de colunas rígidas, textos longos e ausência de `min-width: 0` em alguns blocos internos.

## Alteração aplicada
Arquivo alterado:

- `src/App.css`

## Comportamento esperado
- A visualização em lista respeita o limite lateral do container.
- Textos longos são truncados ou quebrados sem expandir a largura da linha.
- A visualização em cards permanece preservada.
- Modal, filtros, chips de filtros ativos, CSV e ordenação permanecem inalterados.

## Validação
1. Alternar para o modo `Lista`.
2. Conferir se nenhuma linha ultrapassa o painel lateralmente.
3. Abrir o modal clicando em uma linha.
4. Alternar para `Cards` e confirmar que o layout anterior foi preservado.
