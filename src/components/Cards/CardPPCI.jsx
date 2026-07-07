/* =========================================================
   RELEASE........: v3.0.0 RC1
   ARQUIVO........: src/components/Cards/CardPPCI.jsx
   DESCRIÇÃO......: Card PPCI compacto para leitura executiva
========================================================= */

import React from "react";

export default function CardPPCI({
  item,
  dias,
  textoOuPadrao,
  formatarData,
  obterClasseVencimento,
  aplicarFiltroRapido,
  setPpciSelecionado,
}) {
  const conclusao = Math.round((item["% Conclusão"] ?? 0) * 100);

  const textoDias =
    dias === 9999
      ? "Sem data"
      : dias < 0
        ? `Vencido há ${Math.abs(dias)} dias`
        : dias === 0
          ? "Vence hoje"
          : dias === 1
            ? "Vence amanhã"
            : `${dias} dias`;

  const classePrazo =
    dias === 9999
      ? "prazo-sem-data"
      : dias < 0
        ? "prazo-vencido"
        : dias <= 60
          ? "prazo-alerta"
          : "prazo-ok";

  const abrirModal = () => setPpciSelecionado(item);

  return (
    <article
      className={`ppci-card ppci-card-compacto ${obterClasseVencimento(
        item["Data limite / vencimento PPCI"]
      )}`}
      onClick={abrirModal}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          abrirModal();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Abrir detalhes do PPCI ${textoOuPadrao(item.ID)}`}
    >
      <div className="card-header card-header-compacto">
        <div className="card-id">{textoOuPadrao(item.ID)}</div>

        <div
          className={`card-prioridade prioridade-${textoOuPadrao(
            item.Prioridade,
            "0"
          )}`}
          title="Prioridade"
        >
          P{textoOuPadrao(item.Prioridade, "0")}
        </div>
      </div>

      <div className="card-identificacao card-identificacao-compacta">
        <div className="card-local">{textoOuPadrao(item.Unidade)}</div>
        <div className="card-predio">
          {textoOuPadrao(item["Prédio / Edificação"])}
        </div>
      </div>

      <div className="card-badges card-badges-compactos">
        <button
          type="button"
          className="badge-categoria"
          onClick={(e) => {
            e.stopPropagation();
            aplicarFiltroRapido("categoria", item.Categoria);
          }}
          title="Filtrar por categoria"
        >
          {textoOuPadrao(item.Categoria)}
        </button>

        <button
          type="button"
          className="badge-status"
          onClick={(e) => {
            e.stopPropagation();
            aplicarFiltroRapido("status", item["Status / Situação"]);
          }}
          title="Filtrar por status"
        >
          {textoOuPadrao(item["Status / Situação"], "Sem Status")}
        </button>
      </div>

      <div className="card-processo card-processo-compacto">
        <strong>Processo</strong>
        <span>{textoOuPadrao(item["Número do PPCI / Processo CBMRS"])}</span>
      </div>

      <div className="progress-container progress-container-compacto">
        <div className="progress-header">
          <span>Conclusão</span>
          <strong>{conclusao}%</strong>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${conclusao}%` }}
          />
        </div>
      </div>

      <div className="card-meta-grid">
        <div className="card-meta-item">
          <span>Responsável</span>
          <strong>{textoOuPadrao(item.Responsável)}</strong>
        </div>

        <div className="card-meta-item">
          <span>Vencimento</span>
          <strong>
            {textoOuPadrao(
              formatarData(item["Data limite / vencimento PPCI"]),
              "-"
            )}
          </strong>
        </div>
      </div>

      <div className={`card-prazo-chip ${classePrazo}`}>{textoDias}</div>

      <div className="card-providencia card-providencia-compacta">
        <span>Próximo passo</span>
        <p>{textoOuPadrao(item["Providência / Próximo passo"])}</p>
      </div>
    </article>
  );
}
