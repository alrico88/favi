import { mimes } from "mrmime";

export default defineEventHandler<{query: {url: string}}>(async (event) => {
  const { url } = getQuery(event);

  const { loadFavicon, getDefaultFavicon } = useFavicon();
  const { cacheHeaders } = useCache();

  setResponseHeaders(event, {
    "Content-Type": mimes.png,
    ...cacheHeaders,
  });

  return Buffer.from(await loadFavicon(getDefaultFavicon(url)));
});
