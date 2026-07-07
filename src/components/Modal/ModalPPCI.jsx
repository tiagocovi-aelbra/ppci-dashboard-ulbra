/* =========================================================
   RELEASE........: v1.0.0 RC1
   ARQUIVO........: src/components/Modal/ModalPPCI.jsx
========================================================= */

import React, { useEffect, useState } from "react";
import { mapPPCI } from "../../domain";

export default function ModalPPCI({ ppciSelecionado, setPpciSelecionado, textoOuPadrao, formatarData }) {

  useEffect(() => {
    if (!ppciSelecionado) return;
    const onKey=(e)=>{ if(e.key==="Escape") setPpciSelecionado(null); };
    window.addEventListener("keydown",onKey);
    return ()=>window.removeEventListener("keydown",onKey);
  }, [ppciSelecionado,setPpciSelecionado]);

  if (!ppciSelecionado) return null;
      const ppci = mapPPCI(ppciSelecionado);

      const [abaAtual, setAbaAtual] = useState("geral");

      const conclusao = Math.round((ppci.conclusao ?? 0) * 100);

  return (
    <div className="modal-overlay" onClick={() => setPpciSelecionado(null)}>
      <div className="modal-content" onClick={(e)=>e.stopPropagation()}>
        <button className="modal-close" onClick={()=>setPpciSelecionado(null)}>✕</button>
        <h2>{ppci.id}</h2>
        <h3>{textoOuPadrao(ppci.predio)}</h3>
        <p className="modal-unidade">{textoOuPadrao(ppci.unidade)}</p>
        <div className="modal-progresso">
          <div className="progress-header"><span>Conclusão</span><strong>{conclusao}%</strong></div>
          <div className="progress-bar"><div className="progress-fill" style={{width:`${conclusao}%`}} /></div>
        </div>
        <div className="modal-grid">
          <div><strong>Categoria</strong><br />{textoOuPadrao(ppciSelecionado.Categoria)}</div>
          <div><strong>Status</strong><br />{textoOuPadrao(ppciSelecionado["Status / Situação"],"Sem Status")}</div>
          <div><strong>Prioridade</strong><br />{textoOuPadrao(ppciSelecionado.Prioridade)}</div>
          <div><strong>Responsável</strong><br />{textoOuPadrao(ppciSelecionado.Responsável)}</div>
          <div><strong>Solicitante</strong><br />{textoOuPadrao(ppciSelecionado.Solicitante)}</div>
          <div><strong>Processo</strong><br />{textoOuPadrao(ppciSelecionado["Número do PPCI / Processo CBMRS"])}</div>
        </div>
        <div className="modal-secao">
          <h4>Cronograma</h4>
          <p><strong>Entrada:</strong> {textoOuPadrao(formatarData(ppciSelecionado["Data de entrada"]),"-")}</p>
          <p><strong>Vencimento:</strong> {textoOuPadrao(formatarData(ppciSelecionado["Data limite / vencimento PPCI"]),"-")}</p>
        </div>
        <div className="modal-secao">
          <h4>Próximo Passo</h4>
          <p>{textoOuPadrao(ppciSelecionado["Providência / Próximo passo"])}</p>
        </div>
      </div>
    </div>
  );
}
