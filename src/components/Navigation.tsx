import { useEffect, useMemo, useRef, useState } from "react";
import type { NavItem } from "../lib/site";
import { createPortal } from "react-dom";

type Props = {
  currentPath: string;
  items: NavItem[];
};

const offset = 140;

const getInitialActiveSection = (currentPath: string) => {
  if (currentPath === "/uses") {
    return "uses";
  }

  if (currentPath === "/") {
    return "about";
  }

  return null;
};

function DesktopNav({ currentPath, items }: Props) {
  const [activeSection, setActiveSection] = useState<string | null>(() =>
    getInitialActiveSection(currentPath)
  );
  const pendingSectionRef = useRef<string | null>(null);
  const navLinkClasses =
    "site-nav-link text-sm font-medium tracking-[-0.00563rem]";
  const sectionIds = useMemo(
    () =>
      items
        .filter((item) => item.href.startsWith("/#"))
        .map((item) => item.href.slice(2)),
    [items]
  );
  const resolveHref = (href: string) =>
    currentPath === "/" && href.startsWith("/#") ? href.slice(1) : href;

  useEffect(() => {
    if (window.location.pathname === "/uses") {
      setActiveSection("uses");
      return;
    }

    if (window.location.pathname !== "/") {
      setActiveSection(null);
      return;
    }

    let frameId = 0;
    let observer: IntersectionObserver | null = null;
    let cleanupListeners = () => { };

    const start = () => {
      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => section !== null);

      if (sections.length !== sectionIds.length) {
        frameId = requestAnimationFrame(start);
        return;
      }

      const sectionsById = new Map(
        sections.map((section) => [section.id, section] as const)
      );

      const setHashSectionActive = () => {
        const hashTarget = window.location.hash.replace(/^#/, "");
        const hashedSection = sectionsById.get(hashTarget);

        if (hashedSection) {
          setActiveSection(hashedSection.id);
          return true;
        }

        return false;
      };

      const resolveActiveSection = () => {
        const lastSection = sections.at(-1);
        const hashTarget = window.location.hash.replace(/^#/, "");
        const hashedSection = sectionsById.get(hashTarget);
        const pendingSection = pendingSectionRef.current
          ? sectionsById.get(pendingSectionRef.current)
          : null;
        const scrolledToBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 4;
        const hashRect = hashedSection
          ? hashedSection.getBoundingClientRect()
          : null;

        if (pendingSection) {
          const pendingRect = pendingSection.getBoundingClientRect();

          setActiveSection(pendingSection.id);

          if (pendingRect.top <= offset && pendingRect.bottom > offset) {
            pendingSectionRef.current = null;
          }

          return;
        }

        if (
          hashedSection &&
          hashRect &&
          hashRect.bottom > 0 &&
          (hashRect.top <= offset || hashRect.bottom <= window.innerHeight)
        ) {
          setActiveSection(hashedSection.id);
          return;
        }

        if (scrolledToBottom && lastSection) {
          setActiveSection(lastSection.id);
          return;
        }

        for (const section of [...sections].reverse()) {
          const rect = section.getBoundingClientRect();

          if (rect.top <= offset && rect.bottom > offset) {
            setActiveSection(section.id);
            return;
          }
        }

        setActiveSection("about");
      };

      observer = new IntersectionObserver(resolveActiveSection, {
        rootMargin: `-${offset}px 0px -65% 0px`,
        threshold: [0, 1],
      });

      for (const section of sections) {
        observer.observe(section);
      }

      const scheduleResolveActiveSection = () => {
        requestAnimationFrame(() => {
          requestAnimationFrame(resolveActiveSection);
        });
      };
      let scrollFrame = 0;

      const handleHistoryNavigation = () => {
        const hashTarget = window.location.hash.replace(/^#/, "");
        pendingSectionRef.current = sectionsById.has(hashTarget)
          ? hashTarget
          : null;
        setHashSectionActive();
        scheduleResolveActiveSection();
      };
      const handleScroll = () => {
        if (scrollFrame) {
          return;
        }

        scrollFrame = requestAnimationFrame(() => {
          scrollFrame = 0;
          resolveActiveSection();
        });
      };

      window.addEventListener("hashchange", handleHistoryNavigation);
      window.addEventListener("popstate", handleHistoryNavigation);
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", resolveActiveSection);

      cleanupListeners = () => {
        window.removeEventListener("hashchange", handleHistoryNavigation);
        window.removeEventListener("popstate", handleHistoryNavigation);
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", resolveActiveSection);
        cancelAnimationFrame(scrollFrame);
      };

      if (window.location.hash) {
        const initialHash = window.location.hash.replace(/^#/, "");
        pendingSectionRef.current = sectionsById.has(initialHash)
          ? initialHash
          : null;
        handleHistoryNavigation();
      } else {
        resolveActiveSection();
      }
    };

    start();

    return () => {
      cancelAnimationFrame(frameId);
      observer?.disconnect();
      cleanupListeners();
    };
  }, [currentPath, sectionIds]);

  return (
    <nav className="hidden min-[700px]:block" aria-label="Primary">
      <ul className="m-0 flex list-none items-center gap-[1.35rem] p-0">
        {items.map((item) => {
          const section =
            item.href === "/uses"
              ? "uses"
              : item.href.startsWith("/#")
                ? item.href.slice(2)
                : undefined;
          const active = !item.external && section === activeSection;

          return (
            <li key={item.href}>
              <a
                href={resolveHref(item.href)}
                className={navLinkClasses}
                aria-current={
                  active
                    ? section === "uses"
                      ? "page"
                      : "location"
                    : undefined
                }
                data-nav-link={section ? "true" : undefined}
                data-section={section}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                onClick={(event) => {
                  if (!section || section === "uses" || currentPath !== "/") {
                    return;
                  }

                  const targetSection = document.getElementById(section);

                  if (!targetSection) {
                    return;
                  }

                  event.preventDefault();
                  pendingSectionRef.current = section;
                  setActiveSection(section);
                  history.pushState(null, "", `#${section}`);
                  targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function MobileNav({ currentPath, items }: Props) {
  const [open, setOpen] = useState(false);
  const linkClasses =
    "mobile-nav-link flex items-center justify-between py-[0.15rem] text-base tracking-[-0.01em] text-muted transition-colors duration-150";
  const portalRoot = typeof document === "undefined" ? null : document.body;
  const resolveNavHref = (href: string) =>
    currentPath === "/" && href.startsWith("/#") ? href.slice(1) : href;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const overlay = (
    <div
      className={`mobile-nav-overlay fixed inset-0 z-50 overflow-y-auto backdrop-blur-[18px] transition-opacity duration-150 min-[700px]:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      aria-hidden={open ? undefined : "true"}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-145.5 flex-col px-6 pb-10 pt-4 md:px-4 md:pb-13 md:pt-[2.9rem]">
        <div className="mb-7 mt-0.5 flex items-center justify-between py-[0.65rem] text-sm font-medium text-muted-soft">
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
                    href={resolveNavHref(item.href)}
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
      {open && portalRoot ? createPortal(overlay, portalRoot) : null}
    </>
  );
}

export const Navigation = (props: Props) => (
  <>
    <DesktopNav {...props} />
    <MobileNav {...props} />
  </>
);