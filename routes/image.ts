import { lookup, mimes } from "mrmime";
import { withQuery } from "ufo";

export default eventHandler(async (event) => {
  const { loadFavicon, resolveFavicon } = useFavicon();
  const { cacheHeaders } = useCache();

  const { url } = getQuery(event);
  try {
    const faviconUrl = await resolveFavicon(url as string);

    const favicon = await loadFavicon(faviconUrl);

    mimes["ico"] = "image/x-icon";

    const mime = lookup(faviconUrl);

    setResponseHeaders(event, {
      "Content-Type": mime as string,
      ...cacheHeaders,
    });

    return Buffer.from(favicon);
  } catch {
    return sendRedirect(
      event,
      withQuery("/generic", {
        url,
      })
    );
  }
});
