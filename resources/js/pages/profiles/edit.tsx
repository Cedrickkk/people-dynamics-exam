import { Head, useForm } from "@inertiajs/react";
import type { SubmitEvent } from "react";

import AuthenticatedLayout from "@/layout/auth-layout";
import ProfileForm from "@/pages/profiles/partials/profile-form";
import type { Profile, ProfileFormData } from "@/types";

type ProfilePageProps = {
  profile: Profile;
};

export default function Edit({ profile }: ProfilePageProps) {
  const form = useForm<ProfileFormData>({
    full_name: profile.full_name ?? "",
    phone: profile.phone ?? "",
    address: profile.address ?? "",
    bio: profile.bio ?? "",
  });

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    form.put(`/profiles/${profile.id}`);
  }

  return (
    <AuthenticatedLayout>
      <Head title="Edit profile" />
      <h1 className="text-xl font-semibold text-gray-800 mb-6">Edit profile</h1>
      <ProfileForm form={form} onSubmit={handleSubmit} submitLabel="Save changes" />
    </AuthenticatedLayout>
  );
}
