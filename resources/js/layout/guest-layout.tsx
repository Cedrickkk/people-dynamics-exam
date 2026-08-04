import type { PropsWithChildren } from "react";

export default function GuestLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">
          Profile Manager
        </h1>
        <div className="bg-white shadow rounded-lg px-6 py-8">{children}</div>
      </div>
    </div>
  );
}
