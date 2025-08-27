
export function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="section-heading">About The Generator</h2>
        
        <div className="max-w-4xl mx-auto">
          <p className="animate-fade-in mb-6 text-lg text-gray-700 leading-relaxed">
            <span className="text-generator-green font-semibold">The Generator</span> is Babson College's Interdisciplinary AI Lab and entrepreneurship hub. We empower students and associates through workshops, mentorship, and hands-on experiences to transform innovative ideas into successful ventures.
          </p>
          
          <div className="animate-fade-in animate-delay-100 mb-8 p-6 bg-generator-lightGold rounded-xl">
            <h3 className="text-xl font-bold text-generator-darkGreen mb-4">Your Gateway to Entrepreneurship</h3>
            <p className="text-gray-700">
              Whether you're a student builder, tech enthusiast, or aspiring entrepreneur, our events provide the perfect environment to learn, connect, and create. From weekly Builder's Days to intensive buildathons, we offer diverse opportunities to develop your skills and launch your ventures.
            </p>
          </div>
          
          <p className="animate-fade-in animate-delay-200 text-lg text-gray-700 mb-8">
            Stay connected with our vibrant community and never miss an opportunity to grow your entrepreneurial journey. Check out our upcoming events and join us in building the future together!
          </p>
          
          <div className="animate-fade-in animate-delay-300 flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://www.babson.edu/academics/centers/the-generator/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-generator-green px-6 py-3 text-white font-medium hover:bg-generator-darkGreen transition-colors"
            >
              Learn More About Us
            </a>
            <a 
              href="https://www.babson.edu/academics/centers/the-generator/associates/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border-2 border-generator-green px-6 py-3 text-generator-green font-medium hover:bg-generator-lightGold transition-colors"
            >
              Associates Application
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
