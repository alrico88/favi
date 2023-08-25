import { convertToMilliseconds, Unit } from "espera";

export function useCache () {
  const cacheHeaders = {
    "Cache-Control": `max-age=${convertToMilliseconds(1, Unit.days)}`,
  };

  return {
    cacheHeaders,
  };
}
