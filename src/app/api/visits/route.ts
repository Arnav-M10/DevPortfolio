const COUNTER_BASE =
  "https://api.counterapi.dev/v1/arnav-eigenstate-7f3c/landing-visitors";

function extractCount(payload: unknown): number | null {
  if (typeof payload === "number" && Number.isFinite(payload)) return payload;
  if (!payload || typeof payload !== "object") return null;

  const record = payload as Record<string, unknown>;
  const directKeys = ["count", "up_count", "value", "total"] as const;

  for (const key of directKeys) {
    const value = record[key];
    if (typeof value === "number" && Number.isFinite(value)) return value;
  }

  return extractCount(record.data ?? record.result);
}

async function requestCounter(increment: boolean) {
  const response = await fetch(`${COUNTER_BASE}${increment ? "/up" : ""}`, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) throw new Error("Visitor counter unavailable");

  return extractCount(await response.json());
}

async function counterResponse(increment: boolean) {
  try {
    const count = await requestCounter(increment);
    return Response.json(
      { count },
      { headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  } catch {
    return Response.json(
      { count: null },
      { headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  }
}

export async function GET() {
  return counterResponse(false);
}

export async function POST() {
  return counterResponse(true);
}
