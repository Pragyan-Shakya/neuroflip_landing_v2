import { SiteFooter } from "../SiteFooter";
import { SiteNav } from "../SiteNav";
import { SkipLink } from "../SkipLink";

export function BlogShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipLink />
      <SiteNav />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}
