export default function QuranVerse() {
  return (
    <section className="py-24 bg-background relative" id="verse">
      <div
        className="absolute inset-0 bg-[url('https://ext.same-assets.com/2165661133/2979611549.jpeg')] bg-cover bg-center opacity-10"
        style={{ filter: 'brightness(0.5)' }}
      />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <p className="text-xl md:text-3xl text-primary max-w-3xl mx-auto leading-relaxed italic">
          "وَمِنْ ءَايَٰتِهِۦٓ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَٰجًا لِّتَسْكُنُوٓا۟ إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِى ذَٰلِكَ لَءَايَٰتٍ لِّقَوْمٍ يَتَفَكَّرُونَ"
        </p>
        <p className="text-lg md:text-xl text-primary/70 mt-6">
          And one of His signs is that He created for you spouses from among yourselves so that you may find comfort in them. And He has placed between you compassion and mercy. Surely in this are signs for people who reflect.
        </p>
        <p className="text-lg md:text-xl text-primary/70 mt-2">
          QS. Ar-Rum: 21
        </p>
      </div>
    </section>
  );
} 