import { serverEnv } from "@/config/env.validation";
import { ApiError } from "@/lib/api/api.error";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  token?: string;
};

const BACKEND_URL = serverEnv.BACKEND_URL;

const apiFetch = async <G>(
  url: string,
  options: RequestOptions = {},
): Promise<G> => {
  const { method = "GET", body, token } = options;

  const headers: Record<string, string> = {};
  if (body && !(body instanceof FormData))
    headers["Content-type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;

  const config: RequestInit = {
    method,
    headers,
    cache: "no-store",
    body: body instanceof FormData ? body : JSON.stringify(body),
  };

  const res = await fetch(`${BACKEND_URL}${url}`, config);
  if (!res.ok) {
    const error = await res.json();
    throw new ApiError(error.message, error.code);
  }
  const json = await res.json();
  return json.data ?? json;
};

const get = <G>(url: string, options?: Pick<RequestOptions, "token">) =>
  apiFetch<G>(url, options);
const post = <G>(
  url: string,
  body?: unknown,
  options?: Pick<RequestOptions, "token">,
) => apiFetch<G>(url, { ...options, method: "POST", body });
const put = <G>(
  url: string,
  body?: unknown,
  options?: Pick<RequestOptions, "token">,
) => apiFetch<G>(url, { ...options, method: "PUT", body });
const patch = <G>(
  url: string,
  body?: unknown,
  options?: Pick<RequestOptions, "token">,
) => apiFetch<G>(url, { ...options, method: "PATCH", body });
const dele = <G>(url: string, options?: Pick<RequestOptions, "token">) =>
  apiFetch<G>(url, { ...options, method: "DELETE" });

export const api = { get, post, put, patch, delete: dele };
