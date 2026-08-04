import { Head, useForm } from "@inertiajs/react";
import type { SubmitEvent } from "react";

import AuthenticatedLayout from "@/layout/auth-layout";
import ProfileForm from "@/pages/profiles/partials/profile-form";
import type { ProfileFormData } from "@/types";

export default function Create() {
  const form = useForm<ProfileFormData>({
    full_name: "",
    phone: "",
    address: "",
    bio: "",
  });

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    form.post("/profiles");
  }

  return (
    <AuthenticatedLayout>
      <Head title="New profile" />
      <h1 className="text-xl font-semibold text-gray-800 mb-6">New profile</h1>
      <ProfileForm form={form} onSubmit={handleSubmit} submitLabel="Create profile" />
    </AuthenticatedLayout>
  );
}
