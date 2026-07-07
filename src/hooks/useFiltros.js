export function limparFiltros({
  setFiltro,
  setFiltroStatus,
  setFiltroSituacao,
  setFiltroCategoria,
  setFiltroResponsavel,
  setFiltroUnidade,
  setOrdenacao
}) {

  setFiltro("");
  setFiltroStatus("");
  setFiltroSituacao("");
  setFiltroCategoria("");
  setFiltroResponsavel("");
  setFiltroUnidade("");

  setOrdenacao("prioridade");

}

export function aplicarFiltroRapido(
  tipo,
  valor,
  {
    setFiltroCategoria,
    setFiltroStatus,
    setFiltroResponsavel,
    setFiltroUnidade
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

    default:
      break;

  }

}