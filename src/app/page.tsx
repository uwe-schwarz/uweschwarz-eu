import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { detectPreferredLanguage } from "@/lib/detect-language";
import { DEFAULT_LANGUAGE, isSupportedLanguage } from "@/lib/i18n";

export default async function RootPage() {
  const cookieStore = await cookies();
  const cookieLanguage = cookieStore.get("language")?.value;

  if (isSupportedLanguage(cookieLanguage)) {
    redirect(`/${cookieLanguage}`);
  }

  const headerList = await headers();
  const acceptLanguage = headerList.get("accept-language");
  const detected = detectPreferredLanguage(acceptLanguage) ?? DEFAULT_LANGUAGE;

  redirect(`/${detected}`);
}
