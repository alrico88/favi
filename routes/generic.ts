import { mimes } from "mrmime";

export default eventHandler(async (event) => {
  const { url } = getQuery(event);

  const { loadFavicon, getDefaultFavicon } = useFavicon();

  setResponseHeader(event, "Content-Type", mimes["png"]);

  return Buffer.from(await loadFavicon(getDefaultFavicon(url as string)));
});
