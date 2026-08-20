import SectionSubNav from "@/components/SectionSubNav";
import { overOnsNav } from "@/lib/nav.en";

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SectionSubNav items={overOnsNav} />
      {children}
    </>
  );
}
