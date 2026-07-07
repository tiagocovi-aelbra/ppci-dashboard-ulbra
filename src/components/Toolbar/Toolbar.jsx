/* =========================================================
   RELEASE........: v1.0.0 RC1
   ARQUIVO........: Toolbar.jsx

   RESPONSABILIDADE:
   Barra principal de filtros e ações.
========================================================= */

import React from "react";

import Busca from "./Busca";
import Categoria from "./Categoria";
import Ordenacao from "./Ordenacao";
import Acoes from "./Acoes";

export default function Toolbar({

    filtro,
    setFiltro,

    categorias,

    filtroCategoria,
    setFiltroCategoria,

    ordenacao,
    setOrdenacao,

    onAtualizar,
    onExportar,
    onLimpar

}) {

    return (

        <div className="toolbar">

            <Busca
                filtro={filtro}
                setFiltro={setFiltro}
            />

            <Categoria
                categorias={categorias}
                filtroCategoria={filtroCategoria}
                setFiltroCategoria={setFiltroCategoria}
            />

            <Ordenacao
                ordenacao={ordenacao}
                setOrdenacao={setOrdenacao}
            />

            <Acoes
                onAtualizar={onAtualizar}
                onExportar={onExportar}
                onLimpar={onLimpar}
            />

        </div>

    );

}