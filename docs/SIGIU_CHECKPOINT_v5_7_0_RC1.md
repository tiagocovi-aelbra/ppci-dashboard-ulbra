# SIGIU / Painel PPCI — Checkpoint v5.7.0 RC1

## Identificação

- Projeto: SIGIU — Painel PPCI ULBRA
- Versão: v5.7.0 RC1
- Marco: Encerramento consolidado da Sprint 5
- Data do checkpoint: 2026-07-07
- Base anterior: v5.2.0 RC1 / Sprint 5 consolidada

## Objetivo do checkpoint

Registrar a versão consolidada da Sprint 5, incorporando as melhorias de qualidade da base PPCI, filtros operacionais por pendência, ranking de qualidade, checklist de saneamento e exportações gerenciais.

## Escopo consolidado da Sprint 5

### Sprint 5.0 — Qualidade da Base PPCI

- Inclusão da seção Saúde / Qualidade da Base de Dados.
- Avaliação de campos críticos e de atenção.
- Exibição de percentual geral de preenchimento.
- Identificação de registros completos, pendentes, críticos e de atenção.

### Sprint 5.0.1 — Reorganização das seções

- Saúde da Base de Dados passou a ser recolhível.
- Seção inicia recolhida.
- Situação Geral e Conclusão Média reposicionadas antes da Análise da Carteira PPCI.

### Sprint 5.1 — Saúde da Base operacional

- Exportação de pendências em CSV.
- Exportação individual por tipo de pendência.
- Exemplos de PPCIs afetados clicáveis.
- Abertura do modal ao clicar em um PPCI listado nas pendências.

### Sprint 5.2 — Filtro por pendência

- Inclusão de filtro operacional por pendência da Saúde da Base.
- Chip de filtro ativo do tipo Pendência.
- Integração com limpar filtros, visão salva e estado vazio filtrado.

### Sprint 5.3 — Ranking de qualidade

- Ranking de qualidade por Unidade.
- Ranking de qualidade por Responsável.
- Apoio à priorização de saneamento da base.

### Sprint 5.4 — Evolução local da qualidade

- Registro local da evolução da qualidade da base.
- Apoio comparativo da saúde da base ao longo do uso.

### Sprint 5.5 — Checklist de saneamento

- Checklist de saneamento da base com prioridade.
- Apoio operacional para correções de dados.

### Sprint 5.6 — Exportação gerencial

- Exportação gerencial completa da Saúde da Base.
- Consolidação de indicadores e pendências em arquivo CSV.

### Sprint 5.7 — Fechamento da Sprint 5

- Consolidação final da Sprint 5.
- Pacote final v5.7.0 RC1 gerado.
- Preparação para atualização no Git e publicação.

## Arquivos principais alterados

- src/App.jsx
- src/App.css
- src/hooks/useQualidadeDados.js
- src/components/QualidadeDados/QualidadeDados.jsx
- src/services/exportQualidadeCSV.js
- src/config/sigiuConfig.js

## Validações recomendadas

1. Rodar `npm run dev`.
2. Conferir carregamento do painel.
3. Expandir Saúde da Base de Dados.
4. Testar filtro por pendência.
5. Testar exportações CSV da Saúde da Base.
6. Testar abertura do modal pelos exemplos de pendências.
7. Testar Cards / Lista.
8. Testar filtros ativos e limpeza individual.
9. Rodar `npm run build`.
10. Confirmar publicação no Netlify após o push.

## Comandos sugeridos para Git

```bash
git status
git add .
git commit -m "Checkpoint v5.7.0 RC1 - Sprint 5 consolidada"
git push origin main
```

Caso a branch principal seja `master`, usar:

```bash
git push origin master
```

## Estado do projeto

A versão v5.7.0 RC1 encerra a Sprint 5 tecnicamente e deixa o painel preparado para avanço à Sprint 6.

## Próxima etapa sugerida

Sprint 6 — Gestão de Prazos, Alertas e Priorização Operacional.
