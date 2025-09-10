import Section from "@/component/section";
import Card from "@/component/card";
import { profile } from "@/data/profile";

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <Card>
        <ul className="grid grid-cols-2 gap-2 text-sm">
          {profile.skills.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </Card>
    </Section>
  );
}
