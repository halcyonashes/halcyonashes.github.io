"use client";
import { useEffect, useState } from "react";

interface NavItem {
  id: string;
  label: string;
}

export default function SectionNav({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    // threshold 0, not 0.5: the root band is only 5% of the viewport tall,
    // so a taller section could never have half its area inside it.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0, rootMargin: "-40% 0px -55% 0px" }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <ul className="flex gap-4 text-sm">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className="nav-link inline-block py-1"
            aria-current={active === item.id ? "true" : undefined}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
