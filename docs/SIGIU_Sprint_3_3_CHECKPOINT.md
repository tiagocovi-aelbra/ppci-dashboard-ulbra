# SIGIU / Painel PPCI — Sprint 3.3 RC1

## Tema
Cabeçalho compacto da listagem de PPCIs.

## Objetivo
Melhorar a leitura da seção **PPCIs Monitorados**, deixando visível:

- quantidade total de PPCIs cadastrados;
- quantidade de PPCIs visíveis após filtros;
- critério de ordenação ativo.

## Arquivos alterados

```text
src/App.jsx
src/App.css
src/components/Cards/CardsPPCI.jsx
```

## Alterações funcionais

### App.jsx
- Passa `totalGeral={ppcis.length}` para `CardsPPCI`.
- Passa `ordenacao={ordenacao}` para `CardsPPCI`.

### CardsPPCI.jsx
- Cria cabeçalho interno da listagem.
- Exibe o total visível e o total cadastrado.
- Exibe a ordenação atual.
- Mantém a mensagem de lista vazia quando não houver PPCIs filtrados.

### App.css
- Adiciona estilos para:
  - `.cards-cabecalho`;
  - `.cards-subtitulo`;
  - `.cards-resumo-lista`;
  - `.cards-contador`;
  - `.cards-ordenacao`.

## Validação recomendada

1. Abrir o painel sem filtros e conferir o total de PPCIs cadastrados.
2. Aplicar filtro por status, categoria, responsável ou unidade.
3. Confirmar que o contador passa a exibir `X de Y PPCIs exibidos`.
4. Alterar a ordenação na Toolbar.
5. Confirmar que o chip de ordenação reflete o critério escolhido.
6. Limpar filtros e confirmar retorno ao total geral.

## Observações

- Não altera API.
- Não altera CSV.
- Não altera modal.
- Não altera regras de filtro.
- Alteração visual e informativa de baixo risco.
