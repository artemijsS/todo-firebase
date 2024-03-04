export { registerUser, loginUser } from "./user";


export const sendData = async <T>({
  url,
  data,
  method = "POST",
}: {
    url: string,
    data: any,
    method?: "POST" | "PATCH" | "PUT",
}): Promise<T | never> => {
    return apiBridge<T>({ url, method, data });
}

const apiBridge = async <T>({
    url,
    method,
    data,
    cache = "no-cache",
}: {
    url: string,
    method: "POST" | "PUT" | "GET" | "DELETE" | "PATCH",
    data?: any,
    cache?: RequestCache,
}): Promise<T | never> => {
    let init: RequestInit = {};

    if (data) {
        init.headers = {
            "Content-Type": "application/json"
        }
        init.body = JSON.stringify(data);
    }

    init.cache = cache;
    init.method = method;

    const res = await fetch(url, {
        ...init,
        headers: {
            ...init.headers,
        }
    });

    let body;

    try {
        body = await res.json();
    } catch {
        throw `Error with getting request ${url}`
    }

    if ((body.errors || body.error || body.message) && res.status !== 200) {
        throw body;
    }

    return body as T;
}
