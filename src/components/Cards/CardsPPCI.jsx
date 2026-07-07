/* =========================================================
   RELEASE........: v1.0.0 RC1
   ARQUIVO........: src/components/Cards/CardsPPCI.jsx
========================================================= */

import React from "react";
import CardPPCI from "./CardPPCI";

export default function CardsPPCI({
  ppcis = [],
  obterDiasParaVencer,
  obterClasseVencimento,
  textoOuPadrao,
  formatarData,
  aplicarFiltroRapido,
  setPpciSelecionado
}) {

  if (!ppcis.length) {
    return (
      <div className="secao-painel">
        <h3 className="secao-titulo">
          PPCIs MONITORADOS
        </h3>

        <div className="cards-vazio">
          Nenhum PPCI encontrado para os filtros informados.
        </div>
      </div>
    );
  }

  return (

    <div className="secao-painel">

      <h3 className="secao-titulo">
        PPCIs MONITORADOS
      </h3>

      <div className="cards-grid">

        {ppcis.map((item) => {

          const dias =
            obterDiasParaVencer(
              item["Data limite / vencimento PPCI"]
            ) ?? 9999;

          return (

            <CardPPCI
              key={item.ID}
              item={item}
              dias={dias}
              textoOuPadrao={textoOuPadrao}
              formatarData={formatarData}
              obterClasseVencimento={obterClasseVencimento}
              aplicarFiltroRapido={aplicarFiltroRapido}
              setPpciSelecionado={setPpciSelecionado}
            />

          );

        })}

      </div>

    </div>

  );

}
