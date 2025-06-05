export default function Video() {
  return (
    <section className="py-20 bg-[#F5F1F2] relative" id="video">
      <div className="mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-card rounded-lg overflow-hidden shadow-lg">
            <video
              className="w-full h-auto aspect-video object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              <source src="https://res.cloudinary.com/dizje8tlf/video/upload/v1749110025/prewed-edit_r7dzjx.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
