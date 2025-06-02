import GroomProfile from "./GroomProfile";
import BrideProfile from "./BrideProfile";

export default function CoupleProfile() {
  return (
    <section className="bg-background" id="couple">
      <div>
        <GroomProfile />
        <BrideProfile />
      </div>
    </section>
  );
}
