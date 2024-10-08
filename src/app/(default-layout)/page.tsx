"use client";
import ChartLevel from "@/components/Dashboard/ChartLevel";
import ChartResultLevel from "@/components/Dashboard/ChartResultLevel";
import ChartScore from "@/components/Dashboard/ChartScore";
import Stats from "@/components/Dashboard/Stats";
import { useGetDashboard } from "@/helper/data/dashboard.loader";
import { Spacer } from "@nextui-org/react";

export default function Home() {
  const { data } = useGetDashboard();

  return (
    <>
      <Stats
        results={data?.results}
        tests={data?.tests}
        questions={data?.questions}
        users={data?.users}
      />
      <Spacer y={4} />
      <ChartScore resultPerMonth={data?.resultPerMonth} />
      <Spacer y={4} />
      <div className='flex gap-4'>
        {data?.levels && <ChartLevel levels={data?.levels} />}
        {data?.resultPerLevel && (
          <ChartResultLevel levels={data?.resultPerLevel} />
        )}
      </div>
    </>
  );
}
