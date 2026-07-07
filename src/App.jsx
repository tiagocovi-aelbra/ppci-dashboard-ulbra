/* =====================================================
   RELEASE........: v2.8.1 RC1
   ARQUIVO........: src/App.jsx
   DESCRIÇÃO......: Componente principal do Painel PPCI com status analítico mantido na carteira e removido do dashboard inferior
===================================================== */

/* =====================================================
   IMPORTS
===================================================== */

import "./App.css";

/* -----------------------------------------------------
   SERVICES
----------------------------------------------------- */

import { exportarCSV } from "./services/exportCSV";

/* -----------------------------------------------------
   HOOKS
----------------------------------------------------- */

import usePPCI from "./hooks/usePPCI";
import useFiltrosPainel from "./hooks/useFiltrosPainel";
import usePainelInterface from "./hooks/usePainelInterface";
import usePainelPPCIDados from "./hooks/usePainelPPCIDados";

/* -----------------------------------------------------
   UTILS
----------------------------------------------------- */

import {
  formatarData,
  textoOuPadrao,
  obterDiasParaVencer,
  obterClasseVencimento,
} from "./utils/ppciUtils";

/* -----------------------------------------------------
   COMPONENTES
----------------------------------------------------- */

import Header from "./components/Header";
import PainelFeedback from "./components/Feedback/PainelFeedback";
import DashboardExecutivo from "./components/Dashboard/DashboardExecutivo";
import PainelAnalises from "./components/Analises/PainelAnalises";
import Toolbar from "./components/Toolbar/Toolbar";
import CardsPPCI from "./components/Cards/CardsPPCI";
import ModalPPCI from "./components/Modal/ModalPPCI";

/* =====================================================
   COMPONENTE PRINCIPAL
===================================================== */

function App() {
  /* =====================================================
     DADOS PPCI
  ===================================================== */

  const {
    ppcis,
    loading,
    erro,
    ultimaAtualizacao,
    carregarDados,
  } = usePPCI();

  /* =====================================================
     FILTROS E ORDENAÇÃO
  ===================================================== */

  const filtrosPainel = useFiltrosPainel();

  const {
    filtro,
    setFiltro,
    filtroSituacao,
    setFiltroSituacao,
    ordenacao,
    setOrdenacao,
    aplicarFiltro,
    limparTodosFiltros,
  } = filtrosPainel;

  /* =====================================================
     ESTADOS DA INTERFACE
  ===================================================== */

  const {
    ppciSelecionado,
    setPpciSelecionado,
    mostrarAnalise,
    setMostrarAnalise,
    mostrarResponsabilidades,
    setMostrarResponsabilidades,
  } = usePainelInterface();

  /* =====================================================
     DADOS DERIVADOS DO PAINEL
  ===================================================== */

  const { ppcisFiltrados, dashboard } = usePainelPPCIDados(
    ppcis,
    filtrosPainel
  );

  const {
    statusOrdenados,
    categoriasOrdenadas,
    responsaveisOrdenados,
    unidadesOrdenadas,
    vencidos,
    criticos,
    regulares,
    semData,
    mediaConclusao,
    maiorSituacao,
  } = dashboard;

  const deveExibirConteudo = !loading && !erro && ppcis.length > 0;

  /* =====================================================
     INTERFACE
  ===================================================== */

  return (
    <div className="container">
      <Header
        totalPPCIs={ppcis.length}
        totalFiltrados={ppcisFiltrados.length}
        ultimaAtualizacao={ultimaAtualizacao}
      />

      <PainelFeedback
        loading={loading}
        erro={erro}
        total={ppcis.length}
        onTentarNovamente={carregarDados}
      />

      {deveExibirConteudo && (
        <>
          <PainelAnalises
            mostrarAnalise={mostrarAnalise}
            setMostrarAnalise={setMostrarAnalise}
            mostrarResponsabilidades={mostrarResponsabilidades}
            setMostrarResponsabilidades={setMostrarResponsabilidades}
            statusOrdenados={statusOrdenados}
            categoriasOrdenadas={categoriasOrdenadas}
            responsaveisOrdenados={responsaveisOrdenados}
            unidadesOrdenadas={unidadesOrdenadas}
            aplicarFiltroRapido={aplicarFiltro}
          />

          <DashboardExecutivo
            vencidos={vencidos}
            criticos={criticos}
            regulares={regulares}
            semData={semData}
            maiorSituacao={maiorSituacao}
            filtroSituacao={filtroSituacao}
            setFiltroSituacao={setFiltroSituacao}
            mediaConclusao={mediaConclusao}
          />

          <Toolbar
            filtro={filtro}
            setFiltro={setFiltro}
            ordenacao={ordenacao}
            setOrdenacao={setOrdenacao}
            onAtualizar={carregarDados}
            onExportar={() => exportarCSV(ppcisFiltrados)}
            onLimpar={limparTodosFiltros}
          />

          <CardsPPCI
            ppcis={ppcisFiltrados}
            setPpciSelecionado={setPpciSelecionado}
            formatarData={formatarData}
            textoOuPadrao={textoOuPadrao}
            obterClasseVencimento={obterClasseVencimento}
            obterDiasParaVencer={obterDiasParaVencer}
            aplicarFiltroRapido={aplicarFiltro}
          />

          <ModalPPCI
            ppciSelecionado={ppciSelecionado}
            setPpciSelecionado={setPpciSelecionado}
            formatarData={formatarData}
            textoOuPadrao={textoOuPadrao}
          />
        </>
      )}
    </div>
  );
}

/* =====================================================
   EXPORT DEFAULT
===================================================== */

export default App;
