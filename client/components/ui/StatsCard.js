import { Card, CardContent } from "@/components/ui/card";

export default function StatsCard({ icon, value, label }) {
  return (
    <Card className="shadow-md">
      <CardContent className="flex justify-between items-center p-4">
        <div className="text-2xl">{icon}</div>
        <div>
          <p className="text-xl font-bold">{value}</p>
          <p className="text-gray-500 text-sm">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}
