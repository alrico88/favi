import { fetchFavicon } from "@meltwater/fetch-favicon";

export function useFavicon () {
  function getDefaultFavicon (url: string): string {
    const parsedUrl = new URL(url as string);

    return `https://ui-avatars.com/api/?name=${parsedUrl.host}`;
  }

  function resolveFavicon (url: string): Promise<string> {
    const parsedUrl = new URL(url);

    return fetchFavicon(
      `${parsedUrl.protocol}//${parsedUrl.host}:${parsedUrl.port}`,
    );
  }

  function loadFavicon (url: string): Promise<ArrayBuffer> {
    try {
      return $fetch<ArrayBuffer>(url, {
        responseType: "arrayBuffer",
      });
    } catch {
      return loadFavicon(getDefaultFavicon(url));
    }
  }

  return {
    getDefaultFavicon,
    resolveFavicon,
    loadFavicon,
  };
}
