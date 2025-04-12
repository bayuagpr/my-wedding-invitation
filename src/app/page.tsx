import { Suspense } from "react";
import ClientHome from "../components/ClientHome";

export default async function Home({ searchParams }: { searchParams: { guest?: string } }) {
  const params = await searchParams;
  return (
    <Suspense>
      <ClientHome searchParams={params} />
    </Suspense>
  );
}
