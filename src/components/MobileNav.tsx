import { useState } from "react";

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

  return (
    <>
      <button
        className="mobile-nav-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        Menu
      </button>

      <div className={`mobile-nav-panel${open ? " is-open" : ""}`}>
        <div className="mobile-nav-header">
          <span>Navigate</span>
          <button type="button" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>

        <nav id="mobile-navigation" aria-label="Mobile navigation">
          <ul className="mobile-nav-list">
            {items.map((item) => {
              const active = !item.external && currentPath === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={active ? "is-active" : undefined}
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
    </>
  );
}
