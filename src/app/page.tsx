import { Suspense } from "react";
import ClientHome from "../components/ClientHome";

export default function Home({ searchParams }: { searchParams: { guest?: string } }) {
  return (
    <Suspense>
      <ClientHome searchParams={searchParams} />
    </Suspense>
  );
}
