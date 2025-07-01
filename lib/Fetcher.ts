import {
  NEXT_PUBLIC_SHOPTRACKER_API_HTTPSECURE,
  NEXT_PUBLIC_SHOPTRACKER_API_HOSTNAME,
  NEXT_PUBLIC_SHOPTRACKER_API_PORT,
} from "@/config/config";

const API_BASE_URL = `${NEXT_PUBLIC_SHOPTRACKER_API_HTTPSECURE ? "https" : "http"}://${NEXT_PUBLIC_SHOPTRACKER_API_HOSTNAME}:${NEXT_PUBLIC_SHOPTRACKER_API_PORT}`;

export const fetchWrapper = async (
  endpoint: string,
  method: string = "GET",
  body?: any,
  headers?: Record<string, string>,
) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const requestOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    credentials: "include",
  };

  if (body && method !== "GET") {
    requestOptions.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, requestOptions);

    return response;
  } catch (error) {
    throw error;
  }
};

export const loginWithGoogle = async (email: string, googleJwt: string) => {
  try {
    const response = await fetchWrapper("/login/google", "POST", {
      email,
      googleJwt,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const registerWithGoogle = async (email: string, googleJwt: string) => {
  try {
    const response = await fetchWrapper("/register/google", "POST", {
      email,
      googleJwt,
    });

    return response;
  } catch (error) {
    throw error;
  }
};
