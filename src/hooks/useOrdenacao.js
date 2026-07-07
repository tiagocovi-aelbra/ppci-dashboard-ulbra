/* =========================================================
   RELEASE........: v0.9.6
   ARQUIVO........: src/hooks/useOrdenacao.js

   RESPONSABILIDADE:
   Ordenar a lista de PPCIs conforme o critério selecionado.
========================================================= */

import { useMemo } from "react";

export default function useOrdenacao(ppcis = [], ordenacao = "prioridade") {

  return useMemo(() => {

    const lista = [...ppcis];

    lista.sort((a, b) => {

      switch (ordenacao) {

        case "prioridade":
          return (Number(a.Prioridade) || 999) - (Number(b.Prioridade) || 999);

        case "vencimento":
          return new Date(a["Data limite / vencimento PPCI"] || "2999-12-31")
               - new Date(b["Data limite / vencimento PPCI"] || "2999-12-31");

        case "predio":
          return String(a["Prédio / Edificação"] || "")
            .localeCompare(String(b["Prédio / Edificação"] || ""), "pt-BR");

        case "responsavel":
          return String(a.Responsável || "")
            .localeCompare(String(b.Responsável || ""), "pt-BR");

        default:
          return 0;

      }

    });

    return lista;

  }, [ppcis, ordenacao]);

}
