# Quill project

[Quill](http://quill.co) is a react library and management system that allows SaaS companies to build dashboards quickly with the flexibility of code, while allowing non-engineers to manage queries and chart types in parallel.

To gain insight on how Quill works, you will walk through building a lightweight version of Quill. For simplicity, no need to worry about multi-tenancy (separating data by organization), authentication, etc.

## Requirements

1. ✅ Create _Endpoint_ `/dashboard/:name`
2. ✅ Create _Endpoint_ `/chart/:id`
3. ✅ Create _postgres_ database with fake tables and columns for `Dashboards`, `Charts`, `Transations`, `Customer`, `Products`.
4. ✅ Create `<Chart />` & `<Dashboard />` Components
5. ✅ The `<Dashboard />` should have a date filter, with three subcomponents.
6. ✅ Create _Date range picker_ to allow manually picking of date range from the calendar.
7. ✅ Create _preset dropdown_ with presets (`Last 90 days`, `Last 30 days`, `Current month`)
8. ✅ Create _Comparison dropdown_ (`Previous period`, `Previous 90 days`, `Previous 30 days`, `Previous month`) with default value to be `Previous period`.
9. ✅ Add `onClickDashboardItem: (dashboardItem: Chart) => void` callback function that fires when a chart in the dashboard is clicked
10. 🟣 Add comparison data in gray
11. 🟣 Add bucket data with the value of the most recent bucket and its comparison displayed above the chart, and the percentage increase/decrease is noted in green/red. Display both metrics (most recent bucket of current range vs. most recent bucket of comparison range)
12. ✅ but **[NOTE: I had some issues understanding the sqlQuery part so I improvised with what I understood. Not sure if this is the most optimum way of doing this part but I had to make do with what I understood.]**.The initial fetch of a dashboard item (uses initial range from dashboard). It filters date on a SQL level. Ex: if a chart has `sqlQuery: ”select * from transactions”` and `dateField: { table: “transactions, field: “created_at” }`, it should apply a filter to the query so that the `transactions` table `created_at` field ranges only between the `startDate` and `endDate` of the date filter. I recommend using WITH statements or subqueries.
13. ❌ the date range is in between the initial range fetched (ex: initial range is `LAST_90_DAYS`, new range filtered via the date filter in the UI is `CURRENT_MONTH` , so we already have that data surfaced on the frontend and can filter it without fetching new data)
14. ✅ the date range in outside of the initial range fetched. then filtering has to be done with SQL
15. ❌ **Configure chart cutt-off**. The min and max date of the x-axis of the graph will be determined by the Preset dropdown’s range, so if there are mismatched ranges (30 days vs 90 days), then you will cut off the comparison, only showing the first 30 days. In the inverse case, the comparison will be incomplete (it will only display for the first 30 days of the 90 day range).
16. ✅ **Bucketing** by date should be the next largest unit of the date range. 90 days ⇒ bucket by month. Current Month ⇒ bucket by week. Note that date ranges can be custom (via the calendar), so the bucketing has to work with any date range, not just the presets.

### Backend of your choice

**✅ Endpoints**

`/dashboard/:name`

fetches a dashboard by name with the list of charts with that `dashboardName`

`/chart/:id`

fetches a chart by id

**Database Schema**

Dashboard

```jsx
{
   name: string,
   id: string,
	 dateFilter: {
      name: string,
      initialDateRange: 'LAST_90_DAYS' | 'LAST_30_DAYS' | 'CURRENT_MONTH'
   }
}
```

Chart

```jsx
{
   name: string,
   id: string,
   dashboardName: string,
   chartType: 'line' | 'bar',
   sqlQuery: string,
   xAxisField: string,
   yAxisField: string,
   dateField: { table: string, field: string};
}
```

**Datasource for queries**

I recommend quickly spinning up a postgres database using [supabase](http://supabase.com) and using the table editor to upload a csv of fake data. You can also use their AI SQL editor to create fake data. For simplicity, you can also use this as your database for dashboards/charts, even though this isn’t how it works in prod (this is the analog of Quill’s customer’s db, while the db above is Quill’s db)

### React frontend

`<Chart />`

Use [recharts](https://recharts.org/en-US/api) as your charting library and date-fns for calculating date ranges and formatting dates.

Props

- `chartId: string` fetches chart by id from the server
- `containerStyle: React.CSSProperties` wraps the chart in a container

`<Dashboard />` Renders a grid of Charts associated with the dashboard name.

Props

- `name: string` fetches dashboard by name from the server
- `containerStyle: React.CSSProperties` wraps the dashboard in a container
- `onClickDashboardItem: (dashboardItem: Chart) => void` callback function that fires when a chart in the dashboard is clicked

The `<Dashboard />` should have a date filter, with three subcomponents

1. Date range picker (ex: [shadcn](https://ui.shadcn.com/docs/components/date-picker)). You can manually pick a date range from the calendar
2. Preset dropdown. Dropdown with presets (Last 90 days, Last 30 days, Current month)
3. Comparison dropdown (Previous period, Previous 90 days, Previous 30 days, Previous month). the default value should be “Previous period”, which is the current selected period minus itself (ex: “Current month” would be the previous month, “Last 90 days” would be the previous 90 days)

Example of what a date filter might look like:

![Frame 80.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/1d7ee202-7785-41af-b1a6-60bb1267708a/ecb77afa-866d-4314-8872-91b3ddd4fdc0/Frame_80.png)

Note that the comparison data will be added to the chart in gray, with the value of the most recent bucket and its comparison displayed above the chart, and the percentage increase/decrease is noted in green/red. Display both metrics (most recent bucket of current range vs. most recent bucket of comparison range)

![Screenshot 2023-11-25 at 10.06.05 AM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/1d7ee202-7785-41af-b1a6-60bb1267708a/82dc891e-dc5f-46b0-b17a-2096768a8e77/Screenshot_2023-11-25_at_10.06.05_AM.png)

The min and max date of the x-axis of the graph will be determined by the Preset dropdown’s range, so if there are mismatched ranges (30 days vs 90 days), then you will cut off the comparison, only showing the first 30 days. In the inverse case, the comparison will be incomplete (it will only display for the first 30 days of the 90 day range).

**There are three cases of date filtering:**

1. The initial fetch of a dashboard item (uses initial range from dashboard). It filters date on a SQL level. Ex: if a chart has `sqlQuery: ”select * from transactions”` and `dateField: { table: “transactions, field: “created_at” }`, it should apply a filter to the query so that the `transactions` table `created_at` field ranges only between the `startDate` and `endDate` of the date filter. I recommend using WITH statements or subqueries.
2. the date range is in between the initial range fetched (ex: initial range is `LAST_90_DAYS`, new range filtered via the date filter in the UI is `CURRENT_MONTH` , so we already have that data surfaced on the frontend and can filter it without fetching new data)
3. the date range in outside of the initial range fetched. then filtering has to be done with SQL

**Date bucketing**

Bucketing by date should be the next largest unit of the date range. 90 days ⇒ bucket by month. Current Month ⇒ bucket by week. Note that date ranges can be custom (via the calendar), so the bucketing has to work with any date range, not just the presets.

Message shawn@quill.co with questions!

### Deliverables

- call walking through code
