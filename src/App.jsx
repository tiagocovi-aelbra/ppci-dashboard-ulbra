/* =====================================================
   IMPORTS
===================================================== */

import { useEffect, useState } from "react";
import { getPPCIs } from "./Services/api";
import "./App.css";

/* =====================================================
   COMPONENTE PRINCIPAL
===================================================== */

function App() {

/* =====================================================
   ESTADOS
===================================================== */

const [ppcis, setPpcis] = useState([]);

const [loading, setLoading] = useState(false);

const [filtro, setFiltro] = useState("");
const [filtroSituacao, setFiltroSituacao] = useState("");
const [filtroStatus, setFiltroStatus] = useState("");
const [filtroCategoria, setFiltroCategoria] = useState("");

const [ordenacao, setOrdenacao] =
  useState("prioridade");

const [ultimaAtualizacao, setUltimaAtualizacao] =
  useState("");

const [ppciSelecionado, setPpciSelecionado] =
  useState(null);

const [mostrarAnalise, setMostrarAnalise] =
  useState(false);

const [
  mostrarResponsabilidades,
  setMostrarResponsabilidades
] = useState(false);

/* =====================================================
   CARREGAMENTO DOS DADOS
===================================================== */

async function carregarDados() {

  try {

    setLoading(true);

    const dados = await getPPCIs();

    setPpcis(dados);

    setUltimaAtualizacao(
      new Date().toLocaleString("pt-BR")
    );

  } catch (erro) {

    console.error(
      "Erro ao carregar dados:",
      erro
    );

    alert(
      "Erro ao carregar dados da planilha."
    );

  } finally {

    setLoading(false);

  }

}

/* =====================================================
   INICIALIZAÇÃO
===================================================== */

useEffect(() => {

  carregarDados();

}, []);

/* =====================================================
   FUNÇÕES DE DATA
===================================================== */

function formatarData(data) {

  if (!data) {
    return "-";
  }

  const dataObj = new Date(data);

  if (isNaN(dataObj.getTime())) {
    return "-";
  }

  return dataObj.toLocaleDateString(
    "pt-BR"
  );

}

/* =====================================================
   FUNÇÕES DE VENCIMENTO
===================================================== */

function obterDiasParaVencer(
  dataVencimento
) {

  if (!dataVencimento) {
    return null;
  }

  const hoje = new Date();

  const vencimento =
    new Date(dataVencimento);

  return Math.ceil(
    (vencimento - hoje) /
    (1000 * 60 * 60 * 24)
  );

}

function obterClasseVencimento(
  dataVencimento
) {

  if (!dataVencimento) {

    return "vencimento-sem-data";

  }

  const hoje = new Date();

  const vencimento =
    new Date(dataVencimento);

  const diferencaDias = Math.ceil(
    (vencimento - hoje) /
    (1000 * 60 * 60 * 24)
  );

  if (diferencaDias < 0) {

    return "vencimento-vencido";

  }

  if (diferencaDias <= 60) {

    return "vencimento-critico";

  }

  if (diferencaDias <= 180) {

    return "vencimento-atencao";

  }

  return "vencimento-ok";

}

/* =====================================================
   AGRUPAMENTOS ESTATÍSTICOS
===================================================== */



/* =====================================================
   AGRUPAMENTO POR STATUS
===================================================== */

const statusCount = {};

ppcis.forEach((item) => {

  const status =
    item["Status / Situação"]?.trim() ||
    "Sem Status";

  statusCount[status] =
    (statusCount[status] || 0) + 1;

});

const statusOrdenados =
  Object.entries(statusCount)
    .sort((a, b) => b[1] - a[1]);

/* =====================================================
   AGRUPAMENTO POR CATEGORIA
===================================================== */

const categoriaCount = {};

ppcis.forEach((item) => {

  const categoria =
    item.Categoria?.trim() ||
    "Sem Categoria";

  categoriaCount[categoria] =
    (categoriaCount[categoria] || 0) + 1;

});

const categoriasOrdenadas =
  Object.entries(categoriaCount)
    .sort((a, b) => b[1] - a[1]);

/* =====================================================
   AGRUPAMENTO POR RESPONSÁVEL
===================================================== */

const responsavelCount = {};

ppcis.forEach((item) => {

  const responsavel =
    item.Responsável?.trim() ||
    "Sem Responsável";

  responsavelCount[responsavel] =
    (responsavelCount[responsavel] || 0) + 1;

});

const responsaveisOrdenados =
  Object.entries(responsavelCount)
    .sort((a, b) => b[1] - a[1]);

/* =====================================================
   AGRUPAMENTO POR UNIDADE
===================================================== */

const unidadeCount = {};

ppcis.forEach((item) => {

  const unidade =
    item.Unidade?.trim() ||
    "Sem Unidade";

  unidadeCount[unidade] =
    (unidadeCount[unidade] || 0) + 1;

});

const unidadesOrdenadas =
  Object.entries(unidadeCount)
    .sort((a, b) => b[1] - a[1]);

/* =====================================================
   LISTA DE CATEGORIAS
===================================================== */

const categorias = [

  ...new Set(

    ppcis
      .map(item => item.Categoria)
      .filter(Boolean)

  )

].sort();

/* =====================================================
   ORDENAÇÃO DOS PPCIs
===================================================== */

const ppcisOrdenados =
  [...ppcis].sort((a, b) => {

    if (ordenacao === "prioridade") {

      return (
        Number(a.Prioridade || 999) -
        Number(b.Prioridade || 999)
      );

    }

    if (ordenacao === "vencimento") {

      return (
        new Date(
          a["Data limite / vencimento PPCI"]
        ) -
        new Date(
          b["Data limite / vencimento PPCI"]
        )
      );

    }

    if (ordenacao === "predio") {

      return (
        a["Prédio / Edificação"] || ""
      ).localeCompare(
        b["Prédio / Edificação"] || ""
      );

    }

    if (ordenacao === "responsavel") {

      return (
        a.Responsável || ""
      ).localeCompare(
        b.Responsável || ""
      );

    }

    return 0;

  });

/* =====================================================
   INDICADORES GERENCIAIS
===================================================== */

const totalPPCIs =
  ppcis.length;

const vencidos =
  ppcis.filter((item) => {

    const dias =
      obterDiasParaVencer(
        item["Data limite / vencimento PPCI"]
      );

    return (
      dias !== null &&
      dias < 0
    );

  }).length;

const criticos =
  ppcis.filter((item) => {

    const dias =
      obterDiasParaVencer(
        item["Data limite / vencimento PPCI"]
      );

    return (
      dias !== null &&
      dias >= 0 &&
      dias <= 60
    );

  }).length;

const semData =
  ppcis.filter((item) => {

    const dias =
      obterDiasParaVencer(
        item["Data limite / vencimento PPCI"]
      );

    return dias === null;

  }).length;

const regulares =
  totalPPCIs -
  vencidos -
  criticos -
  semData;

const mediaConclusao =
  totalPPCIs > 0
    ? Math.round(

        ppcis.reduce(

          (acc, item) =>
            acc +
            (
              item["% Conclusão"] || 0
            ),

          0

        ) /

        totalPPCIs *

        100

      )
    : 0;

/* =====================================================
   FILTROS DOS PPCIs
===================================================== */

const ppcisFiltrados =
  ppcisOrdenados.filter((item) => {

    const diasOriginais =
      obterDiasParaVencer(
        item["Data limite / vencimento PPCI"]
     );

    const dias =
      diasOriginais ?? 9999;

    const textoBusca = `

      ${item.ID || ""}
      ${item.Unidade || ""}
      ${item["Prédio / Edificação"] || ""}
      ${item.Responsável || ""}
      ${item.Solicitante || ""}
      ${item["Número do PPCI / Processo CBMRS"] || ""}
      ${item["Status / Situação"] || ""}
      ${item["Providência / Próximo passo"] || ""}

    `.toLowerCase();

    if (
      filtroSituacao === "vencidos" &&
      dias >= 0
  ) {
      return false;
    }

    if (
      filtroSituacao === "criticos" &&
      !(dias >= 0 && dias <= 60)
  ) {
      return false;
    }

    if (
      filtroSituacao === "regulares" &&
      (
        diasOriginais === null ||      
        dias <= 60
      )
  ) {
      return false;
    }

    if (
      filtroSituacao === "semData" &&
      diasOriginais !== null
  ) {
      return false;
    }
    const statusItem =
    item["Status / Situação"]?.trim() ||
    "Sem Status";
    if (
     filtroStatus &&
     statusItem !== filtroStatus
    ) {
     return false;
    }

    return textoBusca.includes(
      filtro.toLowerCase()
    );

  });

/* =====================================================
   EXPORTAÇÃO CSV
===================================================== */

function exportarCSV() {

  const cabecalho = [

    "ID",
    "Categoria",
    "Unidade",
    "Prédio",
    "Status",
    "Responsável",
    "Solicitante",
    "Entrada",
    "Vencimento",
    "Prioridade"

  ];

  const linhas =
    ppcisFiltrados.map((item) => [

      item.ID,
      item.Categoria,
      item.Unidade,
      item["Prédio / Edificação"],
      item["Status / Situação"],
      item.Responsável,
      item.Solicitante,
      item["Data de entrada"],
      item["Data limite / vencimento PPCI"],
      item.Prioridade

    ]);

  const csv = [

    cabecalho.join(";"),

    ...linhas.map(
      (linha) => linha.join(";")
    )

  ].join("\n");

  const blob = new Blob(

    [csv],

    {
      type:
        "text/csv;charset=utf-8;"
    }

  );

  const link =
    document.createElement("a");

  link.href =
    URL.createObjectURL(blob);

  link.download =
    "PPCIs_Filtrados.csv";

  link.click();

}

/* =====================================================
   LIMPEZA DE FILTROS
===================================================== */

function limparFiltros() {

  setFiltro("");

  setFiltroStatus("");

  setFiltroSituacao("");

  setFiltroCategoria("");

  setOrdenacao(
    "prioridade"
  );

}

/* =====================================================
   PREPARAÇÃO PARA EVOLUÇÕES FUTURAS
===================================================== */

/*
  Sprint 1.4

  - Gráficos Horizontais
  - Ranking de Prioridades
  - Modal em Abas
  - Dashboard por Responsável
  - Dashboard por Unidade
*/

/* =====================================================
   INTERFACE
===================================================== */

return (

  <div className="container">

    {/* =====================================================
        HEADER
    ===================================================== */}

    <div className="header">

      <h1>
        Painel PPCI
      </h1>

      <p>
        Infraestrutura ULBRA
      </p>

      <h2
        style={{
          marginTop: "12px",
          marginBottom: "4px"
        }}
      >
        {ppcisFiltrados.length}
        {" "}
        PPCIs Monitorados
      </h2>

      <p
        style={{
          margin: 0,
          fontSize: "14px",
          opacity: 0.9
        }}
      >
        Exibindo
        {" "}
        {ppcisFiltrados.length}
        {" "}
        de
        {" "}
        {ppcis.length}
        {" "}
        PPCIs
      </p>

      <div
        className="ultima-atualizacao"
      >
        Última atualização:
        {" "}
        {ultimaAtualizacao}
      </div>

    </div>

    {/* =====================================================
        PAINÉIS EXECUTIVOS
    ===================================================== */}

{/* =====================================================
   ANÁLISE DA CARTEIRA PPCI
===================================================== */}

<div className="secao-painel">

  <h3
    className="secao-titulo titulo-expansivel"
    onClick={() =>
      setMostrarAnalise(
        !mostrarAnalise
      )
    }
  >

    <span className="icone-expansivel">
      {mostrarAnalise ? "▼" : "▶"}
    </span>

    <span>
      ANÁLISE DA CARTEIRA PPCI
    </span>

  </h3>

  {mostrarAnalise && (

    <div className="graficos-grid">

      <div className="grafico-card">

        <h4>
          Status dos PPCIs
        </h4>

        {statusOrdenados.map(
          ([status, quantidade]) => (

            <div
              key={status}
              className="grafico-item"
            >

              <span>
                {status}
              </span>

              <strong>
                {quantidade}
              </strong>

            </div>

          )
        )}

      </div>

      <div className="grafico-card">

        <h4>
          Categorias
        </h4>

        {categoriasOrdenadas.map(
          ([categoria, quantidade]) => (

            <div
              key={categoria}
              className="grafico-item"
            >

              <span>
                {categoria}
              </span>

              <strong>
                {quantidade}
              </strong>

            </div>

          )
        )}

      </div>

    </div>

  )}

</div>

{/* =====================================================
   DISTRIBUIÇÃO DAS RESPONSABILIDADES
===================================================== */}

<div className="secao-painel">

  <h3
    className="secao-titulo titulo-expansivel"
    onClick={() =>
      setMostrarResponsabilidades(
        !mostrarResponsabilidades
      )
    }
  >

    <span className="icone-expansivel">
      {
        mostrarResponsabilidades
          ? "▼"
          : "▶"
      }
    </span>

    <span>
      DISTRIBUIÇÃO DAS RESPONSABILIDADES
    </span>

  </h3>

  {mostrarResponsabilidades && (

    <div className="graficos-grid">

      <div className="grafico-card">

        <h4>
          Responsáveis
        </h4>

        {
          responsaveisOrdenados.map(
            ([responsavel, quantidade]) => (

              <div
                key={responsavel}
                className="grafico-item"
              >

                <span>
                  {responsavel}
                </span>

                <strong>
                  {quantidade}
                </strong>

              </div>

            )
          )
        }

      </div>

      <div className="grafico-card">

        <h4>
          Unidades
        </h4>

        {
          unidadesOrdenadas.map(
            ([unidade, quantidade]) => (

              <div
                key={unidade}
                className="grafico-item"
              >

                <span>
                  {unidade}
                </span>

                <strong>
                  {quantidade}
                </strong>

              </div>

            )
          )
        }

      </div>

    </div>

  )}

</div>

{/* =====================================================
   STATUS DOS PPCIs
===================================================== */}

<div className="secao-painel">

  <h3 className="secao-titulo">
    STATUS DOS PPCIs
  </h3>

  <div className="kpis">

    {statusOrdenados.map(
      ([status, quantidade]) => (

        <div
          key={status}
          className={`kpi-card ${
            filtroStatus === status
              ? "kpi-ativo"
              : ""
          }`}
          onClick={() =>
            setFiltroStatus(
              filtroStatus === status
                ? ""
                : status
            )
          }
        >

          <div className="kpi-number">
            {quantidade}
          </div>

          <div>
            {status}
          </div>

        </div>

      )
    )}

  </div>

</div>

{/* =====================================================
   SITUAÇÃO GERAL
===================================================== */}

<div className="secao-painel">

  <h3 className="secao-titulo">
    SITUAÇÃO GERAL
  </h3>

  <div className="kpis-gerenciais">

    <div
      className={`kpi-card ${
        filtroSituacao === "vencidos"
          ? "kpi-ativo"
          : ""
      }`}

      onClick={() =>
        setFiltroSituacao(
          filtroSituacao === "vencidos"
            ? ""
            : "vencidos"
        )
      }
    >

      <div className="kpi-number">
        {vencidos}
      </div>

      <div>
        Vencidos
      </div>

    </div>

    <div
      className={`kpi-card ${
        filtroSituacao === "criticos"
          ? "kpi-ativo"
          : ""
      }`}
      onClick={() =>
        setFiltroSituacao(
          filtroSituacao === "criticos"
            ? ""
            : "criticos"
        )
      }
    >

      <div className="kpi-number">
        {criticos}
      </div>

      <div>
        Críticos
      </div>

    </div>

    <div
      className={`kpi-card ${
        filtroSituacao === "regulares"
          ? "kpi-ativo"
          : ""
      }`}
      onClick={() =>
        setFiltroSituacao(
          filtroSituacao === "regulares"
            ? ""
            : "regulares"
        )
      }
    >

      <div className="kpi-number">
        {regulares}
      </div>

      <div>
        Regulares
      </div>

    </div>
    
    <div
      className={`kpi-card ${
      filtroSituacao === "semData"
        ? "kpi-ativo"
        : ""
    }`}
    onClick={() =>
      setFiltroSituacao(
        filtroSituacao === "semData"
          ? ""
          : "semData"
    )
  }
>

  <div className="kpi-number">
    {semData}
  </div>

  <div>
    Sem Data
  </div>

  </div>
  
  </div>

  <div className="resumo-conclusao">

    <div className="resumo-titulo">
      CONCLUSÃO MÉDIA GERAL
    </div>

    <div className="progress-bar-geral">

      <div
        className="progress-fill-geral"
        style={{
          width: `${mediaConclusao}%`,
          background:
            mediaConclusao < 40
              ? "#d32f2f"
              : mediaConclusao < 70
              ? "#f9a825"
              : "#2e7d32"
        }}
      />

    </div>

    <div className="resumo-percentual">
      {mediaConclusao}%
    </div>

  </div>

</div>

{/* =====================================================
   FILTROS E CONTROLES
===================================================== */}

<div className="secao-painel">

  <h3 className="secao-titulo">
    FILTROS E CONTROLES
  </h3>

  <div className="filtros-grid">

    <div className="grupo-filtro">

      <label className="filtro-label">
        🔎 Buscar PPCI
      </label>

      <input
        type="text"
        placeholder="Digite qualquer informação..."
        value={filtro}
        onChange={(e) =>
          setFiltro(e.target.value)
        }
        className="campo-busca"
      />

    </div>

    <div className="grupo-filtro">

      <label className="filtro-label">
        📂 Categoria
      </label>

      <select
        value={filtroCategoria}
        onChange={(e) =>
          setFiltroCategoria(
            e.target.value
          )
        }
        className="campo-categoria"
      >

        <option value="">
          Todas as Categorias
        </option>

        {categorias.map(
          (categoria) => (

            <option
              key={categoria}
              value={categoria}
            >
              {categoria}
            </option>

          )
        )}

      </select>

    </div>

    <div className="grupo-filtro">

      <label className="filtro-label">
        ⇅ Ordenar por
      </label>

      <select
        value={ordenacao}
        onChange={(e) =>
          setOrdenacao(
            e.target.value
          )
        }
        className="campo-categoria"
      >

        <option value="prioridade">
          Prioridade
        </option>

        <option value="vencimento">
          Vencimento
        </option>

        <option value="predio">
          Prédio
        </option>

        <option value="responsavel">
          Responsável
        </option>

      </select>

    </div>

  </div>

  <div className="acoes-filtros">

    <button
      className="btn-limpar"
      onClick={limparFiltros}
    >
      Limpar Filtros
    </button>

    <button
      className="btn-exportar"
      onClick={exportarCSV}
    >
      Exportar CSV
    </button>

    <button
      className="btn-atualizar"
      onClick={carregarDados}
    >
      Atualizar Dados
    </button>

  </div>

</div>

{/* =====================================================
   PPCIs MONITORADOS
===================================================== */}

<div className="secao-painel">

  <h3 className="secao-titulo">
    PPCIs MONITORADOS
  </h3>

  <div className="cards-grid">

    {ppcisFiltrados.map((item) => {

      const dias =
        obterDiasParaVencer(
          item["Data limite / vencimento PPCI"]
        ) ?? 9999;

      return (

        <div
          key={item.ID}
          className={`ppci-card ${obterClasseVencimento(
            item["Data limite / vencimento PPCI"]
          )}`}
          onClick={() =>
            setPpciSelecionado(item)
          }
          style={{
            cursor: "pointer"
          }}
        >

          <div className="card-header">

            <div className="card-id">
              {item.ID}
            </div>

            <div className="card-prioridade">
              {item.Prioridade}
            </div>

          </div>

          {dias < 0 && (

            <div className="badge-vencido">
              🚫 PPCI VENCIDO
            </div>

          )}

          {dias >= 0 &&
            dias <= 60 && (

            <div className="badge-alerta">
              ⚠ VENCE EM {dias} DIAS
            </div>

          )}

          <div className="card-local">
            {item.Unidade}
          </div>

          <div className="card-predio">
            {
              item[
                "Prédio / Edificação"
              ]
            }
          </div>

          <div className="progress-container">

            <div className="progress-header">

              <span>
                Conclusão
              </span>

              <span>
                {Math.round(
                  (
                    item["% Conclusão"] ?? 0
                  ) * 100
                )}
                %
              </span>

            </div>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{
                  width: `${Math.round(
                    (
                      item["% Conclusão"] ?? 0
                    ) * 100
                  )}%`
                }}
              />

            </div>

          </div>

          <div className="card-linha">

            <strong>
              Responsável:
            </strong>

            {" "}

            {item.Responsável}

          </div>

          <div className="card-linha">

            <strong>
              Solicitante:
            </strong>

            {" "}

            {item.Solicitante}

          </div>

          <div className="card-linha">

            <strong>
              Entrada:
            </strong>

            {" "}

            {
              formatarData(
                item["Data de entrada"]
              )
            }

          </div>

          <div className="card-linha">

            <strong>
              Vencimento:
            </strong>

            {" "}

            {
              formatarData(
                item[
                  "Data limite / vencimento PPCI"
                ]
              )
            }

          </div>

          <div className="card-vencimento">

            {dias < 0
              ? `Vencido há ${Math.abs(
                  dias
                )} dias`
              : `${dias} dias para vencer`
            }

          </div>

          <div className="card-providencia">

            <span>
              Próximo Passo
            </span>

            <p>
              {
                item[
                  "Providência / Próximo passo"
                ]
              }
            </p>

          </div>

        </div>

      );

    })}

  </div>

</div>

{/* =====================================================
   MODAL DETALHADO PPCI
===================================================== */}

{ppciSelecionado && (

  <div
    className="modal-overlay"
    onClick={() =>
      setPpciSelecionado(null)
    }
  >

    <div
      className="modal-content"
      onClick={(e) =>
        e.stopPropagation()
      }
    >

      {/* -------------------------------------
         FECHAR MODAL
      ------------------------------------- */}

      <button
        className="modal-close"
        onClick={() =>
          setPpciSelecionado(null)
        }
      >
        ✕
      </button>

      {/* -------------------------------------
         CABEÇALHO
      ------------------------------------- */}

      <h2>
        {ppciSelecionado.ID}
      </h2>

      <h3>
        {
          ppciSelecionado[
            "Prédio / Edificação"
          ]
        }
      </h3>

      {/* -------------------------------------
         DADOS GERAIS
      ------------------------------------- */}

      <div className="modal-grid">

        <div>
          <strong>Categoria</strong>
          <br />
          {ppciSelecionado.Categoria}
        </div>

        <div>
          <strong>Unidade</strong>
          <br />
          {ppciSelecionado.Unidade}
        </div>

        <div>
          <strong>Status</strong>
          <br />
          {
            ppciSelecionado[
              "Status / Situação"
            ]
          }
        </div>

        <div>
          <strong>Prioridade</strong>
          <br />
          {ppciSelecionado.Prioridade}
        </div>

        <div>
          <strong>Responsável</strong>
          <br />
          {ppciSelecionado.Responsável}
        </div>

        <div>
          <strong>Solicitante</strong>
          <br />
          {ppciSelecionado.Solicitante}
        </div>

      </div>

      {/* -------------------------------------
         PROCESSO CBMRS
      ------------------------------------- */}

      <div className="modal-secao">

        <h4>
          Processo CBM-RS
        </h4>

        <p>

          {
            ppciSelecionado[
              "Número do PPCI / Processo CBMRS"
            ]
          }

        </p>

      </div>

      {/* -------------------------------------
         CRONOGRAMA
      ------------------------------------- */}

      <div className="modal-secao">

        <h4>
          Cronograma
        </h4>

        <p>

          <strong>
            Entrada:
          </strong>

          {" "}

          {
            formatarData(
              ppciSelecionado[
                "Data de entrada"
              ]
            )
          }

        </p>

        <p>

          <strong>
            Vencimento:
          </strong>

          {" "}

          {
            formatarData(
              ppciSelecionado[
                "Data limite / vencimento PPCI"
              ]
            )
          }

        </p>

      </div>

      {/* -------------------------------------
         ANDAMENTO
      ------------------------------------- */}

      <div className="modal-secao">

        <h4>
          Andamento
        </h4>

        <p>

          {Math.round(

            (
              ppciSelecionado[
                "% Conclusão"
              ] ?? 0
            ) * 100

          )}%

        </p>

      </div>

      {/* -------------------------------------
         PROVIDÊNCIAS
      ------------------------------------- */}

      <div className="modal-secao">

        <h4>
          Próximo Passo
        </h4>

        <p>

          {
            ppciSelecionado[
              "Providência / Próximo passo"
            ]
          }

        </p>

      </div>

    </div>

  </div>

)}

{/* =====================================================
   ENCERRAMENTO DO COMPONENTE
===================================================== */}

  </div>

);

}

/* =====================================================
   EXPORT DEFAULT
===================================================== */

export default App;