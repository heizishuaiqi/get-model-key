interface HeroSectionProps {
  title: string;
  subtitle: string;
}

export default function HeroSection({ title, subtitle }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background with ambient gradient */}
      <div className="absolute inset-0 z-0 bg-bg-app">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 18% 24%, rgba(47,163,95,0.18) 0%, rgba(47,163,95,0) 34%),
              radial-gradient(circle at 38% 72%, rgba(6,125,118,0.10) 0%, rgba(6,125,118,0) 26%),
              linear-gradient(180deg, #111514 0%, #171C1A 100%)
            `
          }}
        />
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--white-04)_1px,transparent_1px),linear-gradient(to_bottom,var(--white-04)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Title */}
          <h1 className="text-hero mb-8 text-text-primary leading-[1.2] md:leading-[1.18] lg:leading-[1.15]">
            {title}
          </h1>
          
          {/* Subtitle */}
          <p className="mx-auto max-w-3xl text-body text-text-secondary">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
