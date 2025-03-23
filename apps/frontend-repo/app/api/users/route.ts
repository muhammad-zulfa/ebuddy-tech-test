import { getUsers } from "@/apis/user-api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getUsers();
    return NextResponse.json(data);
  } catch (err: unknown) {
    if (err instanceof Error) {
      if (err.message === "fetch failed") {
        return NextResponse.json([], { status: 500 });
      }
      return NextResponse.json([], { status: 404 });
    }
  }
}
