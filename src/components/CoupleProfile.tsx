import { Card, CardContent } from "@/components/ui/card";

export default function CoupleProfile() {
  return (
    <section className="py-20 bg-background" id="couple">
      <div className="container mx-auto px-4">
        {/* Groom Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl text-primary mb-3">The Groom</h3>
            <h2 className="text-4xl md:text-5xl text-primary mb-6">Bayu</h2>
            <p className="text-lg text-primary/80 mb-2">Son of</p>
            <p className="text-lg text-primary/80">Bapak Tonny Trisna & Ibu Tjendrawati</p>
            <a
              href="https://www.instagram.com/jonathantrisna/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-primary/70 hover:text-primary transition-colors"
            >
              @bayutrisna
            </a>
          </div>

          <Card className="mx-auto max-w-md overflow-hidden bg-transparent border-0 shadow-none">
            <CardContent className="p-0">
              <img
                src="https://ext.same-assets.com/2165661133/1802214340.jpeg"
                alt="Bayu"
                className="w-full object-cover aspect-[3/4] rounded-lg"
              />
            </CardContent>
          </Card>
        </div>

        {/* Bride Section */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-2xl text-primary mb-3">The Bride</h3>
            <h2 className="text-4xl md:text-5xl text-primary mb-6">Shahya</h2>
            <p className="text-lg text-primary/80 mb-2">Daughter of</p>
            <p className="text-lg text-primary/80">Bapak Eko Martono & Ibu Dwani Punang Raras</p>
            <a
              href="https://www.instagram.com/ayuudiwidi/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-primary/70 hover:text-primary transition-colors"
            >
              @shahyadiwidi
            </a>
          </div>

          <Card className="mx-auto max-w-md overflow-hidden bg-transparent border-0 shadow-none">
            <CardContent className="p-0">
              <img
                src="https://ext.same-assets.com/2165661133/1593999192.jpeg"
                alt="Shahya"
                className="w-full object-cover aspect-[3/4] rounded-lg"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
