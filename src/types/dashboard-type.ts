export type DateRangesType = "LAST_90_DAYS" | "LAST_30_DAYS" | "CURRENT_MONTH";
export type DashboardCategoryType =
  | "User"
  | "Financial"
  | "Marketing"
  | "Business"
  | "Support"
  | "Misc";

export type DashboardType = {
  name: string;
  id: string;
  category: DashboardCategoryType;
  dateFilter: {
    name: string;
    initialDateRange: DateRangesType;
  };
};
