export function formatIsoToFrenchShort(isoString: string): string {
  const date = new Date(isoString);

  const day = date.getUTCDate();
  const monthShort = date.toLocaleString("en-GB", {
    month: "short",
    timeZone: "UTC"
  });
  const year = date.getUTCFullYear();

  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  return `${day} ${monthShort} ${year} à ${hours}:${minutes}`
}