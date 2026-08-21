import HeroBlock from "./HeroBlock";
import RichTextBlock from "./RichTextBlock";
import ServiceGridBlock from "./ServiceGridBlock";
import TargetGroupGridBlock from "./TargetGroupGridBlock";
import TeamGridBlock from "./TeamGridBlock";
import WhyUsBlock from "./WhyUsBlock";
import CTABlock from "./CTABlock";
import type { PageBlock } from "@/lib/payloadTypes";

export default function RenderBlocks({ blocks, locale }: { blocks: PageBlock[]; locale: "nl" | "en" }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.blockType) {
          case "hero":
            return <HeroBlock key={i} {...block} />;
          case "richText":
            return <RichTextBlock key={i} {...block} />;
          case "serviceGrid":
            return <ServiceGridBlock key={i} {...block} locale={locale} />;
          case "targetGroupGrid":
            return <TargetGroupGridBlock key={i} {...block} locale={locale} />;
          case "teamGrid":
            return <TeamGridBlock key={i} {...block} locale={locale} />;
          case "whyUs":
            return <WhyUsBlock key={i} {...block} />;
          case "cta":
            return <CTABlock key={i} {...block} />;
          default:
            return null;
        }
      })}
    </>
  );
}
