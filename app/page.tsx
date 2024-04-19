import WeatherDetails from "@/components/WeatherDetails";
import WeatherForm from "@/components/WeatherForm";
import { Suspense } from "react";
import Loading from "./loading";

export default function Home({
  searchParams
}: {
  searchParams: {
    q?: string
  }
}) {
  const q = searchParams.q;

  return (
    <main className="flex border shadow rounded w-full min-h-screen">
      <div className='flex flex-col border shadow rounded w-full h-auto p-4 gap-2'>
          <WeatherForm />

          <div className='flex flex-col border shadow w-full h-full rounded-md'>
            <Suspense key={q} fallback={<Loading />}>
              <WeatherDetails q={q} />
            </Suspense>
          </div>
      </div>
    </main>
  );
}
