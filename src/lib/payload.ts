import { PAYLOAD_URI, PRIVATE_PAYLOAD_API_KEY } from "$env/static/private";
console.log(`PAYLOAD_URI: ${PAYLOAD_URI}`);
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
  console.log(response)
  if (!response.ok) {
    console.error(`Payload API error: ${response.status} ${response.statusText}`);
    throw new Error(`Payload API returned ${response.status}`);
  }
  
  return response.json();
}