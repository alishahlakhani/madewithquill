import { DashboardType } from "@zero/types/dashboard-type";

const FAKE_RESPONSE: Array<DashboardType> = [
  {
    name: "User Analytics",
    id: "ua987",
    category: "User",
    dateFilter: {
      name: "User Analytics Range",
      initialDateRange: "LAST_90_DAYS",
    },
  },
  {
    name: "Subscription Metrics",
    id: "sm654",
    category: "Marketing",
    dateFilter: {
      name: "Subscription Metrics Range",
      initialDateRange: "CURRENT_MONTH",
    },
  },
  {
    name: "Churn Analysis",
    id: "ca321",
    category: "Marketing",
    dateFilter: {
      name: "Churn Analysis Range",
      initialDateRange: "LAST_30_DAYS",
    },
  },
  {
    name: "Revenue Dashboard",
    id: "rd012",
    category: "Financial",
    dateFilter: {
      name: "Revenue Dashboard Range",
      initialDateRange: "CURRENT_MONTH",
    },
  },
  {
    name: "Customer Support Metrics",
    id: "cs789",
    category: "Support",
    dateFilter: {
      name: "Customer Support Metrics Range",
      initialDateRange: "LAST_90_DAYS",
    },
  },
];

export function GetDashboards(): Promise<Array<DashboardType>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(FAKE_RESPONSE);
    }, 1000);
  });
}
