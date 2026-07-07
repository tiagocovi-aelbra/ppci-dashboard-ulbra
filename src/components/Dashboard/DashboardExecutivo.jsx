/* =========================================================
   RELEASE........: v1.0.2 RC1
   ARQUIVO........: src/components/Dashboard/DashboardExecutivo.jsx

   RESPONSABILIDADE:
   Dashboard Executivo.
   Apenas apresenta os indicadores recebidos do App.jsx.
========================================================= */

import React from "react";

export default function DashboardExecutivo({

    statusOrdenados = [],
    maiorStatus = 1,

    vencidos = 0,
    criticos = 0,
    regulares = 0,
    semData = 0,

    maiorSituacao = 1,

    mediaConclusao = 0,

    filtroStatus,
    setFiltroStatus,

    filtroSituacao,
    setFiltroSituacao

}) {

    const situacoes = [

        {
            id: "vencidos",
            titulo: "Vencidos",
            quantidade: vencidos
        },

        {
            id: "criticos",
            titulo: "Críticos",
            quantidade: criticos
        },

        {
            id: "regulares",
            titulo: "Regulares",
            quantidade: regulares
        },

        {
            id: "semData",
            titulo: "Sem Data",
            quantidade: semData
        }

    ];

    return (

        <div className="dashboard-executivo">

            {/* STATUS */}

            <div className="dashboard-coluna">

                <h3>Status dos PPCIs</h3>

                {

                    statusOrdenados.map(([status, quantidade]) => (

                        <button

                            key={status}

                            type="button"

                            className={`barra-item ${filtroStatus === status ? "ativo" : ""}`}

                            onClick={() =>
                                setFiltroStatus(
                                    filtroStatus === status ? "" : status
                                )
                            }

                        >

                            <div className="barra-header">

                                <span>{status}</span>

                                <strong>{quantidade}</strong>

                            </div>

                            <div className="barra-fundo">

                                <div

                                    className="barra-preenchimento"

                                    style={{

                                        width: `${(quantidade / maiorStatus) * 100}%`

                                    }}

                                />

                            </div>

                        </button>

                    ))

                }

            </div>

            {/* SITUAÇÃO */}

            <div className="dashboard-coluna">

                <h3>Situação Geral</h3>

                {

                    situacoes.map((item) => (

                        <button

                            key={item.id}

                            type="button"

                            className={`barra-item ${filtroSituacao === item.id ? "ativo" : ""}`}

                            onClick={() =>
                                setFiltroSituacao(
                                    filtroSituacao === item.id ? "" : item.id
                                )
                            }

                        >

                            <div className="barra-header">

                                <span>{item.titulo}</span>

                                <strong>{item.quantidade}</strong>

                            </div>

                            <div className="barra-fundo">

                                <div

                                    className="barra-preenchimento"

                                    style={{

                                        width: `${(item.quantidade / maiorSituacao) * 100}%`

                                    }}

                                />

                            </div>

                        </button>

                    ))

                }

            </div>

            {/* CONCLUSÃO */}

            <div className="dashboard-conclusao">

                <h3>Conclusão Média</h3>

                <div className="barra-fundo">

                    <div

                        className="barra-preenchimento"

                        style={{

                            width: `${mediaConclusao}%`

                        }}

                    />

                </div>

                <strong>

                    {mediaConclusao}%

                </strong>

            </div>

        </div>

    );

}