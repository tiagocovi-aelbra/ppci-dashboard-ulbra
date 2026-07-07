/* =========================================================
   RELEASE........: v1.0.3 RC1
   ARQUIVO........: src/hooks/usePesquisa.js

   RESPONSABILIDADE:
   Centralizar pesquisa e filtros dos PPCIs.
========================================================= */

import { useMemo } from "react";
import {
  obterDiasParaVencer,
  textoOuPadrao
} from "../utils/ppciUtils";

export default function usePesquisa(
  ppcis = [],
  filtro = "",
  filtroCategoria = "",
  filtroStatus = "",
  filtroSituacao = "",
  filtroResponsavel = "",
  filtroUnidade = ""
) {

  return useMemo(() => {

    return ppcis.filter((item) => {

      /* ==========================================
         PESQUISA POR TEXTO
      ========================================== */

      const texto = JSON.stringify(item ?? {}).toLowerCase();

      if (
        filtro &&
        !texto.includes(filtro.toLowerCase())
      ) {
        return false;
      }

      /* ==========================================
         NORMALIZAÇÃO
      ========================================== */

      const categoria = textoOuPadrao(item?.Categoria);

      const status = textoOuPadrao(
        item?.["Status / Situação"]
      );

      const responsavel = textoOuPadrao(
        item?.Responsável
      );

      const unidade = textoOuPadrao(
        item?.Unidade
      );

      /* ==========================================
         FILTRO CATEGORIA
      ========================================== */

      if (
        filtroCategoria &&
        categoria !== filtroCategoria
      ) {
        return false;
      }

      /* ==========================================
         FILTRO STATUS
      ========================================== */

      if (
        filtroStatus &&
        status !== filtroStatus
      ) {
        return false;
      }

      /* ==========================================
         FILTRO RESPONSÁVEL
      ========================================== */

      if (
        filtroResponsavel &&
        responsavel !== filtroResponsavel
      ) {
        return false;
      }

      /* ==========================================
         FILTRO UNIDADE
      ========================================== */

      if (
        filtroUnidade &&
        unidade !== filtroUnidade
      ) {
        return false;
      }

      /* ==========================================
         FILTRO SITUAÇÃO
      ========================================== */

      if (filtroSituacao) {

        const dias = obterDiasParaVencer(
          item?.["Data limite / vencimento PPCI"]
        );

        switch (filtroSituacao) {

          case "vencidos":
            return dias !== null && dias < 0;

          case "criticos":
            return dias !== null &&
                   dias >= 0 &&
                   dias <= 60;

          case "regulares":
            return dias !== null &&
                   dias > 60;

          case "semData":
            return dias === null;

          default:
            return true;

        }

      }

      return true;

    });

  }, [
    ppcis,
    filtro,
    filtroCategoria,
    filtroStatus,
    filtroSituacao,
    filtroResponsavel,
    filtroUnidade
  ]);

}