import { lookup, mimes } from "mrmime";
import { withQuery } from "ufo";
import { Unit, convertToMilliseconds } from "espera";

export default eventHandler(async (event) => {
  const { loadFavicon, resolveFavicon } = useFavicon();

  const { url } = getQuery(event);
  try {
    const faviconUrl = await resolveFavicon(url as string);

    const favicon = await loadFavicon(faviconUrl);

    mimes["ico"] = "image/x-icon";

    const mime = lookup(faviconUrl);

    setResponseHeaders(event, {
      "Content-Type": mime as string,
      "Cache-Control": `max-age=${convertToMilliseconds(1, Unit.days)}`,
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
