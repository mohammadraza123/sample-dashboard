import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function BarChartBox({
  title = "Project Stats",
  xarray,
  countMC,
  countTonnage,
  documentCurrency,
  localCurrency,
  brandSeries
}) {
  const categories = xarray?.length ? xarray : ["No Data"];

  const chartOptions = {
    chart: { type: "bar", toolbar: { show: false }, fontFamily: "inherit" },
    plotOptions: { bar: { borderRadius: 6, columnWidth: "45%" } },
    dataLabels: { enabled: false },
    xaxis: { categories },
    colors: ["#16a34a", "#f97316", "#3b82f6", "#9333ea"],
    grid: { strokeDashArray: 4 },
    tooltip: { theme: "light" },
    legend: { position: "top", horizontalAlign: "right" },
    yaxis: {
    labels: {
      formatter: (value) => Math.round(value)
    }
  },
  };

  const series = [
    { name: "Sum of Sales in (MC)", data: countMC || [] },
    { name: "Sum of Sales in (Tonnage)", data: countTonnage || [] },
    { name: "Sum of Gross Sales Value (Document Currency)", data: documentCurrency || [] },
    { name: "Sum of Gross Sales Value (Local Currency)", data: localCurrency || [] },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow w-full h-120 mx-auto">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="h-[85%]">
        <ReactApexChart options={chartOptions} series={brandSeries ? brandSeries : series} type="bar" height="100%" />
      </div>
    </div>
  );
}