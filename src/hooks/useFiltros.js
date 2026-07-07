/* =====================================================
   RELEASE........: v5.2.0 RC1
   ARQUIVO........: src/hooks/useFiltros.js
   DESCRIÇÃO......: Ações utilitárias para filtros rápidos e limpeza geral
===================================================== */

export function limparFiltros({
  setFiltro,
  setFiltroStatus,
  setFiltroSituacao,
  setFiltroCategoria,
  setFiltroResponsavel,
  setFiltroUnidade,
  setFiltroQualidade,
  setOrdenacao,
}) {
  setFiltro?.("");
  setFiltroStatus?.("");
  setFiltroSituacao?.("");
  setFiltroCategoria?.("");
  setFiltroResponsavel?.("");
  setFiltroUnidade?.("");
  setFiltroQualidade?.(null);

  setOrdenacao?.("prioridade");
}

export function aplicarFiltroRapido(
  tipo,
  valor,
  {
    setFiltroCategoria,
    setFiltroStatus,
    setFiltroResponsavel,
    setFiltroUnidade,
    setFiltroQualidade,
  }
) {
  if (!valor) return;

  switch (tipo) {
    case "categoria":
      setFiltroCategoria?.(valor);
      break;

    case "status":
      setFiltroStatus?.(valor);
      break;

    case "responsavel":
      setFiltroResponsavel?.(valor);
      break;

    case "unidade":
      setFiltroUnidade?.(valor);
      break;

    case "qualidade":
      setFiltroQualidade?.(valor);
      break;

    default:
      break;
  }
}
