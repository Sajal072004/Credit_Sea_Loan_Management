import { Card, CardContent } from "@/components/ui/card";

export default function StatsCard({ icon: Icon, value, label }) {
  const formattedValue =
    typeof value === "number"
      ? new Intl.NumberFormat("en-IN").format(value)
      : value;

  return (
    <Card className="p-4 flex flex-col justify-center shadow-md bg-white rounded-lg">
      <CardContent className="flex items-center gap-4">
        {/* Icon on the left */}
        {Icon && <Icon className="h-8 w-8 text-gray-600" />}

        {/* Text content */}
        <div className="flex flex-col">
          <p className="text-2xl font-bold text-black">{formattedValue}</p>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}
