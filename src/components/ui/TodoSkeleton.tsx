const TodoSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-56 "></div>
          </div>
          <div className="flex gap-2">
            <div className="h-7 bg-gray-300 rounded-md dark:bg-gray-700 w-14"></div>
            <div className="h-7 bg-gray-300 rounded-md dark:bg-gray-700 w-14"></div>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-56 "></div>
          </div>
          <div className="flex gap-2">
            <div className="h-7 bg-gray-300 rounded-md dark:bg-gray-700 w-14"></div>
            <div className="h-7 bg-gray-300 rounded-md dark:bg-gray-700 w-14"></div>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-56 "></div>
          </div>
          <div className="flex gap-2">
            <div className="h-7 bg-gray-300 rounded-md dark:bg-gray-700 w-14"></div>
            <div className="h-7 bg-gray-300 rounded-md dark:bg-gray-700 w-14"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoSkeleton;
