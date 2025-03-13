
export function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="section-heading">About the Buildathon</h2>
        
        <div className="max-w-4xl mx-auto">
          <p className="animate-fade-in mb-6 text-lg text-gray-700 leading-relaxed">
            The <span className="text-generator-green font-semibold">Buildathon</span> is a one-day hackathon hosted by <span className="text-generator-green font-semibold">The Generator</span>, Babson College's Interdisciplinary AI Lab, taking place on April 5th. To help participants maximize their productivity during this intensive event, we've curated a comprehensive stack of AI tools.
          </p>
          
          <div className="animate-fade-in animate-delay-100 mb-8 p-6 bg-generator-lightGold rounded-xl">
            <h3 className="text-xl font-bold text-generator-darkGreen mb-4">Why We Built This Resource</h3>
            <p className="text-gray-700">
              With only one day to ideate, build, and present your projects, having the right tools at your fingertips is crucial. Our AI Tools Stack provides you with everything you need to accelerate your development process – from web app creation to music generation, 3D design to mobile app development.
            </p>
          </div>
          
          <p className="animate-fade-in animate-delay-200 text-lg text-gray-700">
            Browse through our carefully selected collection of tools, organized by category, and discover how these innovative AI solutions can help you bring your ideas to life faster than ever before.
          </p>
        </div>
      </div>
    </section>
  );
}
