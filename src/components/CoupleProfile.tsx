import GroomProfile from "./GroomProfile";
import BrideProfile from "./BrideProfile";
import ScrollVelocity from "./ui/ScrollVelocity/ScrollVelocity";

export default function CoupleProfile() {
  return (
    <section className="bg-background" id="couple">
      <div>
        <GroomProfile />
        <div className="h-96 flex items-center">
          <ScrollVelocity
            texts={["#BAYUakhirnyaSAHYA", "#BAYUakhirnyaSAHYA"]}
            velocity={100}
            className="text-primary my-8"
            scrollerClassName="text-4xl md:text-6xl font-bold"
          />
        </div>
        <BrideProfile />
      </div>
    </section>
  );
}
