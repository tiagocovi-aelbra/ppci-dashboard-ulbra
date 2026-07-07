/* =====================================================
   RELEASE........: v2.1.1 RC1
   ARQUIVO........: src/hooks/useFiltrosPainel.js
   DESCRIÇÃO......: Centralização dos estados e ações de filtro do Painel PPCI
===================================================== */

import { useState } from "react";

import {
  limparFiltros,
  aplicarFiltroRapido,
} from "./useFiltros";

export default function useFiltrosPainel() {
  const [filtro, setFiltro] = useState("");
  const [filtroSituacao, setFiltroSituacao] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroResponsavel, setFiltroResponsavel] = useState("");
  const [filtroUnidade, setFiltroUnidade] = useState("");
  const [ordenacao, setOrdenacao] = useState("prioridade");

  const setters = {
    setFiltro,
    setFiltroSituacao,
    setFiltroStatus,
    setFiltroCategoria,
    setFiltroResponsavel,
    setFiltroUnidade,
    setOrdenacao,
  };

  const aplicarFiltro = (tipo, valor) => {
    aplicarFiltroRapido(tipo, valor, setters);
  };

  const limparTodosFiltros = () => {
    limparFiltros(setters);
  };

  return {
    filtro,
    setFiltro,

    filtroSituacao,
    setFiltroSituacao,

    filtroStatus,
    setFiltroStatus,

    filtroCategoria,
    setFiltroCategoria,

    filtroResponsavel,
    setFiltroResponsavel,

    filtroUnidade,
    setFiltroUnidade,

    ordenacao,
    setOrdenacao,

    aplicarFiltro,
    limparTodosFiltros,
  };
}
