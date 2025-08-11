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
  // Count MC
  const countMC = xarray?.map((region) => {
    let total = 0;
    filteredRegionByValues?.forEach((item) => {
      if (item["Region"] === region) {
        const value = Number(item["Budget in (MC)"]) || 0;
        total += value;
      }
    });
    return total;
  });

  // Count Tonnage
  const tonnageCount = xarray?.map((region) => {
    let total = 0;
    filteredRegionByValues?.forEach((item) => {
      if (item["Region"] === region) {
        const value = Number(item["Sales in (Tonnage)"]) || 0;
        total += value;
      }
    });
    return total;
  });

  // Document Currency Count
  const documentCurrencyCount = xarray?.map((region) => {
    let total = 0;
    filteredRegionByValues?.forEach((item) => {
      if (item["Region"] === region) {
        const value =
          Number(item["Gross Sales Value (Document Currency)"]) || 0;
        total += value;
      }
    });
    return total;
  });

  // Local Currency Count
  const localCurrencyCount = xarray?.map((region) => {
    let total = 0;
    filteredRegionByValues?.forEach((item) => {
      if (item["Region"] === region) {
        const value = Number(item["Gross Sales Value (Local Currency)"]) || 0;
        total += value;
      }
    });
    return total;
  });

  // console.log("countMC", countMC);
  // console.log("tonnageCount", tonnageCount);
  // console.log("documentCurrencyCount", documentCurrencyCount);
  // console.log("localCurrencyCount", localCurrencyCount);

  const cards = [
    {
      title: "Total Sum of Sales in (MC)",
      count: mcCount,
      note: "Increased from last month",
      bg: "bg-gradient-to-r from-green-700 to-green-500",
      textColor: "text-white",
      noteIconColor: "text-white",
      chartData: countMC,
      chartColors: ["#4E79A7", "#F28E2B", "#E15759", "#76B7B2", "#59A14F"],
      labels: xarray,
    },
    {
      title: "Total Sum of Sales in (Tonnage)",
      count: countTonnage.toFixed(2),
      note: "Increased from last month",
      bg: "bg-white",
      textColor: "text-black",
      noteIconColor: "text-green-700",
      chartData: tonnageCount,
      chartColors: ["#4E79A7", "#F28E2B", "#E15759", "#76B7B2", "#59A14F"],
      labels: xarray,
    },
    {
      title: "Total Sum of Gross Sales Value (Document Currency)",
      count: documentCurrency.toFixed(2),
      note: "Increased from last month",
      bg: "bg-white",
      textColor: "text-black",
      noteIconColor: "text-green-700",
      chartData: documentCurrencyCount,
      chartColors: ["#4E79A7", "#F28E2B", "#E15759", "#76B7B2", "#59A14F"],
      labels: xarray,
    },
    {
      title: "Total Sum of Gross Sales Value (Local Currency)",
      count: localCurrency.toFixed(2),
      note: "On Discuss",
      bg: "bg-white",
      textColor: "text-black",
      noteIconColor: "text-green-700",
      chartData: localCurrencyCount,
      chartColors: ["#4E79A7", "#F28E2B", "#E15759", "#76B7B2", "#59A14F"],
      labels: xarray,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const chartOptions = {
          chart: {
            type: "pie",
            toolbar: { show: false },
            height: 300,
          },
          labels: card.labels,
          legend: {
            show: true,
            position: "bottom",
            horizontalAlign: "center",
            fontSize: "14px",
            markers: { width: 12, height: 12, radius: 12 },
            itemMargin: {
              horizontal: 10,
              vertical: 5,
            },
            labels: { colors: card.textColor },
          },
          dataLabels: {
            enabled: false,
            formatter: (val) => `${val.toFixed(1)}%`,
            style: {
              fontSize: "14px",
              fontWeight: "bold",
              colors: ["#fff"],
            },
            dropShadow: { enabled: false },
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

            <div className="flex justify-center items-center h-[260px]">
              <ReactApexChart
                options={chartOptions}
                series={
                  Array.isArray(card.chartData)
                    ? card.chartData.map((v) => (Number.isFinite(v) ? v : 0))
                    : []
                }
                type="pie"
                height={260}
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

// const countMC = xarray?.map((x) => {
//   let val=0;
//   filteredRegionByValues?.map((f) => {
//     if (x == f["Region"]) {
//       let fi = filteredRegionByValues
//         .filter((val) => val["Region"] == x)
//         .reduce((total, item) => total + (item["Budget in (MC)"] || 0), 0);
//     val=fi
//     }
//   });
//   return val

// });
