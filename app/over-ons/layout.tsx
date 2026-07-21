import SectionSubNav from "@/components/SectionSubNav";
import { overOnsNav } from "@/lib/nav";

export default function OverOnsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SectionSubNav items={overOnsNav} />
      {children}
    </>
  );
}
