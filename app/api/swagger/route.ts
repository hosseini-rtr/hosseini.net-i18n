import { swaggerSpec } from "@/lib/swagger-spec";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(swaggerSpec);
}
