import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Hero Image"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/50" />
      </div>
      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
          Bayu & Shahya
        </h1>
        <p className="text-xl md:text-2xl text-primary-foreground/70 mb-8">
          We're Getting Married
        </p>
        <p className="text-lg md:text-xl text-primary-foreground/70">
          Sunday, 27 July 2025
        </p>
      </div>
    </section>
  );
} 