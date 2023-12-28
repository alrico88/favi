import { convertToMilliseconds, Unit } from "espera";
import type { H3Event } from "h3";

export function setCache(event: H3Event): void {
  setResponseHeader(
    event,
    "Cache-Control",
    `max-age=${convertToMilliseconds(1, Unit.days)}`,
  );
}
