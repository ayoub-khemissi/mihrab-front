import {
  NEXT_PUBLIC_SHOPTRACKER_API_HTTPSECURE,
  NEXT_PUBLIC_SHOPTRACKER_API_HOSTNAME,
  NEXT_PUBLIC_SHOPTRACKER_API_PORT,
} from "@/config/config";

const remoteApiUrl = `http${NEXT_PUBLIC_SHOPTRACKER_API_HTTPSECURE ? "s" : ""}://${NEXT_PUBLIC_SHOPTRACKER_API_HOSTNAME}${NEXT_PUBLIC_SHOPTRACKER_API_HTTPSECURE ? "" : `:${NEXT_PUBLIC_SHOPTRACKER_API_PORT}`}`;

export const fetchWrapper = async (
  path: string,
  method: string = "GET",
  body: object | null = null,
) => {
  try {
    const response = await fetch(`${remoteApiUrl}${path}`, {
      method,
      body: body ? JSON.stringify(body) : null,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.status >= 500) {
      throw new Error(
        `Request failed: received a server error response with status ${response.status}.`,
      );
    }

    return response;
  } catch {
    return null;
  }
};
