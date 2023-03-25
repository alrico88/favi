import { fetchFavicon } from "@meltwater/fetch-favicon";

export function useFavicon() {
  function resolveFavicon(url: string): Promise<string> {
    return fetchFavicon(url);
  }

  function loadFavicon(url: string): Promise<ArrayBuffer> {
    return $fetch(url, {
      responseType: "arrayBuffer",
    });
  }

  return {
    resolveFavicon,
    loadFavicon,
  };
}
