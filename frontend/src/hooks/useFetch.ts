// https://github.com/armenstepanyan/js-tips/blob/master/examples/react-useFetch-custom-hook.md
import { useState, useEffect } from "react";

interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: string;
}

function useFetch<T>(
  url: string,
  initialData: any = {},
  options?: FetchOptions,
  refetch?: boolean | null
): { data: T; loading: boolean; error: boolean } {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { method = "GET", body = "" } = options || {};

  useEffect(() => {
    if (refetch !== null) {
      setLoading(true);
      const request$ = fetch(url, {
        method,
        ...(method !== "GET" && { body }),
      });

      request$
        .then(async (statusResp) => {
          let resp;
          if (statusResp.ok) {
            try {
              // in case if request was succeed and valid JSON data was returned
              resp = await statusResp.clone().json();
              return resp;
            } catch (e) {
              // in case if request was succeed but no JSON data was returned
              resp = await statusResp.text();
              return resp;
            }
          } else {
            throw new Error("Error occured");
          }
        })
        .then((res) => {
          setData(res);
          setError(false);
        })
        .catch(() => {
          setData(null);
          setError(true);
        })
        .finally(() => setLoading(false));
    }
  }, [body, method, refetch, url]);

  return { data, loading, error };
}

export default useFetch;
