function StatsItem({ icon, title, value, backgroundColor }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-4 shadow-sm md:items-start 2xl:flex-row dark:bg-dark-bg">
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-full ${backgroundColor}`}
      >
        {icon}
      </div>
      <div className="flex flex-col items-center gap-1 tracking-wider md:items-start">
        <span className="sec-text-color text-sm font-medium uppercase">
          {title}
        </span>
        <span className="text-lg font-semibold">{value}</span>
      </div>
    </div>
  );
}

export default StatsItem;
