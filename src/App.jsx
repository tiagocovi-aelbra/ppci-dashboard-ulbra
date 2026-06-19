import { useEffect, useState } from "react";
import { getPPCIs } from "./Services/api";
import "./App.css";

function App() {

const [ppcis, setPpcis] = useState([]);
const [loading, setLoading] = useState(false);
const [filtro, setFiltro] = useState("");
const [filtroSituacao, setFiltroSituacao] = useState("");
const [filtroStatus, setFiltroStatus] = useState("");
const [filtroCategoria, setFiltroCategoria] = useState("");

async function carregarDados() {

try {

  setLoading(true);

  const dados = await getPPCIs();

  setPpcis(dados);

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

useEffect(() => {

carregarDados();

}, []);

function formatarData(data) {

if (!data) return "-";

const dataObj = new Date(data);

if (isNaN(dataObj.getTime())) {
  return "-";
}

return dataObj.toLocaleDateString(
  "pt-BR"
);

}

function obterDiasParaVencer(dataVencimento) {

if (!dataVencimento) return null;

const hoje = new Date();

const vencimento = new Date(
  dataVencimento
);

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

const vencimento = new Date(
  dataVencimento
);

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
.sort(
(a, b) => b[1] - a[1]
);

const categorias = [
  ...new Set(
    ppcis
      .map(item => item.Categoria)
      .filter(Boolean)
  )
].sort();

const ppcisOrdenados = [...ppcis].sort(
  (a, b) =>
    Number(a.Prioridade || 999) -
    Number(b.Prioridade || 999)
);

  const totalPPCIs = ppcis.length;

  const vencidos = ppcis.filter((item) => {
    const dias = obterDiasParaVencer(
      item["Data limite / vencimento PPCI"]
    );
    return dias < 0;
  }).length;

  const criticos = ppcis.filter((item) => {
    const dias = obterDiasParaVencer(
      item["Data limite / vencimento PPCI"]
    );
    return dias >= 0 && dias <= 60;
  }).length;

  const emAnaliseCBMRS = ppcis.filter(
    (item) =>
      item["Status / Situação"] ===
      "Em análise no CBM-RS"
  ).length;

  const regulares =
  totalPPCIs -
  vencidos -
  criticos;

const ppcisFiltrados = ppcisOrdenados.filter(
  (item) => {

    const dias =
      obterDiasParaVencer(
        item["Data limite / vencimento PPCI"]
      ) ?? 9999;

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

    if (filtroSituacao === "vencidos" && dias >= 0)
      return false;

    if (filtroSituacao === "criticos" &&
        !(dias >= 0 && dias <= 60))
      return false;

    if (filtroSituacao === "regulares" &&
        dias <= 180)
      return false;

    if (
  filtroStatus &&
  item["Status / Situação"] !== filtroStatus
)
  return false;

if (
  filtroCategoria &&
  item.Categoria !== filtroCategoria
)
  return false;

    return textoBusca.includes(
      filtro.toLowerCase()
    );

  }
);

  function limparFiltros() {

    setFiltro("");
    setFiltroStatus("");
    setFiltroSituacao("");
    setFiltroCategoria("");
  }

return (

<div className="container">

  <div className="header">

    <h1>Painel PPCI</h1>

    <p>
      Infraestrutura ULBRA
    </p>

    <h2
      style={{
        marginTop: "12px",
        marginBottom: 0
      }}
    >
      {ppcisFiltrados.length} PPCIs Monitorados
    </h2>

  </div>

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
    <div>Vencidos</div>
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
    <div>Críticos</div>
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
    <div>Regulares</div>
  </div>
  </div>
</div>

<h3 className="secao-titulo">
  FILTROS E CONTROLES
</h3>

  <div
    style={{
      display: "flex",
      gap: "12px",
      marginBottom: "24px"
    }}
  >

    <button
      className="refresh-button"
      onClick={carregarDados}
    >

      {
        loading
          ? "Atualizando..."
          : "Atualizar Dados"
      }

    </button>

    <a
      href="https://docs.google.com/spreadsheets/d/1nlD5GDgkTGERM66a_o7jNi4M6JZESlKUihpk_JCdt60/edit?usp=sharing"
      target="_blank"
      rel="noreferrer"
      className="refresh-button"
      style={{
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center"
      }}
    >
      Editar Planilha
    </a>

    <button
     className="clear-button"
     onClick={limparFiltros}
    >
      Limpar Filtros
    </button>

  </div>

  <div className="filtro-container">

    {(
    filtroStatus ||
    filtroSituacao ||
    filtroCategoria
  ) && (
  <div className="filtros-ativos">

    {filtroStatus && (
      <span className="tag-filtro">
        Status: {filtroStatus}
      </span>
    )}

    {filtroSituacao && (
      <span className="tag-filtro">
        Situação: {filtroSituacao}
      </span>
    )}

    {filtroCategoria && (
      <span className="tag-filtro">
        Categoria: {filtroCategoria}
       </span>
    )}

  </div>

  )}
  
    <input
      type="text"
      placeholder="🔍 Buscar PPCI, prédio, responsável, processo..."
      value={filtro}
      onChange={(e) => setFiltro(e.target.value)}
      className="campo-busca"
    />

    <select
  value={filtroCategoria}
  onChange={(e) =>
    setFiltroCategoria(e.target.value)
  }
  className="campo-categoria"
>
  <option value="">
    Todas as Categorias
  </option>

  {categorias.map((categoria) => (
    <option
      key={categoria}
      value={categoria}
    >
      {categoria}
    </option>
  ))}
</select>

  </div>

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

          {item["Número do PPCI / Processo CBMRS"] && (

            <div className="card-processo">

              Processo:
              {" "}
              {item["Número do PPCI / Processo CBMRS"]}

            </div>

          )}

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

);

}

export default App;