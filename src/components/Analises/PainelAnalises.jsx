/* =========================================================
   RELEASE........: v1.0.1 RC1
   ARQUIVO........: src/components/Analises/PainelAnalises.jsx

   RESPONSABILIDADE:
   Agrupar todos os painéis analíticos do Dashboard.
========================================================= */

import React from "react";

import AnaliseCarteira from "./AnaliseCarteira";
import DistribuicaoResponsabilidades from "./DistribuicaoResponsabilidades";

export default function PainelAnalises({

  mostrarAnalise,
  setMostrarAnalise,

  mostrarResponsabilidades,
  setMostrarResponsabilidades,

  statusOrdenados,
  categoriasOrdenadas,

  responsaveisOrdenados,
  unidadesOrdenadas,

  aplicarFiltroRapido

}) {

  return (

    <>

      <AnaliseCarteira

        mostrar={mostrarAnalise}

        setMostrar={setMostrarAnalise}

        statusOrdenados={statusOrdenados}

        categoriasOrdenadas={categoriasOrdenadas}

        aplicarFiltroRapido={aplicarFiltroRapido}

      />

      <DistribuicaoResponsabilidades

        mostrar={mostrarResponsabilidades}

        setMostrar={setMostrarResponsabilidades}

        responsaveisOrdenados={responsaveisOrdenados}

        unidadesOrdenadas={unidadesOrdenadas}

        aplicarFiltroRapido={aplicarFiltroRapido}

      />

    </>

  );

}