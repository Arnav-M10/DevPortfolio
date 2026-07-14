import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const sections = {
  about: {
    title: "about",
    index: "01",
    reference: "worldline",
    copy: "a placeholder trajectory through study, research, and whatever comes next.",
  },
  projects: {
    title: "projects",
    index: "02",
    reference: "things made",
    copy: "selected placeholder experiments in numerical physics, mathematical software, and useful little tools.",
  },
  work: {
    title: "work",
    index: "03",
    reference: "action",
    copy: "selected placeholder work in numerical physics, scientific software, and useful little tools.",
  },
  awards: {
    title: "awards",
    index: "04",
    reference: "small wins",
    copy: "a placeholder shelf for scholarships, competitions, recognitions, and other pleasant eigenvalues.",
  },
  pics: {
    title: "pics",
    index: "05",
    reference: "captured photons",
    copy: "placeholder photographs, diagrams, blackboards, and small observations from outside the terminal.",
  },
  contact: {
    title: "contact",
    index: "06",
    reference: "signal",
    copy: "the placeholder channel is open at placeholder@example.com.",
  },
} as const;

type Section = keyof typeof sections;

interface SectionPageProps {
  params: Promise<{ section: string }>;
}

function isSection(value: string): value is Section {
  return value in sections;
}

export function generateStaticParams() {
  return Object.keys(sections).map((section) => ({ section }));
}

export async function generateMetadata({
  params,
}: SectionPageProps): Promise<Metadata> {
  const { section } = await params;

  if (!isSection(section)) return {};

  return {
    title: `${sections[section].title} — eigenstate`,
    description: sections[section].copy,
  };
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { section } = await params;

  if (!isSection(section)) notFound();

  const content = sections[section];

  return (
    <main className="route-shell">
      <section className="route-content" aria-labelledby="section-title">
        <span className="route-label">
          {content.index} / {content.reference}
        </span>
        <h2 id="section-title">{content.title}</h2>
        <p className="route-copy">{content.copy}</p>
        <Link className="route-back" href="/">
          x₀ ← local frame
        </Link>
      </section>
    </main>
  );
}
