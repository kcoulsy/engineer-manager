import Link from "next/link";
import { routes } from "./constants/routes";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Link href={routes.login}>Login</Link>
    </main>
  );
}
