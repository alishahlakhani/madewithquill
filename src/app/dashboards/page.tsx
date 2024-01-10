import Link from "next/link";
import { GetDashboards } from "./action"

export default async function Dashboards() {
  const dashboards = await GetDashboards();
  return (
    <div className="w-full flex gap-5 flex-wrap">
      {dashboards.map(dashboard => <Link href={`/dashboards/${dashboard.id}`} key={dashboard.id}>
        <div className="hover:shadow p-10 rounded bg-slate-50 hover:scale-105 hover:bg-primary hover:text-white transition-all cursor-pointer text-nowrap flex flex-col">
          {dashboard.category === "Business"}
          {dashboard.category === "Financial"}
          {dashboard.category === "Marketing"}
          {dashboard.category === "Support"}
          {dashboard.category === "User"}
          {dashboard.category === "Misc"}
          <span className="text-sm opacity-55">[{dashboard.category}]</span>
          <strong>{dashboard.name}</strong>
        </div></Link>)}
    </div>
  )
}
