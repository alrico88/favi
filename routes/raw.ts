export default defineEventHandler<{ query: { url: string } }>((event) => {
  const { resolveFavicon } = useFavicon();

  const { url } = getQuery(event);

  return resolveFavicon(url);
});
