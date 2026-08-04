export type ProfileFormData = {
  full_name: string;
  phone: string;
  address: string;
  bio: string;
};

export type ProfileFormErrors = Partial<Record<keyof ProfileFormData, string>>;

export type Profile = {
  id: number;
  full_name: string | null;
  phone: string | null;
  address: string | null;
  bio: string | null;
};

export type ProfilePaginationLink = {
  url: string | null;
  label: string;
  active: boolean;
};
