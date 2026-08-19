import { footerLinks } from "@/data/landing-data";

export default function Footer() {
  return (
    <footer className="bg-background pt-20 pb-10 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 mb-16">
            <div className="col-span-1 md:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 max-h-10 pt-1.5 mb-1.5 overflow-hidden">
                  <img className="h-full w-auto" src="/refer-mate-square.png" />
                </div>
                <div className="h-10 max-h-10 overflow-hidden p-1 mb-1.5">
                  <img className="h-full w-auto" src="/refer-mate-full.png" />
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                Empowering professionals to connect, grow, and succeed in their
                careers through meaningful referrals.
              </p>
            </div>

            <div className="flex flex-wrap gap-8 md:gap-24 justify-end md:col-start-7 md:col-span-6">
              {footerLinks.map((column, index) => (
                <div key={index} className="">
                  <h3 className="font-semibold mb-6 text-foreground">
                    {column.title}
                  </h3>
                  <ul className="space-y-4">
                    {column.links.map((link, i) => (
                      <li key={i}>
                        <a
                          href={link.href}
                          className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground font-medium">
              © {new Date().getFullYear()} ReferMate. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="https://github.com/Sahil2012/refermate/"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="sr-only">GitHub</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
