// BarChartBox.js
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function BarChartBox({ title = "Project Stats" }) {
  const chartOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      fontFamily: "inherit",
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "45%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    colors: ["#16a34a"],
    grid: {
      strokeDashArray: 4,
    },
    tooltip: {
      theme: "light",
    },
  };

  const series = [
    {
      name: "Tasks",
      data: [12, 18, 9, 15, 11, 7, 5],
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow w-full h-120 mx-auto">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="h-[85%]">
        <ReactApexChart options={chartOptions} series={series} type="bar" height="100%" />
      </div>
    </div>
  );
}
