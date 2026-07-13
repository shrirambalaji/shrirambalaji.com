import { useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { createPortal } from "react-dom";

import type { NavItem } from "../lib/site";

interface Props {
  currentPath: string;
  items: NavItem[];
}

const ACTIVE_SECTION_OFFSET = 140;
const HASH_PREFIX_RE = /^#/;
const SCROLL_BOTTOM_TOLERANCE = 4;

const getHashTarget = () => window.location.hash.replace(HASH_PREFIX_RE, "");

const getInitialActiveSection = (currentPath: string) => {
  if (currentPath === "/uses") {
    return "uses";
  }

  if (currentPath === "/") {
    return "about";
  }

  return null;
};

const getNavSection = (href: string) => {
  if (href === "/uses") {
    return "uses";
  }

  if (href.startsWith("/#")) {
    return href.slice(2);
  }
};

const getAriaCurrent = (active: boolean, section: string | undefined) => {
  if (!active || !section) {
    return;
  }

  return section === "uses" ? "page" : "location";
};

const getResolvedHref = (currentPath: string, href: string) =>
  currentPath === "/" && href.startsWith("/#") ? href.slice(1) : href;

const isScrolledToBottom = () =>
  window.innerHeight + window.scrollY >=
  document.documentElement.scrollHeight - SCROLL_BOTTOM_TOLERANCE;

const getOffsetVisibleSectionId = (
  sections: HTMLElement[],
  offset: number
): string | null => {
  for (const section of [...sections].toReversed()) {
    const rect = section.getBoundingClientRect();

    if (rect.top <= offset && rect.bottom > offset) {
      return section.id;
    }
  }

  return null;
};

const getPendingSectionId = (
  pendingSectionId: string | null,
  sectionsById: Map<string, HTMLElement>,
  offset: number
) => {
  if (!pendingSectionId) {
    return null;
  }

  const pendingSection = sectionsById.get(pendingSectionId);

  if (!pendingSection) {
    return null;
  }

  const pendingRect = pendingSection.getBoundingClientRect();

  return {
    activeSectionId: pendingSection.id,
    settled: pendingRect.top <= offset && pendingRect.bottom > offset,
  };
};

const getHashedSectionId = (
  sectionsById: Map<string, HTMLElement>,
  offset: number
) => {
  const hashTarget = getHashTarget();
  const hashedSection = sectionsById.get(hashTarget);

  if (!hashedSection) {
    return null;
  }

  const hashRect = hashedSection.getBoundingClientRect();

  if (
    hashRect.bottom > 0 &&
    (hashRect.top <= offset || hashRect.bottom <= window.innerHeight)
  ) {
    return hashedSection.id;
  }

  return null;
};

const getResolvedActiveSection = (
  sections: HTMLElement[],
  sectionsById: Map<string, HTMLElement>,
  pendingSectionId: string | null,
  offset: number
) => {
  const pendingSection = getPendingSectionId(
    pendingSectionId,
    sectionsById,
    offset
  );

  if (pendingSection) {
    return pendingSection;
  }

  const hashedSectionId = getHashedSectionId(sectionsById, offset);

  if (hashedSectionId) {
    return {
      activeSectionId: hashedSectionId,
      settled: true,
    };
  }

  if (isScrolledToBottom()) {
    const lastSection = sections.at(-1);

    if (lastSection) {
      return {
        activeSectionId: lastSection.id,
        settled: true,
      };
    }
  }

  return {
    activeSectionId: getOffsetVisibleSectionId(sections, offset) ?? "about",
    settled: true,
  };
};

const DesktopNav = ({ currentPath, items }: Props) => {
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
  const handleDesktopNavClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    const { section } = event.currentTarget.dataset;

    if (!section || section === "uses" || currentPath !== "/") {
      return;
    }

    const targetSection = document.querySelector(`#${section}`);

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
  };

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
    let cleanupListeners: (() => void) | null = null;

    const start = () => {
      const sections = sectionIds
        .map((id) => document.querySelector(`#${id}`))
        .filter((section): section is HTMLElement => section !== null);

      if (sections.length !== sectionIds.length) {
        frameId = requestAnimationFrame(start);
        return;
      }

      const sectionsById = new Map(
        sections.map((section) => [section.id, section] as const)
      );

      const setHashSectionActive = () => {
        const hashTarget = getHashTarget();
        const hashedSection = sectionsById.get(hashTarget);

        if (hashedSection) {
          setActiveSection(hashedSection.id);
          return true;
        }

        return false;
      };

      const resolveActiveSection = () => {
        const nextSection = getResolvedActiveSection(
          sections,
          sectionsById,
          pendingSectionRef.current,
          ACTIVE_SECTION_OFFSET
        );

        setActiveSection(nextSection.activeSectionId);

        if (nextSection.settled) {
          pendingSectionRef.current = null;
        }
      };

      observer = new IntersectionObserver(resolveActiveSection, {
        rootMargin: `-${ACTIVE_SECTION_OFFSET}px 0px -65% 0px`,
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
        const hashTarget = getHashTarget();
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
        const initialHash = getHashTarget();
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
      cleanupListeners?.();
    };
  }, [sectionIds]);

  return (
    <nav aria-label="Primary" className="hidden min-[700px]:block">
      <ul className="m-0 flex list-none items-center gap-[1.35rem] p-0">
        {items.map((item) => {
          const section = getNavSection(item.href);
          const active = !item.external && section === activeSection;

          return (
            <li key={item.href}>
              <a
                aria-current={getAriaCurrent(active, section)}
                className={navLinkClasses}
                data-nav-link={section ? "true" : undefined}
                data-section={section}
                href={getResolvedHref(currentPath, item.href)}
                onClick={handleDesktopNavClick}
                rel={item.external ? "noreferrer" : undefined}
                target={item.external ? "_blank" : undefined}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

const MobileNav = ({ currentPath, items }: Props) => {
  const [open, setOpen] = useState(false);
  const linkClasses =
    "mobile-nav-link flex items-center justify-between py-[0.15rem] text-base tracking-[-0.01em] text-muted transition-colors duration-150";
  const portalRoot = typeof document === "undefined" ? null : document.body;
  const resolveNavHref = (href: string) =>
    currentPath === "/" && href.startsWith("/#") ? href.slice(1) : href;
  const closeMenu = () => setOpen(false);
  const toggleMenu = () => setOpen((value) => !value);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const overlay = (
    <div
      aria-hidden={open ? undefined : "true"}
      className={`mobile-nav-overlay fixed inset-0 z-50 overflow-y-auto backdrop-blur-[18px] transition-opacity duration-150 min-[700px]:hidden ${
        open
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-[46.5rem] flex-col px-6 pt-4 pb-10 md:px-4 md:pt-[2.9rem] md:pb-13">
        <div className="mt-0.5 mb-7 flex items-center justify-between py-[0.65rem] font-medium text-muted-soft text-sm">
          <span>Navigate</span>
          <button
            className="border-0 bg-transparent p-0 font-medium text-ghostindigo-800 text-sm tracking-[-0.00563rem]"
            onClick={closeMenu}
            type="button"
          >
            Close
          </button>
        </div>

        <nav aria-label="Mobile navigation" id="mobile-navigation">
          <ul className="m-0 grid list-none gap-3 p-0">
            {items.map((item) => {
              const active =
                !item.external &&
                ((currentPath === "/" && item.href === "/#about") ||
                  (currentPath === "/uses" && item.href === "/uses"));
              return (
                <li key={item.href}>
                  <a
                    className={`${linkClasses} ${active ? "text-ghostindigo-900" : ""}`}
                    href={resolveNavHref(item.href)}
                    onClick={closeMenu}
                    rel={item.external ? "noreferrer" : undefined}
                    target={item.external ? "_blank" : undefined}
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
        aria-controls="mobile-navigation"
        aria-expanded={open}
        className="inline-flex border-0 bg-transparent p-0 font-medium text-ghostindigo-800 text-sm tracking-[-0.00563rem] min-[700px]:hidden"
        onClick={toggleMenu}
        type="button"
      >
        Menu
      </button>
      {open && portalRoot ? createPortal(overlay, portalRoot) : null}
    </>
  );
};

export const Navigation = (props: Props) => (
  <>
    <DesktopNav {...props} />
    <MobileNav {...props} />
  </>
);
