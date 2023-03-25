import { mimes } from "mrmime";

export default eventHandler(async (event) => {
  const { url } = getQuery(event);

  const { loadFavicon, getDefaultFavicon } = useFavicon();
  const { cacheHeaders } = useCache();

  setResponseHeader(event, "Content-Type", mimes["png"]);
  setResponseHeaders(event, {
    "Content-Type": mimes["png"],
    ...cacheHeaders,
  });

  return Buffer.from(await loadFavicon(getDefaultFavicon(url as string)));
});
