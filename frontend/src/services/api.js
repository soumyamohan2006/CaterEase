const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function apiRequest(
  endpoint,
  options = {}
) {
  const { headers, ...rest } = options;
  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...rest,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}