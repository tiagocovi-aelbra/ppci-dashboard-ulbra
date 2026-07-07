/* =========================================================
   RELEASE........: v3.0.0 RC1
   COMPONENTE.....: Acoes
   CAMINHO........: src/components/Toolbar/Acoes.jsx
   DESCRIÇÃO......: Ações compactas da toolbar
========================================================= */

import React from "react";

export default function Acoes({
  onLimpar,
  onExportar,
  onAtualizar,
}) {
  const abrirPlanilha = () => {
    window.open(
      "https://docs.google.com/spreadsheets/d/1nlD5GDgkTGERM66a_o7jNi4M6JZESlKUihpk_JCdt60/edit?usp=sharing",
      "_blank"
    );
  };

  return (
    <div className="acoes toolbar-item">
      <button
        type="button"
        className="refresh-button refresh-button-secundario"
        onClick={onLimpar}
      >
        Limpar
      </button>

      <button
        type="button"
        className="refresh-button"
        onClick={onExportar}
      >
        CSV
      </button>

      <button
        type="button"
        className="refresh-button"
        onClick={onAtualizar}
      >
        Atualizar
      </button>

      <button
        type="button"
        className="refresh-button refresh-button-planilha"
        onClick={abrirPlanilha}
      >
        Planilha
      </button>
    </div>
  );
}
