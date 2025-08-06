// components/Sidebar.js
import { Home, List, Calendar, BarChart2, Users, Settings, HelpCircle, LogOut } from "lucide-react";
import Link from "next/link";

const menuItems = [
  { name: "Dashboard", icon: Home, href: "/" },
  { name: "Tasks", icon: List, href: "/tasks" },
  { name: "Calendar", icon: Calendar, href: "/calendar" },
  { name: "Analytics", icon: BarChart2, href: "/analytics" },
  { name: "Team", icon: Users, href: "/team" },
];

const generalItems = [
  { name: "Settings", icon: Settings },
  { name: "Help", icon: HelpCircle },
  { name: "Logout", icon: LogOut },
];

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white shadow-lg flex flex-col justify-between p-6 fixed">
      <div>
        <div className="text-2xl font-bold text-green-700 mb-8">🌀 Test</div>
        {/* <nav className="space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition"
            >
              <item.icon className="w-5 h-5 text-green-600" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav> */}
      </div>
      {/* <div className="space-y-4">
        {generalItems.map((item) => (
          <button
            key={item.name}
            className="flex items-center gap-3 w-full text-left p-2 rounded-md hover:bg-gray-100 transition"
          >
            <item.icon className="w-5 h-5 text-gray-600" />
            <span>{item.name}</span>
          </button>
        ))}
        <div className="bg-green-100 p-3 rounded-xl text-center mt-6">
          <p className="text-sm font-medium">Download our Mobile App</p>
          <button className="mt-2 bg-green-600 text-white text-sm px-4 py-1 rounded-full">Download</button>
        </div>
      </div> */}
    </div>
  );
}
