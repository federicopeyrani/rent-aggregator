import {
  AfterCallbackAppRoute,
  handleAuth,
  handleCallback,
  NextAppRouterHandler,
} from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

const afterCallback: AfterCallbackAppRoute = async (_req, session, a) => {
  if (
    !session.user["https://www.rent-aggregator.com/roles"]?.includes("admin")
  ) {
    throw new Error("Unauthorized");
  }

  return session;
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const GET = handleAuth({
  callback: (async (req, ctx) => {
    try {
      return await handleCallback(req, ctx, { afterCallback });
    } catch (e) {
      return NextResponse.json(e);
    }
  }) as NextAppRouterHandler,
});
