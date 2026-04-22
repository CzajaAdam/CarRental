export const FetchJSON = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: { 'Content-Type': 'application/json' },
      ...options?.headers,
    });
    if (!response.ok) {
      throw new Error(`Error fetching JSON from ${url}: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
