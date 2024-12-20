import { PAYLOAD_URI } from "$env/static/private";

export async function fetchFromPayload(endpoint: string, params: Record<string, string> = {}) {
  const searchParams = new URLSearchParams({
    depth: '1',
    draft: 'false',
    ...params
  });
  
  const url = `${PAYLOAD_URI}/api/${endpoint}?${searchParams}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    console.error(`Payload API error: ${response.status} ${response.statusText}`);
    throw new Error(`Payload API returned ${response.status}`);
  }
  
  return response.json();
}