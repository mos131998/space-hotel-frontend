import { ApiError } from "@/lib/api/api.error";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  token?: string;
};

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const parseJson = (text: string): unknown => {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const getRecordValue = (value: unknown, key: string): string | undefined => {
  if (!value || typeof value !== "object") return undefined;

  const record = value as Record<string, unknown>;
  const result = record[key];

  return typeof result === "string" ? result : undefined;
};

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
  const text = await res.text();

  if (!res.ok) {
    const error = parseJson(text);
    const message =
      getRecordValue(error, "message") ||
      getRecordValue(error, "error") ||
      res.statusText ||
      "Request failed";
    const code =
      getRecordValue(error, "code") ||
      getRecordValue(error, "statusCode") ||
      String(res.status);

    throw new ApiError(
      message,
      code,
      typeof error === "object" && error !== null
        ? (error as Record<string, unknown>)
        : { response: error },
    );
  }

  if (!text) {
    return undefined as G;
  }
  const json = parseJson(text);

  if (typeof json !== "object" || json === null) {
    return json as G;
  }

  const record = json as Record<string, unknown>;
  return (record.data ?? record) as G;
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
