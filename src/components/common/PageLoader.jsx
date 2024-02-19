function PageLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-dark-bg">
      <div className="page-loading-container flex h-[50px] items-end justify-center gap-3">
        <span className="block h-[50px] w-4 animate-page-loading rounded-full bg-dark-bg dark:bg-gray-200"></span>
        <span className="block h-[50px] w-4 animate-page-loading rounded-full bg-dark-bg dark:bg-gray-200"></span>
        <span className="block h-[50px] w-4 animate-page-loading rounded-full bg-dark-bg dark:bg-gray-200"></span>
        <span className="block h-[50px] w-4 animate-page-loading rounded-full bg-dark-bg dark:bg-gray-200"></span>
      </div>
    </div>
  );
}

export default PageLoader;
