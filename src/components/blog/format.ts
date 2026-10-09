const fmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/** "1 Oct 2026" from an ISO date. */
export const formatDate = (iso: string) => fmt.format(new Date(`${iso}T00:00:00Z`));
