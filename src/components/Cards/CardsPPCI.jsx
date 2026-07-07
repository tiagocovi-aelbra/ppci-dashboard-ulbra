/* =========================================================
   RELEASE........: v3.4.0 RC1
   ARQUIVO........: src/components/Cards/CardsPPCI.jsx
   DESCRIÇÃO......: Listagem de cards PPCI com cabeçalho compacto,
                    contador de resultados, indicação da ordenação
                    e alternância visual entre Cards e Lista.
========================================================= */

import React, { useState } from "react";
import CardPPCI from "./CardPPCI";

const ORDENACOES_LABEL = {
  prioridade: "Prioridade",
  vencimento: "Vencimento",
  predio: "Prédio / Edificação",
  responsavel: "Responsável",
};

export default function CardsPPCI({
  ppcis = [],
  totalGeral = 0,
  ordenacao = "prioridade",
  obterDiasParaVencer,
  obterClasseVencimento,
  textoOuPadrao,
  formatarData,
  aplicarFiltroRapido,
  setPpciSelecionado,
}) {
  const [modoVisual, setModoVisual] = useState("cards");

  const totalFiltrado = ppcis.length;
  const existemFiltros = totalGeral > 0 && totalFiltrado !== totalGeral;
  const labelOrdenacao = ORDENACOES_LABEL[ordenacao] ?? textoOuPadrao(ordenacao);

  const CabecalhoListagem = () => (
    <div className="cards-cabecalho">
      <div>
        <h3 className="secao-titulo cards-titulo">PPCIs Monitorados</h3>
        <p className="cards-subtitulo">
          {existemFiltros
            ? `${totalFiltrado} de ${totalGeral} PPCIs exibidos`
            : `${totalGeral} PPCIs cadastrados`}
        </p>
      </div>

      <div className="cards-resumo-lista" aria-label="Resumo da listagem">
        <span className="cards-contador">
          <strong>{totalFiltrado}</strong>
          <small>visíveis</small>
        </span>

        <span className="cards-ordenacao">
          Ordenado por <strong>{labelOrdenacao}</strong>
        </span>

        <div className="cards-modo-visual" aria-label="Modo de visualização dos PPCIs">
          <button
            type="button"
            className={`cards-modo-botao ${modoVisual === "cards" ? "ativo" : ""}`}
            onClick={() => setModoVisual("cards")}
            aria-pressed={modoVisual === "cards"}
          >
            Cards
          </button>

          <button
            type="button"
            className={`cards-modo-botao ${modoVisual === "lista" ? "ativo" : ""}`}
            onClick={() => setModoVisual("lista")}
            aria-pressed={modoVisual === "lista"}
          >
            Lista
          </button>
        </div>
      </div>
    </div>
  );

  if (!ppcis.length) {
    return (
      <section className="secao-painel secao-painel-cards">
        <CabecalhoListagem />

        <div className="cards-vazio">
          Nenhum PPCI encontrado para os filtros informados.
        </div>
      </section>
    );
  }

  return (
    <section className="secao-painel secao-painel-cards">
      <CabecalhoListagem />

      <div
        className={`cards-grid ${
          modoVisual === "lista" ? "cards-grid-lista" : "cards-grid-cards"
        }`}
      >
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
    </section>
  );
}
