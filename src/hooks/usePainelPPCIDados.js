/* =====================================================
   RELEASE........: v2.3.0 RC1
   ARQUIVO........: src/hooks/usePainelPPCIDados.js
   DESCRIÇÃO......: Centraliza os dados derivados do Painel PPCI
===================================================== */

import { useMemo } from "react";

import useDashboard from "./useDashboard";
import useOrdenacao from "./useOrdenacao";
import usePesquisa from "./usePesquisa";

export default function usePainelPPCIDados(ppcis = [], filtrosPainel = {}) {
  const {
    filtro = "",
    filtroCategoria = "",
    filtroStatus = "",
    filtroSituacao = "",
    filtroResponsavel = "",
    filtroUnidade = "",
    ordenacao = "prioridade",
  } = filtrosPainel;

  const dashboard = useDashboard(ppcis);

  const ppcisOrdenados = useOrdenacao(ppcis, ordenacao);

  const ppcisFiltrados = usePesquisa(
    ppcisOrdenados,
    filtro,
    filtroCategoria,
    filtroStatus,
    filtroSituacao,
    filtroResponsavel,
    filtroUnidade
  );

  const categoriasFiltro = useMemo(
    () => dashboard.categoriasOrdenadas.map(([categoria]) => categoria),
    [dashboard.categoriasOrdenadas]
  );

  return {
    dashboard,
    ppcisOrdenados,
    ppcisFiltrados,
    categoriasFiltro,
  };
}
