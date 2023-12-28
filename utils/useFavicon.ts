import { fetchFavicon } from "@meltwater/fetch-favicon";
import { parseURL, stringifyParsedURL, resolveURL, $URL } from "ufo";

export function useFavicon() {
  function getDefaultFavicon(url: string): string {
    const parsedUrl = new $URL(url);

    return `https://ui-avatars.com/api/?name=${parsedUrl.host}`;
  }

  async function resolveFavicon(url: string): Promise<string> {
    const parsedOriginalUrl = new $URL(url);

    const faviconUrl = (await fetchFavicon(parsedOriginalUrl.href)) as string;

    // Prevent hash and search params
    const parsedFaviconUrl = parseURL(faviconUrl);
    parsedFaviconUrl.search = "";
    parsedFaviconUrl.hash = "";

    let asStr = stringifyParsedURL(parsedFaviconUrl);

    if (faviconUrl.startsWith("/")) {
      asStr = resolveURL(
        `${parsedOriginalUrl.protocol}//${parsedOriginalUrl.host}`,
        asStr,
      );
    }

    return asStr;
  }

  function loadFavicon(url: string): Promise<ArrayBuffer> {
    try {
      return $fetch<ArrayBuffer>(url, {
        responseType: "arrayBuffer",
        redirect: "error",
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
