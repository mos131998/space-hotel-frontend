import { serverEnv } from "@/config/env.validation";
import { ApiError } from "@/lib/api/api.error";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
};

const BACKEND_URL = serverEnv.BACKEND_URL;

const apiFetch = async <G>(
  url: string,
  options: RequestOptions = {},
): Promise<G> => {
  const { method = "GET", body } = options;

  const headers: Record<string, string> = {};
  if (body && !(body instanceof FormData))
    headers["Content-type"] = "application/json";
  const config: RequestInit = {
    method,
    headers,
    body: body instanceof FormData ? body : JSON.stringify(body),
  };

  const res = await fetch(`${BACKEND_URL}${url}`, config);
  console.log("AFTER FETCH");
  if (!res.ok) {
    const error = await res.json();
    console.log("error fetch", error);
    throw new ApiError(error.message, error.code);
  }
  console.log("FETCH SUCCESS");
  const json = await res.json();
  return json.data ?? json;
};

const get = <G>(url: string) => apiFetch<G>(url);
const post = <G>(url: string, body?: unknown) =>
  apiFetch<G>(url, { method: "POST", body });
const put = <G>(url: string, body?: unknown) =>
  apiFetch<G>(url, { method: "PUT", body });
const patch = <G>(url: string, body?: unknown) =>
  apiFetch<G>(url, { method: "PATCH", body });
const dele = <G>(url: string) => apiFetch<G>(url, { method: "DELETE" });

export const api = { get, post, put, patch, delete: dele };
