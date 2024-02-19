import Filter from "../components/common/Filter";
import DashboardLayout from "../features/dashboard/DashboardLayout";

function Dashboard() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="heading-1">Dashboard</h1>
        <Filter
          searchParamsField="last"
          optionsInOrder={[
            { value: "7", label: "Last 7 days" },
            { value: "30", label: "Last 30 days" },
            { value: "90", label: "Last 90 days" },
          ]}
          whatFor="statistics"
        />
      </div>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
