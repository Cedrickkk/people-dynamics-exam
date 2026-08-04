import type { SubmitEvent } from "react";

import type { ProfileFormData, ProfileFormErrors } from "@/types";

type ProfileFormValues = {
  data: ProfileFormData;
  setData: <K extends keyof ProfileFormData>(key: K, value: ProfileFormData[K]) => void;
  processing: boolean;
  errors: ProfileFormErrors;
};

type ProfileFormProps = {
  form: ProfileFormValues;
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
  submitLabel: string;
};

export default function ProfileForm({ form, onSubmit, submitLabel }: ProfileFormProps) {
  const { data, setData, processing, errors } = form;

  return (
    <form onSubmit={onSubmit} className="bg-white shadow rounded-lg p-6 space-y-4 max-w-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700">Full name</label>
        <input
          type="text"
          value={data.full_name}
          onChange={(e) => setData("full_name", e.target.value)}
          required
          maxLength={255}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.full_name && <p className="text-sm text-red-600 mt-1">{errors.full_name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          value={data.phone}
          onChange={(e) => setData("phone", e.target.value)}
          maxLength={32}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          value={data.address}
          onChange={(e) => setData("address", e.target.value)}
          maxLength={255}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.address && <p className="text-sm text-red-600 mt-1">{errors.address}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Bio</label>
        <textarea
          value={data.bio}
          onChange={(e) => setData("bio", e.target.value)}
          maxLength={2000}
          rows={4}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.bio && <p className="text-sm text-red-600 mt-1">{errors.bio}</p>}
      </div>

      <button
        type="submit"
        disabled={processing}
        className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
      >
        {submitLabel}
      </button>
    </form>
  );
}
