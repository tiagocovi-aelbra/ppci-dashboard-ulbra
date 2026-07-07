/* =========================================================
   RELEASE........: v2.3.0 RC1
   ARQUIVO........: src/hooks/usePesquisa.js

   RESPONSABILIDADE:
   Centralizar pesquisa e filtros dos PPCIs.
========================================================= */

import { useMemo } from "react";

import { PPCI_CAMPOS, PPCI_SITUACOES } from "../domain/ppciCampos";
import {
  obterDiasParaVencer,
  textoOuPadrao,
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
    const termoBusca = filtro.trim().toLowerCase();

    return ppcis.filter((item) => {
      /* ==========================================
         PESQUISA POR TEXTO
      ========================================== */

      if (termoBusca) {
        const texto = JSON.stringify(item ?? {}).toLowerCase();

        if (!texto.includes(termoBusca)) {
          return false;
        }
      }

      /* ==========================================
         NORMALIZAÇÃO
      ========================================== */

      const categoria = textoOuPadrao(item?.[PPCI_CAMPOS.CATEGORIA]);
      const status = textoOuPadrao(item?.[PPCI_CAMPOS.STATUS]);
      const responsavel = textoOuPadrao(item?.[PPCI_CAMPOS.RESPONSAVEL]);
      const unidade = textoOuPadrao(item?.[PPCI_CAMPOS.UNIDADE]);

      /* ==========================================
         FILTROS DIRETOS
      ========================================== */

      if (filtroCategoria && categoria !== filtroCategoria) {
        return false;
      }

      if (filtroStatus && status !== filtroStatus) {
        return false;
      }

      if (filtroResponsavel && responsavel !== filtroResponsavel) {
        return false;
      }

      if (filtroUnidade && unidade !== filtroUnidade) {
        return false;
      }

      /* ==========================================
         FILTRO DE SITUAÇÃO / VENCIMENTO
      ========================================== */

      if (filtroSituacao) {
        const dias = obterDiasParaVencer(item?.[PPCI_CAMPOS.DATA_VENCIMENTO]);

        switch (filtroSituacao) {
          case PPCI_SITUACOES.VENCIDOS:
            return dias !== null && dias < 0;

          case PPCI_SITUACOES.CRITICOS:
            return dias !== null && dias >= 0 && dias <= 60;

          case PPCI_SITUACOES.REGULARES:
            return dias !== null && dias > 60;

          case PPCI_SITUACOES.SEM_DATA:
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
    filtroUnidade,
  ]);
}
