/* =====================================================
   RELEASE........: v5.7.0 RC1
   ARQUIVO........: src/App.jsx
   DESCRIÇÃO......: Componente principal com preferências operacionais,
                    estado vazio aprimorado, saúde da base operacional
                    e qualidade gerencial da base cadastral
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
import useQualidadeDados from "./hooks/useQualidadeDados";

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
import FiltrosAtivos from "./components/FiltrosAtivos";
import PreferenciasPainel from "./components/Preferencias";
import QualidadeDados from "./components/QualidadeDados";
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
    filtroStatus,
    setFiltroStatus,
    filtroCategoria,
    setFiltroCategoria,
    filtroResponsavel,
    setFiltroResponsavel,
    filtroUnidade,
    setFiltroUnidade,
    filtroQualidade,
    setFiltroQualidade,
    ordenacao,
    setOrdenacao,
    aplicarFiltro,
    limparTodosFiltros,
    salvarVisaoAtual,
    restaurarVisaoSalva,
    limparPreferenciasLocais,
    preferenciasVersao,
    haVisaoSalva,
    dataVisaoSalva,
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

  const qualidadeDados = useQualidadeDados(ppcis);

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

          <PainelAnalises
            mostrarAnalise={mostrarAnalise}
            setMostrarAnalise={setMostrarAnalise}
            mostrarResponsabilidades={mostrarResponsabilidades}
            setMostrarResponsabilidades={setMostrarResponsabilidades}
            statusOrdenados={statusOrdenados}
            categoriasOrdenadas={categoriasOrdenadas}
            responsaveisOrdenados={responsaveisOrdenados}
            unidadesOrdenadas={unidadesOrdenadas}
            filtroStatus={filtroStatus}
            filtroCategoria={filtroCategoria}
            filtroResponsavel={filtroResponsavel}
            filtroUnidade={filtroUnidade}
            aplicarFiltroRapido={aplicarFiltro}
          />

          <QualidadeDados
            qualidade={qualidadeDados}
            filtroQualidade={filtroQualidade}
            onFiltrarPendencia={setFiltroQualidade}
            onSelecionarPPCI={setPpciSelecionado}
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

          <FiltrosAtivos
            filtro={filtro}
            filtroStatus={filtroStatus}
            filtroSituacao={filtroSituacao}
            filtroCategoria={filtroCategoria}
            filtroResponsavel={filtroResponsavel}
            filtroUnidade={filtroUnidade}
            filtroQualidade={filtroQualidade}
            setFiltro={setFiltro}
            setFiltroStatus={setFiltroStatus}
            setFiltroSituacao={setFiltroSituacao}
            setFiltroCategoria={setFiltroCategoria}
            setFiltroResponsavel={setFiltroResponsavel}
            setFiltroUnidade={setFiltroUnidade}
            setFiltroQualidade={setFiltroQualidade}
            onLimpar={limparTodosFiltros}
          />

          <PreferenciasPainel
            haVisaoSalva={haVisaoSalva}
            dataVisaoSalva={dataVisaoSalva}
            onSalvarVisao={salvarVisaoAtual}
            onRestaurarVisao={restaurarVisaoSalva}
            onLimparPreferencias={limparPreferenciasLocais}
          />

          <CardsPPCI
            ppcis={ppcisFiltrados}
            totalGeral={ppcis.length}
            ordenacao={ordenacao}
            filtrosAtivos={{
              busca: filtro,
              status: filtroStatus,
              situacao: filtroSituacao,
              categoria: filtroCategoria,
              responsavel: filtroResponsavel,
              unidade: filtroUnidade,
              qualidade: filtroQualidade,
            }}
            acoesFiltros={{
              setFiltro,
              setFiltroStatus,
              setFiltroSituacao,
              setFiltroCategoria,
              setFiltroResponsavel,
              setFiltroUnidade,
              setFiltroQualidade,
              onLimpar: limparTodosFiltros,
            }}
            setPpciSelecionado={setPpciSelecionado}
            formatarData={formatarData}
            textoOuPadrao={textoOuPadrao}
            obterClasseVencimento={obterClasseVencimento}
            obterDiasParaVencer={obterDiasParaVencer}
            aplicarFiltroRapido={aplicarFiltro}
            preferenciasVersao={preferenciasVersao}
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
