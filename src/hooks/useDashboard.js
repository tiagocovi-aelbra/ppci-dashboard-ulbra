/* =========================================================
   RELEASE........: v1.0.0 RC1
   ARQUIVO........: src/hooks/useDashboard.js

   RESPONSABILIDADE:
   Centralizar os indicadores gerenciais do Dashboard PPCI.
========================================================= */

import { useMemo } from "react";
import { obterDiasParaVencer } from "../utils/ppciUtils";

export default function useDashboard(ppcis = []) {

  return useMemo(() => {

    const contar = (campo) => {
      const mapa = {};
      ppcis.forEach((item) => {
        const chave = item[campo] || "Não informado";
        mapa[chave] = (mapa[chave] || 0) + 1;
      });
      return Object.entries(mapa).sort((a,b)=>b[1]-a[1]);
    };

    const vencidos = ppcis.filter(p=>{
      const d=obterDiasParaVencer(p["Data limite / vencimento PPCI"]);
      return d!==null && d<0;
    }).length;

    const criticos = ppcis.filter(p=>{
      const d=obterDiasParaVencer(p["Data limite / vencimento PPCI"]);
      return d!==null && d>=0 && d<=60;
    }).length;

    const semData = ppcis.filter(p=>!p["Data limite / vencimento PPCI"]).length;
    const regulares = Math.max(ppcis.length-vencidos-criticos-semData,0);

    const mediaConclusao = ppcis.length
      ? Math.round(
          ppcis.reduce((t,p)=>t+(Number(p["% Conclusão"])||0),0)
          /ppcis.length*100
        )
      : 0;

    const statusOrdenados = contar("Status / Situação");
    const categoriasOrdenadas = contar("Categoria");
    const responsaveisOrdenados = contar("Responsável");
    const unidadesOrdenadas = contar("Unidade");

    const maiorStatus=Math.max(1,...statusOrdenados.map(([,q])=>q));
    const maiorSituacao=Math.max(1,vencidos,criticos,regulares,semData);

    return {
      statusOrdenados,
      categoriasOrdenadas,
      responsaveisOrdenados,
      unidadesOrdenadas,
      vencidos,
      criticos,
      regulares,
      semData,
      mediaConclusao,
      maiorStatus,
      maiorSituacao
    };

  },[ppcis]);

}
