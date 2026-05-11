const roles = [
  "Data Scientist", "ML Engineer", "Product Manager", "Cloud Architect", "DevOps Engineer",
  "AI Researcher", "Full-Stack Dev", "Security Analyst", "UX Designer", "Quant Analyst",
  "Bioinformatician", "Robotics Engineer", "Solutions Architect", "Growth Engineer",
];

export function RolesMarquee() {
  return (
    <section id="roles" className="py-20 border-y border-border bg-secondary/20 overflow-hidden">
      <div className="text-center mb-8 px-6">
        <div className="text-sm text-primary tracking-widest uppercase mb-2">Mapped roles</div>
        <h2 className="text-2xl md:text-3xl font-bold">From classroom to <span className="text-gradient">these careers</span></h2>
      </div>
      <div className="flex animate-marquee whitespace-nowrap gap-6">
        {[...roles, ...roles].map((r, i) => (
          <div key={i} className="px-6 py-3 rounded-full bg-card-glass text-sm font-medium shrink-0">
            {r}
          </div>
        ))}
      </div>
    </section>
  );
}
