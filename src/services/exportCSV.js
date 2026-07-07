/* =========================================================
   RELEASE........: v1.0.0 RC1
   ARQUIVO........: src/services/exportCSV.js
========================================================= */

export function exportarCSV(ppcisFiltrados = []) {

  if (!ppcisFiltrados.length) return;

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

  const linhas = ppcisFiltrados.map((item) => [
    item.ID ?? "",
    item.Categoria ?? "",
    item.Unidade ?? "",
    item["Prédio / Edificação"] ?? "",
    item["Status / Situação"] ?? "",
    item.Responsável ?? "",
    item.Solicitante ?? "",
    item["Data de entrada"] ?? "",
    item["Data limite / vencimento PPCI"] ?? "",
    item.Prioridade ?? ""
  ]);

  const csv = [
    cabecalho.join(";"),
    ...linhas.map((linha) => linha.join(";"))
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;"
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `PPCIs_${new Date().toISOString().slice(0,10)}.csv`;
  link.click();

  URL.revokeObjectURL(link.href);

}
