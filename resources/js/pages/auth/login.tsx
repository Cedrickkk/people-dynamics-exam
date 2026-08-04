import { Head, Link, useForm } from "@inertiajs/react";
import type { SubmitEvent } from "react";

import GuestLayout from "@/layout/guest-layout";

type LoginFormData = {
  email: string;
  password: string;
  remember: boolean;
};

export default function Login() {
  const { data, setData, post, processing, errors, reset } = useForm<LoginFormData>({
    email: "",
    password: "",
    remember: false,
  });

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    post("/login", {
      onFinish: () => reset("password"),
    });
  }

  return (
    <GuestLayout>
      <Head title="Log in" />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
            required
            autoFocus
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={data.password}
            onChange={(e) => setData("password", e.target.value)}
            required
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={data.remember}
            onChange={(e) => setData("remember", e.target.checked)}
          />
          Remember me
        </label>

        <button
          type="submit"
          disabled={processing}
          className="w-full bg-indigo-600 text-white rounded-md py-2 text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
        >
          Log in
        </button>

        <p className="text-sm text-center text-gray-600">
          No account?{" "}
          <Link href="/register" className="text-indigo-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </GuestLayout>
  );
}
