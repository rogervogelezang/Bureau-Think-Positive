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
            return (
              <div className="reveal" key={i}>
                <HeroBlock {...block} />
              </div>
            );
          case "richText":
            return (
              <div className="reveal" key={i}>
                <RichTextBlock {...block} />
              </div>
            );
          case "serviceGrid":
            return (
              <div className="reveal" key={i}>
                <ServiceGridBlock {...block} locale={locale} />
              </div>
            );
          case "targetGroupGrid":
            return (
              <div className="reveal" key={i}>
                <TargetGroupGridBlock {...block} locale={locale} />
              </div>
            );
          case "teamGrid":
            return (
              <div className="reveal" key={i}>
                <TeamGridBlock {...block} locale={locale} />
              </div>
            );
          case "whyUs":
            return (
              <div className="reveal" key={i}>
                <WhyUsBlock {...block} />
              </div>
            );
          case "cta":
            return (
              <div className="reveal" key={i}>
                <CTABlock {...block} />
              </div>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
