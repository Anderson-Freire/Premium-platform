export function parseTTL(ttl: string | number): number {
  if (typeof ttl == "number") return ttl;

  const match = ttl.match(/^(\d+)([smhd])$/);
  if (!match) throw new Error("Formato de ttl inválido");

  const value = parseInt(match[1]);
  const unit = match[2];

  switch (unit) {
    case "s":
      return value;
    case "m":
      return value * 60;
    case "h":
      return value * 3600;

    case "d":
      return value * 86400;
    default:
      throw new Error("Unidade de tempo inválida!");
  }
}
