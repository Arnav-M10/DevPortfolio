"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { QuantumGlyph } from "@/components/quantum-glyph";

const navigation = [
  { href: "/about", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/work", label: "work" },
  { href: "/awards", label: "awards" },
  { href: "/pics", label: "pics" },
  { href: "/contact", label: "contact" },
] as const;

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/arnavm10/",
    label: "LinkedIn",
    icon: "linkedin",
  },
  {
    href: "https://github.com/Arnav-M10/",
    label: "GitHub",
    icon: "github",
  },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [centralTime, setCentralTime] = useState("--:--:--");

  useEffect(() => {
    const updateCentralTime = () => {
      setCentralTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "America/Chicago",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    };

    updateCentralTime();
    const timer = window.setInterval(updateCentralTime, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <header className={`site-header ${isHome ? "is-home" : "is-route"}`}>
      <div className="header-home-zone">
        <Link
          className="constant-mark"
          href="/"
          aria-label="ArnavMittal home"
          aria-hidden={!isHome}
          tabIndex={isHome ? 0 : -1}
        >
          <span className="constant-equation" aria-hidden="true">
            {centralTime} CST
          </span>
          <small>UTC−6</small>
        </Link>
        <Link
          className="route-home-hero"
          href="/"
          aria-label="Return to ArnavMittal home"
          aria-hidden={isHome}
          tabIndex={isHome ? -1 : 0}
        >
          <span className="route-home-glyph" aria-hidden="true">
            <QuantumGlyph />
          </span>
          <span className="route-home-copy">
            <span className="route-home-title">
              <span className="name-blue">Arnav</span><span className="name-mauve">Mittal</span>
            </span>
            <small>basepoint</small>
          </span>
        </Link>
      </div>

      <div className="header-actions">
        <nav className="site-nav" aria-label="Portfolio navigation">
          <ul>
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="social-nav" aria-label="Social links">
          <ul>
            {socialLinks.map((item) => (
              <li key={item.label}>
                <a
                  className={`social-link social-${item.icon}`}
                  href={item.href}
                  aria-label={item.label}
                  title={item.label}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  <span className="social-icon" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
