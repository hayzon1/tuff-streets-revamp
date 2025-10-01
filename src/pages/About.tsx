const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-display mb-6 glitch">TOO TUFF</h1>
          <p className="text-xl md:text-2xl font-semibold mb-4">
            Raw. Underground. Unapologetic.
          </p>
          <p className="text-lg text-muted-foreground">
            Born from the streets of Lagos, built for the Alte generation
          </p>
        </div>

        {/* Story */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-display mb-6">OUR STORY</h2>
          <div className="space-y-4 text-lg text-foreground/80">
            <p>
              Too Tuff isn't just a clothing brand – it's a movement. Founded in Lagos by youth, 
              for youth, we represent the unapologetic spirit of Nigeria's alternative culture.
            </p>
            <p>
              From rooftop sessions to skate parks, from underground shows to viral moments, 
              we're where the culture lives. Every piece we create is born from real experiences, 
              authentic expressions, and the raw energy of Lagos streets.
            </p>
            <p>
              We don't follow trends – we set them. We don't do ordinary – we do Too Tuff.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="text-center p-8 bg-muted/30">
            <h3 className="text-2xl font-display mb-4">AUTHENTIC</h3>
            <p className="text-foreground/70">
              Real culture, real stories, real people. No corporate BS.
            </p>
          </div>
          <div className="text-center p-8 bg-muted/30">
            <h3 className="text-2xl font-display mb-4">REBELLIOUS</h3>
            <p className="text-foreground/70">
              We challenge norms and celebrate individuality.
            </p>
          </div>
          <div className="text-center p-8 bg-muted/30">
            <h3 className="text-2xl font-display mb-4">COMMUNITY</h3>
            <p className="text-foreground/70">
              Built by the culture, for the culture. We rise together.
            </p>
          </div>
        </div>

        {/* Team/BTS */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-display mb-8 text-center">BEHIND THE SCENES</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-square bg-muted/50" />
            ))}
          </div>
        </div>

        {/* Mission */}
        <div className="max-w-2xl mx-auto text-center bg-primary text-primary-foreground p-12">
          <h2 className="text-3xl md:text-4xl font-display mb-4">OUR MISSION</h2>
          <p className="text-xl">
            To empower Lagos youth through authentic self-expression, 
            creating a global platform for alternative African culture.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
