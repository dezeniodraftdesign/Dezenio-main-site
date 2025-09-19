import { Suspense } from "react";
import HomeClient from "./home-client"; // client component below

// Avoid static prerender of "/" since we read search params
export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <HomeClient />
    </Suspense>
  );
}
