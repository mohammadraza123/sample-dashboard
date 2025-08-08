import { ArrowUpRight, TrendingUp } from "lucide-react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function DashboardCards({
  mcCount,
  countTonnage,
  documentCurrency,
  localCurrency,
  xarray,
  filteredRegionByValues,
}) {
  console.log("check filtered values", filteredRegionByValues);
  console.log("xarrayyyyyyyyyyyyy", xarray);

  console.log(
    "check values",
    filteredRegionByValues.reduce(
      (total, item) => total + (item["Budget in (MC)"] || 0),
      0
    )
  );

  const countMC = xarray?.map((x) => {
    let val=0;
    filteredRegionByValues?.map((f) => {
      if (x == f["Region"]) {
        let fi = filteredRegionByValues
          .filter((val) => val["Region"] == x)
          .reduce((total, item) => total + (item["Budget in (MC)"] || 0), 0);
      val=fi
      }
    });
    return val
    
  });

  console.log('>>>>>>>>>>>>>', countMC)

  const cards = [
    {
      title: "Total Sum of Sales in (MC)",
      count: mcCount,
      note: "Increased from last month",
      bg: "bg-gradient-to-r from-green-700 to-green-500",
      textColor: "text-white",
      noteIconColor: "text-white",
      chartData: countMC, // dummy
      chartColors: ["#bbf7d0", "#15803d", "#000"],
      labels: xarray,
    },
    // {
    //   title: "Total Sum of Sales in (Tonnage)",
    //   count: countTonnage,
    //   note: "Increased from last month",
    //   bg: "bg-white",
    //   textColor: "text-black",
    //   noteIconColor: "text-green-700",
    //   chartData: [70, 30], // dummy
    //   chartColors: ["#bbf7d0", "#15803d"],
    // },
    // {
    //   title: "Total Sum of Gross Sales Value (Document Currency)",
    //   count: documentCurrency,
    //   note: "Increased from last month",
    //   bg: "bg-white",
    //   textColor: "text-black",
    //   noteIconColor: "text-green-700",
    //   chartData: [70, 30], // dummy
    //   chartColors: ["#bbf7d0", "#15803d"],
    // },
    // {
    //   title: "Total Sum of Gross Sales Value (Local Currency)",
    //   count: localCurrency,
    //   note: "On Discuss",
    //   bg: "bg-white",
    //   textColor: "text-black",
    //   noteIconColor: "text-green-700",
    //   chartData: [70, 30], // dummy
    //   chartColors: ["#bbf7d0", "#15803d"],
    // },
  ];

  const series = [
    { name: "Sum of Sales in (MC)", data: mcCount || [] },
    { name: "Sum of Sales in (Tonnage)", data: countTonnage || [] },
    {
      name: "Sum of Gross Sales Value (Document Currency)",
      data: documentCurrency || [],
    },
    {
      name: "Sum of Gross Sales Value (Local Currency)",
      data: localCurrency || [],
    },
  ];

  const categories = xarray?.length ? xarray : ["No Data"];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const chartOptions = {
          chart: {
            type: "pie",
            toolbar: { show: false },
            height: 1400, // bigger height
            width: 400, // bigger width
          },
          labels: card.labels,
          legend: {
            show: true,
            position: "right",
            fontSize: "14px",
            labels: { colors: card.textColor },
          },
          dataLabels: {
            enabled: true,
            formatter: (val) => `${val.toFixed(1)}%`,
            style: {
              fontSize: "14px",
              fontWeight: "bold",
            },
          },
          colors: card.chartColors,
          stroke: { width: 1, colors: ["#fff"] },
        };

        return (
          <div
            key={index}
            className={`${card.bg} p-5 rounded-2xl shadow-sm flex flex-col`}
          >
            <div className="flex items-start justify-between mb-3">
              <p className={`text-sm font-medium ${card.textColor}`}>
                {card.title}
              </p>
              <ArrowUpRight size={16} className={card.textColor} />
            </div>

            <h2 className={`mb-4 text-3xl font-bold ${card.textColor}`}>
              {card.count}
            </h2>

            {/* Chart container */}
            <div className="flex justify-center items-center">
              <ReactApexChart
                options={chartOptions}
                series={card.chartData}
                type="pie"
              />
            </div>

            <div className="mt-3 flex items-center gap-2">
              <TrendingUp size={14} className={card.noteIconColor} />
              <p className={`text-xs ${card.noteIconColor}`}>{card.note}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
