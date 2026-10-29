import { useSettings } from "@/contexts/settings-hook";
import { Link } from "@/i18n/navigation";

export default function NotFoundPage() {
  const { language } = useSettings();
  return (
    <main className="flex min-h-dvh items-center justify-center bg-muted/40">
      <div className="text-center">
        <h1 className="mb-4 text-4xl">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">
          {language === "de" ? "Diese Seite wurde nicht gefunden." : "Oops! Page not found"}
        </p>
        <Link className="text-primary underline underline-offset-4" href="/">
          {language === "de" ? "Zur Startseite" : "Return to Home"}
        </Link>
      </div>
    </main>
  );
}
