import { timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  checkRateLimit,
  getRateLimitKey,
  RATE_LIMITS,
} from "@/lib/rateLimit";
import { checkRequestSize } from "@/lib/security";

export const runtime = "nodejs";

type RequestBody = {
  action?: "verify" | "submit";
  password?: string;
  fullName?: string;
  mobileNumber?: string;
  email?: string;
  fullAddress?: string;
  district?: string;
  thanaOrUpazila?: string;
  deliveryNote?: string;
  deliveryMethod?: "inside_dhaka" | "outside_dhaka";
};

function secureEqual(received: string, expected: string): boolean {
  const receivedBuffer = Buffer.from(received);
  const expectedBuffer = Buffer.from(expected);

  if (receivedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(receivedBuffer, expectedBuffer);
}

function cleanText(value: unknown, maxLength: number): string {
  return String(value ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, maxLength);
}

export async function POST(request: NextRequest) {
  const sizeCheck = checkRequestSize(
    request.headers.get("content-length"),
    32 * 1024
  );

  if (!sizeCheck.valid) {
    return NextResponse.json(
      { ok: false, message: "Request is too large." },
      { status: 413 }
    );
  }

  const rateLimitKey = getRateLimitKey(request);
  const rateLimit = checkRateLimit(rateLimitKey, RATE_LIMITS.auth);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        message: "Too many attempts. Please try again later.",
      },
      { status: 429 }
    );
  }

  const scriptUrl = process.env.PACKAGE_FORM_SCRIPT_URL;
  const apiKey = process.env.PACKAGE_FORM_API_KEY;
  const formPassword = process.env.PACKAGE_FORM_PASSWORD;

  if (!scriptUrl || !apiKey || !formPassword) {
    console.error("Package form environment variables are missing.");

    return NextResponse.json(
      {
        ok: false,
        message: "The form is temporarily unavailable.",
      },
      { status: 503 }
    );
  }

  let body: RequestBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request." },
      { status: 400 }
    );
  }

  const password = String(body.password ?? "");

  if (!secureEqual(password, formPassword)) {
    return NextResponse.json(
      { ok: false, message: "Incorrect password." },
      { status: 401 }
    );
  }

  if (body.action === "verify") {
    return forwardToGoogleSheet(scriptUrl, {
      apiKey,
      action: "status",
    });
  }

  if (body.action !== "submit") {
    return NextResponse.json(
      { ok: false, message: "Invalid action." },
      { status: 400 }
    );
  }

  const fullName = cleanText(body.fullName, 100);
  const mobileNumber = cleanText(body.mobileNumber, 30);
  const email = cleanText(body.email, 150);
  const fullAddress = cleanText(body.fullAddress, 500);
  const district = cleanText(body.district, 100);
  const thanaOrUpazila = cleanText(body.thanaOrUpazila, 100);
  const deliveryNote = cleanText(body.deliveryNote, 500);

  if (
    !fullName ||
    !mobileNumber ||
    !fullAddress ||
    !district ||
    !thanaOrUpazila ||
    !body.deliveryMethod
  ) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please complete all required fields.",
      },
      { status: 400 }
    );
  }

  if (
    body.deliveryMethod !== "inside_dhaka" &&
    body.deliveryMethod !== "outside_dhaka"
  ) {
    return NextResponse.json(
      { ok: false, message: "Please select a delivery method." },
      { status: 400 }
    );
  }

  const deliveryMethod =
    body.deliveryMethod === "inside_dhaka"
      ? "Inside Dhaka"
      : "Outside Dhaka";

  return forwardToGoogleSheet(scriptUrl, {
    apiKey,
    action: "submit",
    fullName,
    mobileNumber,
    email,
    fullAddress,
    district,
    thanaOrUpazila,
    deliveryNote,
    deliveryMethod,
  });
}

async function forwardToGoogleSheet(
  scriptUrl: string,
  payload: Record<string, string>
) {
  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      redirect: "follow",
    });

    const result = await response.json();

    const status =
      result.code === "FORM_CLOSED"
        ? 409
        : result.code === "DUPLICATE_MOBILE"
          ? 409
          : result.ok
            ? 200
            : 400;

    return NextResponse.json(result, { status });
  } catch (error) {
    console.error("Google Sheets request failed:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "The form is temporarily unavailable.",
      },
      { status: 502 }
    );
  }
}