import { Head, Link, useForm } from "@inertiajs/react";
import type { SubmitEvent } from "react";

import GuestLayout from "@/layout/guest-layout";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    post("/register", {
      onFinish: () => reset("password", "password_confirmation"),
    });
  }

  return (
    <GuestLayout>
      <Head title="Register" />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            required
            autoFocus
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
            required
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

        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm password</label>
          <input
            type="password"
            value={data.password_confirmation}
            onChange={(e) => setData("password_confirmation", e.target.value)}
            required
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={processing}
          className="w-full bg-indigo-600 text-white rounded-md py-2 text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
        >
          Create account
        </button>

        <p className="text-sm text-center text-gray-600">
          Already registered?{" "}
          <Link href="/login" className="text-indigo-600 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </GuestLayout>
  );
}
