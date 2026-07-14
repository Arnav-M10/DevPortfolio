import type { Metadata } from "next";
import { notFound } from "next/navigation";

const sections = {
  about: {
    title: "about",
    index: "01",
    reference: "worldline",
    copy: "arnav is a student at the Texas Academy of Mathematics and Science, interested in theoretical physics, mathematics, technology, and more.",
  },
  projects: {
    title: "projects",
    index: "02",
    reference: "things made",
    copy: "a growing collection of numerical physics experiments, mathematical software, and useful little tools.",
  },
  work: {
    title: "work",
    index: "03",
    reference: "action",
    copy: "notes from building, learning, and turning questions into small working systems.",
  },
  awards: {
    title: "awards",
    index: "04",
    reference: "small wins",
    copy: "a quiet shelf for scholarships, competitions, recognitions, and other pleasant eigenvalues.",
  },
  pics: {
    title: "pics",
    index: "05",
    reference: "captured photons",
    copy: "photographs, diagrams, blackboards, and small observations from outside the terminal.",
  },
  contact: {
    title: "contact",
    index: "06",
    reference: "signal",
    copy: "the channel is open at arnav.mit10@gmail.com.",
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
      </section>
    </main>
  );
}
