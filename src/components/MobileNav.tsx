import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type NavItem = {
  href: string;
  label: string;
  external?: boolean;
};

type Props = {
  currentPath: string;
  items: NavItem[];
};

export function MobileNav({ currentPath, items }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const linkClasses =
    "mobile-nav-link flex items-center justify-between py-[0.15rem] text-base tracking-[-0.01em] text-muted transition-colors duration-150";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mounted, open]);

  const overlay = (
    <div
      className={`mobile-nav-overlay fixed inset-0 z-50 overflow-y-auto backdrop-blur-[18px] transition-opacity duration-150 min-[700px]:hidden ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={open ? undefined : "true"}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-[36.375rem] flex-col px-6 pb-10 pt-4 md:px-4 md:pb-[3.25rem] md:pt-[2.9rem]">
        <div className="mb-7 mt-[2px] flex items-center justify-between py-[0.65rem] text-sm font-medium text-muted-soft">
          <span>Navigate</span>
          <button
            className="border-0 bg-transparent p-0 text-sm font-medium tracking-[-0.00563rem] text-ghostindigo-800"
            type="button"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>

        <nav id="mobile-navigation" aria-label="Mobile navigation">
          <ul className="m-0 grid list-none gap-3 p-0">
            {items.map((item) => {
              const active =
                !item.external &&
                ((currentPath === "/" && item.href === "/#about") ||
                  (currentPath === "/uses" && item.href === "/uses"));
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`${linkClasses} ${active ? "text-ghostindigo-900" : ""}`}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    <span>{item.label}</span>
                    <span aria-hidden="true">{item.external ? "↗" : "→"}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );

  return (
    <>
      <button
        className="inline-flex border-0 bg-transparent p-0 text-sm font-medium tracking-[-0.00563rem] text-ghostindigo-800 min-[700px]:hidden"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        Menu
      </button>
      {mounted ? createPortal(overlay, document.body) : null}
    </>
  );
}
