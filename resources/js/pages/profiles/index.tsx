import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

import AuthenticatedLayout from "@/layout/auth-layout";
import type { Profile, ProfilePaginationLink } from "@/types";

type ProfilesPageProps = {
  profiles: {
    data: Profile[];
    links: ProfilePaginationLink[];
  };
};

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

function ConfirmDialog({ open, title, message, onConfirm, onCancel }: ConfirmDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="mt-3 text-sm text-gray-600">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700">
            Cancel
          </button>
          <button onClick={onConfirm} className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Index({ profiles }: ProfilesPageProps) {
  // profiles is a Laravel paginator, serialized as { data, links, meta... }
  const [pendingDelete, setPendingDelete] = useState<Profile | null>(null);

  function confirmDelete() {
    if (!pendingDelete) {
      return;
    }

    router.delete(`/profiles/${pendingDelete.id}`, {
      onFinish: () => setPendingDelete(null),
    });
  }

  return (
    <AuthenticatedLayout>
      <Head title="Profiles" />

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Your profiles</h1>
        <Link
          href="/profiles/create"
          className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          + New profile
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Full name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {profiles.data.map((profile: Profile) => (
              <tr key={profile.id}>
                {/* React escapes text children by default, so even if a
                    profile field contains "<script>", it renders as
                    literal text — no dangerouslySetInnerHTML anywhere. */}
                <td className="px-4 py-3 text-gray-800">{profile.full_name}</td>
                <td className="px-4 py-3 text-gray-600">{profile.phone || "—"}</td>
                <td className="px-4 py-3 text-gray-600">{profile.address || "—"}</td>
                <td className="px-4 py-3 text-right space-x-3">
                  <Link
                    href={`/profiles/${profile.id}/edit`}
                    className="text-indigo-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => setPendingDelete(profile)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {profiles.data.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                  No profiles yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {profiles.links && (
        <div className="mt-4 flex gap-2 text-sm">
          {profiles.links.map((link: ProfilePaginationLink, i: number) => (
            <Link
              key={i}
              href={link.url || "#"}
              dangerouslySetInnerHTML={{ __html: link.label }}
              className={`px-3 py-1 rounded ${
                link.active ? "bg-indigo-600 text-white" : "bg-white border text-gray-600"
              } ${!link.url ? "pointer-events-none opacity-40" : ""}`}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete profile"
        message={`Are you sure you want to delete "${pendingDelete?.full_name}"? This can't be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </AuthenticatedLayout>
  );
}
