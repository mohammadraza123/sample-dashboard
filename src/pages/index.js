import { useEffect, useState } from "react";
import BarChartBox from "@/Components/BarChartBox";
import DashboardLayout from "@/Components/DashboardLayout";
import data from "../../utils/Filter_Sample_Data.json";
import MultiSelect from "@/Components/MultiSelect";
import DashboardCards from "@/Components/DashboardCards";

export default function Dashboard() {
  const [year, setYear] = useState([]);
  const [months, setMonths] = useState([]);
  const [region, setRegion] = useState([]);

  // ✅ Generate months based on selected years
  useEffect(() => {
    if (year.length > 0) {
      const monthsArray = [];

      year.forEach((fiscalYearStr) => {
        const startYear = parseInt(fiscalYearStr.split("-")[0]); // "2020-21" → 2020
        const nextYear = startYear + 1;

        // July (7) to Dec (12) of startYear
        for (let m = 7; m <= 12; m++) {
          monthsArray.push(parseFloat(`${m}.${startYear}`));
        }

        // Jan (1) to June (6) of nextYear
        for (let m = 1; m <= 6; m++) {
          monthsArray.push(parseFloat(`${m}.${nextYear}`));
        }
      });

      setMonths(monthsArray);
    } else {
      setMonths([]); // clear months if no year selected
    }
  }, [year]);

  console.log('year', year)
  console.log("Selected Months:", months);
  console.log("Selected Months:", region);


  // const findData = data
  //   ?.filter((item) =>
  //     months.includes(item['Calendar Month']) && item.Region === region
  //   )
  //   .filter((value, index, self) =>
  //     index === self.findIndex(
  //       (v) => v['Calendar Month'] === value['Calendar Month']
  //     )
  //   );

  const findData = data
    ?.filter(
      (item) =>
        months.includes(item['Calendar Month']) &&
        (region.length === 0 || region.includes(item.Region))
    )
    .filter(
      (value, index, self) =>
        index === self.findIndex(
          (v) => v['Calendar Month'] === value['Calendar Month']
        )
    );



  const countMC = findData?.reduce((total, item) => total + item['Budget in (MC)'], 0);
  const countTonnage = findData?.reduce((total, item) => total + item['Sales in (Tonnage)'], 0);
  const documentCurrency = findData?.reduce((total, item) => total + item['Gross Sales Value (Document Currency)'], 0);
  const localCurrency = findData?.reduce((total, item) => total + item['Gross Sales Value (Local Currency)'], 0);


  console.log(countMC);
  console.log(countTonnage);
  console.log(documentCurrency);
  console.log(localCurrency);

  console.log(findData)



  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-gray-500 text-sm">
            Plan, prioritize, and accomplish your tasks with ease.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="btn-primary">+ Add Project</button>
          <button className="btn-secondary">Import Data</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* ✅ MultiSelect for Year */}
        <MultiSelect
          label="Year"
          value={year}
          selected={year}
          options={[...new Set(data.map((item) => item["Fiscal Year"]))]}
          onChange={(val) => setYear(val)}  // ✅ Fix: use onChange
        />


        {/* ✅ MultiSelect for Month */}
        <MultiSelect
          label="Month"
          value={months}
          selected={months}
          options={[...new Set(data.map((item) => item["Calendar Month"]))]}
          onChange={(val) => setMonths(val)}
        />

        {/* ✅ MultiSelect for Region */}
        <MultiSelect
          label="Region"
          value={region}
          selected={region}
          options={[...new Set(data.map((item) => item["Region"]))]}
          onChange={(val) => setRegion(val)}
        />
      </div>

      {/* Dashboard cards or chart goes here */}
      <DashboardCards mcCount={countMC} countTonnage={countTonnage} documentCurrency={documentCurrency} localCurrency={localCurrency} />

      <div className="grid grid-cols-1 gap-4 mt-6">
        <BarChartBox title="Weekly Task Overview" />
      </div>
    </DashboardLayout>
  );
}
