import Section from "@/component/section";
import Card from "@/component/card";
import { profile } from "@/data/profile";

export default function Experience() {
  return (
    <Section
      id="experience"
      title={
        <span className="bg-gradient-to-r from-[#001f3f] via-[#003366] to-[#001f3f] bg-clip-text text-transparent">
          Experience
        </span>
      }
    >
      <div className="grid gap-6 md:grid-cols-2 text-justify">
        {profile.experience.map((e, i) => (
          <Card key={i}>
            <h3 className="font-semibold text-[#001f3f]">
              {e.role} — {e.org}
            </h3>
            <p className="text-sm text-gray-500">{e.period}</p>
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1 text-gray-700">
              {e.bullets.map((b, j) => (
                <li key={j}>{b}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}
