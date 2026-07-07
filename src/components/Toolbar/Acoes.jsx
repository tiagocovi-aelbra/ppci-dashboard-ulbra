/* =========================================================
   RELEASE........: v1.0.0 RC1
   COMPONENTE.....: Acoes
   CAMINHO........: src/components/Toolbar/Acoes.jsx
========================================================= */

import React from "react";

export default function Acoes({
  onLimpar,
  onExportar,
  onAtualizar
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
        className="refresh-button"
        onClick={onLimpar}
      >
        Limpar Filtros
      </button>

      <button
        className="refresh-button"
        onClick={onExportar}
      >
        Exportar CSV
      </button>

      <button
        className="refresh-button"
        onClick={onAtualizar}
      >
        Atualizar Dados
      </button>

      <button
        className="refresh-button"
        onClick={abrirPlanilha}
      >
        📄 Editar Planilha
      </button>

    </div>

  );

}
