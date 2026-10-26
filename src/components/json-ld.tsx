import { certifications, education, experience, hero, site, socials } from "@/portfolio";

export const sameAs = [socials.linkedin, socials.github, socials.x].filter((u) => u && !u.includes("TODO"));

export const person = {
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: site.name,
  url: site.url,
  jobTitle: site.role,
  description: site.description,
  image: `${site.url}${site.photo}`,
  email: `mailto:${site.email}`,
  worksFor: { "@type": "Organization", name: experience[0].company, url: experience[0].url },
  alumniOf: education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.school })),
  hasCredential: certifications.map((c) => ({
    "@type": "EducationalOccupationalCredential",
    name: c.name,
    credentialCategory: "certification",
    recognizedBy: { "@type": "Organization", name: c.issuer },
  })),
  address: { "@type": "PostalAddress", addressLocality: "New Delhi", addressCountry: "IN" },
  seeks: {
    "@type": "Demand",
    name: `${site.role} roles`,
    areaServed: hero.regions.map((name) => ({ "@type": "Place", name })),
  },
  knowsAbout: site.keywords.slice(1),
  sameAs,
};

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", ...data }).replace(/</g, "\\u003c") }}
    />
  );
}
