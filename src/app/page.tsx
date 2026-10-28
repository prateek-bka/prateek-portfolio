import { Hero } from "@/components/home/hero";
import { Experience, FeaturedProjects, Testimonials, WhatIDo } from "@/components/home/sections";
import { Github } from "@/components/home/github";
import { ContactForm } from "@/components/home/contact";
import { Section } from "@/components/section";
import { JsonLd, person } from "@/components/json-ld";
import { site } from "@/portfolio";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatIDo />
      <Experience />
      <FeaturedProjects />
      <Github />
      <Testimonials />
      <Section
        id="contact"
        eyebrow="Contact"
        title={
          <>
            Got a role or a hard problem? <span className="text-gradient">Say hello.</span>
          </>
        }
      >
        <ContactForm />
      </Section>
      <JsonLd
        data={{
          "@type": "ProfilePage",
          url: site.url,
          name: `${site.name} — ${site.role}`,
          mainEntity: person,
        }}
      />
    </>
  );
}
