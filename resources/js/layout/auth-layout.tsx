
import { Link, router, usePage } from "@inertiajs/react";
import type { MouseEvent, PropsWithChildren } from "react";

import type { Auth } from "@/types";

interface FlashProps {
  success?: string | null;
}

interface PageProps extends Record<string, unknown> {
  auth: Auth;
  flash?: FlashProps | null;
}

const PROFILE_INDEX_PATH = "/profiles" as const;
const LOGOUT_PATH = "/logout" as const;

export default function AuthenticatedLayout({ children }: PropsWithChildren) {
  const { auth, flash } = usePage<PageProps>().props;

  const handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.post(LOGOUT_PATH);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href={PROFILE_INDEX_PATH} className="font-semibold text-gray-800">
            Profile Manager
          </Link>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>{auth.user.name}</span>
            <button onClick={handleLogout} className="text-red-600 hover:underline">
              Log out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {flash?.success && (
          <div className="mb-4 rounded-md bg-green-50 border border-green-200 text-green-800 px-4 py-3 text-sm">
            {flash.success}
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
