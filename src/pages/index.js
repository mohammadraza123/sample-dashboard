import { useEffect, useState } from "react";
import BarChartBox from "@/Components/BarChartBox";
import DashboardLayout from "@/Components/DashboardLayout";
import data from "../../utils/Ibad-data.json";
import MultiSelect from "@/Components/MultiSelect";
import DashboardCards from "@/Components/DashboardCards";

export default function Dashboard() {
  const [year, setYear] = useState([]);
  const [months, setMonths] = useState([]);
  const [region, setRegion] = useState([]);

  useEffect(() => {
    if (data) {
      const currentYearObj = data?.find(
        (item) => item["Calendar Year"] === new Date().getFullYear()
      );

      if (currentYearObj) {
        setYear([currentYearObj["Fiscal Year"]]);
      }

      const allRegions = [...new Set(data?.map((item) => item["Region"]))];
      setRegion(allRegions);
    }
  }, [data]);

  useEffect(() => {
    if (year.length > 0) {
      const monthsArray = [];
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      year.forEach((fiscalYearStr) => {
        const startYear = parseInt(fiscalYearStr.split("-")[0]);
        const nextYear = startYear + 1;

        // July–December of start year
        for (let m = 6; m < 12; m++) {
          const shortYear = String(startYear).slice(-2); // last 2 digits
          monthsArray.push(`${monthNames[m]}-${shortYear}`);
        }

        // January–June of next year
        for (let m = 0; m < 6; m++) {
          const shortYear = String(nextYear).slice(-2);
          monthsArray.push(`${monthNames[m]}-${shortYear}`);
        }
      });

      setMonths(monthsArray);
    } else {
      setMonths([]);
    }
  }, [year]);

  // Filtered data based on selected filters
  const findData = data?.filter(
    (item) =>
      months.includes(item["Calendar Month"]) &&
      (region.length === 0 || region.includes(item.Region))
  );

  // Unique regions in the filtered dataset
  const xarray = [...new Set(findData.map((item) => item["Region"]))];

  const filteredRegionByValues = findData.filter((item) =>
    xarray.includes(item.Region)
  );

  console.log("check filterData", findData);

  // Arrays for chart data (per region)
  const regionMC = [];
  const regionTonnage = [];
  const regionDocumentCurrency = [];
  const regionLocalCurrency = [];

  xarray.forEach((reg) => {
    const regionItems = findData.filter((item) => item.Region === reg);

    regionMC.push(
      regionItems.reduce(
        (total, item) => total + (item["Sales in (MC)"] || 0),
        0
      )
    );
    regionTonnage.push(
      regionItems.reduce(
        (total, item) => total + (item["Sales in (Tonnage)"] || 0),
        0
      )
    );
    regionDocumentCurrency.push(
      regionItems.reduce(
        (total, item) =>
          total + (item["Gross Sales Value (Document Currency)"] || 0),
        0
      )
    );
    regionLocalCurrency.push(
      regionItems.reduce(
        (total, item) =>
          total + (item["Gross Sales Value (Local Currency)"] || 0),
        0
      )
    );
  });

  // For Dashboard cards → show totals across selected regions
  const totalMC = regionMC.reduce((a, b) => a + b, 0);
  const totalTonnage = regionTonnage.reduce((a, b) => a + b, 0);
  const totalDocCurrency = regionDocumentCurrency.reduce((a, b) => a + b, 0);
  const totalLocalCurrency = regionLocalCurrency.reduce((a, b) => a + b, 0);


  // console.log('check year>>>', year)

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-gray-500 text-sm">
            Plan, prioritize, and accomplish your tasks with ease.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <MultiSelect
          label="Year"
          value={year}
          selected={year}
          options={[...new Set(data.map((item) => item["Fiscal Year"]))]}
          onChange={(val) => setYear(val)}
        />

        <MultiSelect
          label="Month"
          value={months}
          selected={months}
          options={[...new Set(data.map((item) => item["Calendar Month"]))]}
          onChange={(val) => setMonths(val)}
        />

        <MultiSelect
          label="Region"
          value={region}
          selected={region}
          options={[...new Set(data.map((item) => item["Region"]))]}
          onChange={(val) => setRegion(val)}
        />
      </div>

      <DashboardCards
        xarray={xarray}
        mcCount={totalMC}
        filteredRegionByValues={filteredRegionByValues}
        countTonnage={totalTonnage}
        documentCurrency={totalDocCurrency}
        localCurrency={totalLocalCurrency}
      />

      <div className="grid grid-cols-1 gap-4 mt-6">
        <BarChartBox
          title="Sales Overview"
          xarray={xarray}
          countMC={regionMC}
          countTonnage={regionTonnage}
          documentCurrency={regionDocumentCurrency}
          localCurrency={regionLocalCurrency}
        />
      </div>
      <div className="mt-4">
        <p className="text-2xl font-semibold">Brands</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 mt-4">

        {xarray?.map((regionName, index) => {
          const regionData = findData.filter(
            (item) => item.Region === regionName
          );

          const brandsForRegion = [...new Set(regionData.map((item) => item.Brand))];
          const years = [...new Set(regionData.map((item) => item["Calendar Year"]))];

          const brandYearSalesValues = brandsForRegion.map((brand) => {
            const yearWiseValues = years.map((year) => {
              const totalValue = regionData
                .filter((item) => item.Brand === brand && item["Calendar Year"] === year)
                .reduce(
                  (sum, item) =>
                    sum + (item["Gross Sales Value (Document Currency)"] || 0),
                  0
                );

              return {
                year,
                totalGrossSalesValue: totalValue,
              };
            });

            return {
              brand,
              yearWiseValues,
            };
          });

          // Create series for chart
          const series = years.map((year) => {
            return {
              name: year.toString(),
              data: brandYearSalesValues.map(
                (brandItem) =>
                  brandItem.yearWiseValues.find((y) => y.year === year)
                    ?.totalGrossSalesValue || 0
              ),
            };
          });

          console.log("brandsForRegion", brandsForRegion);
          console.log("series", series);

          return (
            <BarChartBox
              key={index}
              title={regionName}
              xarray={brandsForRegion} // X-axis labels = brands
              brandSeries={series} // Chart series
            />
          );
        })}



      </div>
    </DashboardLayout>
  );
}
