"use client";

import LottieComponent from "@/components/lotties/lottie";
import useStore from "zustand/store";
import TodoTable from "@/components/TodoTable";

const AllTasks = () => {
  const store = useStore();
  const { isLoading } = store;
  return (
    <div className=" text-black dark:bg-black/90 dark:text-white/90 min-h-[calc(100vh-70px)]">
      <div className="w-full flex flex-col justify-center items-center p-16 gap-8">
        {isLoading ? (
          <LottieComponent />
        ) : (
          <div>
            <TodoTable />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTasks;
