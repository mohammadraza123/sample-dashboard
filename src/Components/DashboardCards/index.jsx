import { ArrowUpRight, TrendingUp } from "lucide-react";

export default function DashboardCards({
  mcCount,
  countTonnage,
  documentCurrency,
  localCurrency,
}) {
  const cards = [
    {
      title: "Total Sum of Sales in (MC)",
      count: mcCount,
      note: "Increased from last month",
      bg: "bg-gradient-to-r from-green-700 to-green-500",
      textColor: "text-white",
      noteIconColor: "text-white",
    },
    {
      title: "Total Sum of Sales in (Tonnage)",
      count: countTonnage,
      note: "Increased from last month",
      bg: "bg-white",
      textColor: "text-black",
      noteIconColor: "text-green-700",
    },
    {
      title: "Total Sum of Gross Sales Value (Document Currency)",
      count: documentCurrency,
      note: "Increased from last month",
      bg: "bg-white",
      textColor: "text-black",
      noteIconColor: "text-green-700",
    },
    {
      title: "Total Sum of Gross Sales Value (Local Currency)",
      count: localCurrency,
      note: "On Discuss",
      bg: "bg-white",
      textColor: "text-black",
      noteIconColor: "text-green-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.bg} p-5 rounded-2xl shadow-sm flex flex-col justify-between`}
        >
          <div className="flex items-start justify-between">
            <p className={`text-sm font-medium ${card.textColor}`}>
              {card.title}
            </p>
            <ArrowUpRight size={16} className={card.textColor} />
          </div>
          <h2 className={`mt-2 text-3xl font-bold ${card.textColor}`}>
            {card.count}
          </h2>
          <div className="mt-2 flex items-center gap-2">
            <TrendingUp size={14} className={card.noteIconColor} />
            <p className={`text-xs ${card.noteIconColor}`}>{card.note}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
