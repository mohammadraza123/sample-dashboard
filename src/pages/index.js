// pages/index.js
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardCards from "@/components/DashboardCards";
import DynamicSelect from "@/components/DynamicSelect";
import BarChartBox from "@/Components/BarChartBox";

export default function Dashboard() {
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [team, setTeam] = useState("");

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

      {/* Dropdowns Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <DynamicSelect
          label="Category"
          options={["All", "Design", "Development", "Marketing"]}
          onSelect={(val) => setCategory(val)}
        />
        <DynamicSelect
          label="Project Status"
          options={["All", "Completed", "In Progress", "Pending"]}
          onSelect={(val) => setStatus(val)}
        />
        <DynamicSelect
          label="Team"
          options={["All Teams", "Frontend", "Backend", "QA", "Design"]}
          onSelect={(val) => setTeam(val)}
        />
      </div>

      <DashboardCards />
      <div className="grid grid-cols-1 gap-4 mt-6">
        <BarChartBox title="Weekly Task Overview" />
      </div>
    </DashboardLayout>
  );
}
