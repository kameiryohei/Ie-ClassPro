"use client";

export const EditProfile = async (
  name: string,
  auth_id: string,
  university: string,
  faculty: string,
  department: string,
  grade: number
) => {
  const res = await fetch("/api/user/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      auth_id,
      university,
      faculty,
      department,
      grade,
    }),
  });
  const data = await res.json();
  return data;
};
