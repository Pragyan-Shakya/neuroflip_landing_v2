import { MilestoneExplorer } from "./MilestoneExplorer";
import { SectionHead } from "./SectionHead";

export function Milestones() {
  return (
    <section className="py-11 max-md:py-8" id="milestones">
      <div className="wrap overflow-hidden p-0">
        <SectionHead
          title="Start with the topics past questions have tested most."
          lead="Each exam has a different pattern. Pick your exam to see how many topics you need at each milestone."
        />
        <MilestoneExplorer />
      </div>
    </section>
  );
}
