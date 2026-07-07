/* =========================================================
   RELEASE........: v1.0.0 RC1
   ARQUIVO........: src/components/Cards/CardPPCI.jsx
========================================================= */

import React from "react";

export default function CardPPCI({
  item,
  dias,
  textoOuPadrao,
  formatarData,
  obterClasseVencimento,
  aplicarFiltroRapido,
  setPpciSelecionado
}) {
  return (
    <div
      className={`ppci-card ${obterClasseVencimento(item["Data limite / vencimento PPCI"])}`}
      onClick={() => setPpciSelecionado(item)}
      onKeyDown={(e)=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); setPpciSelecionado(item);} }}
      style={{ cursor: "pointer" }}
      role="button"
      tabIndex={0}
    >
      <div className="card-header">
        <div className="card-id">{item.ID}</div>

        <div className={`card-prioridade prioridade-${textoOuPadrao(item.Prioridade,"0")}`}>
          P{textoOuPadrao(item.Prioridade,"0")}
        </div>
      </div>

      {dias < 0 && <div className="badge-vencido">🚫 PPCI VENCIDO</div>}
      {dias >= 0 && dias <= 60 && (
        <div className="badge-alerta">⚠ VENCE EM {dias} DIAS</div>
      )}

      <div className="card-identificacao">
        <div className="card-local">{textoOuPadrao(item.Unidade)}</div>
        <div className="card-predio">
          {textoOuPadrao(item["Prédio / Edificação"])}
        </div>
      </div>

      <div className="card-badges">
        <button
          className="badge-categoria"
          onClick={(e)=>{
            e.stopPropagation();
            aplicarFiltroRapido("categoria",item.Categoria);
          }}
        >
          {textoOuPadrao(item.Categoria)}
        </button>

        <button
          className="badge-status"
          onClick={(e)=>{
            e.stopPropagation();
            aplicarFiltroRapido("status",item["Status / Situação"]);
          }}
        >
          {textoOuPadrao(item["Status / Situação"],"Sem Status")}
        </button>
      </div>

      <div className="card-processo">
        <strong>Processo:</strong>{" "}
        {textoOuPadrao(item["Número do PPCI / Processo CBMRS"])}
      </div>

      <div className="progress-container">
        <div className="progress-header">
          <span>Conclusão</span>
          <span>{Math.round((item["% Conclusão"] ?? 0)*100)}%</span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{width:`${Math.round((item["% Conclusão"]??0)*100)}%`}}
          />
        </div>
      </div>

      <div className="card-bloco">
        <div className="card-linha">
          <strong>Responsável:</strong> {textoOuPadrao(item.Responsável)}
        </div>

        <div className="card-linha">
          <strong>Solicitante:</strong> {textoOuPadrao(item.Solicitante)}
        </div>
      </div>

      <div className="card-bloco">
        <div className="card-linha">
          <strong>Entrada:</strong> {textoOuPadrao(formatarData(item["Data de entrada"]),"-")}
        </div>

        <div className="card-linha">
          <strong>Vencimento:</strong> {textoOuPadrao(formatarData(item["Data limite / vencimento PPCI"]),"-")}
        </div>

        <div className="card-vencimento">
          {dias===9999?"Sem data":
           dias<0?`Vencido há ${Math.abs(dias)} dias`:
           dias===0?"Vence hoje":
           dias===1?"Vence amanhã":
           `${dias} dias para vencer`}
        </div>
      </div>

      <div className="card-providencia">
        <span>Próximo Passo</span>
        <p>{textoOuPadrao(item["Providência / Próximo passo"])}
        </p>
      </div>
    </div>
  );
}
