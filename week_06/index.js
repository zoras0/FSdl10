const { useState, useEffect } = React;

function App() {
  const [particles, setParticles] = useState([]);
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
  const [glowSize, setGlowSize] = useState(100); // Initial size of the glow

  // Function to create particles on mouse move
  const createParticles = (event) => {
    const { clientX, clientY } = event;

    // Create a new particle object with random values for size, speed, and opacity
    const newParticle = {
      id: Date.now(),
      x: clientX,
      y: clientY,
      size: Math.random() * 10 + 5, // Random size between 5px and 15px
      speedX: Math.random() * 2 - 1, // Random speed X (left or right)
      speedY: Math.random() * 2 - 1, // Random speed Y (up or down)
      opacity: Math.random() * 0.5 + 0.5, // Random opacity between 0.5 and 1
      createdAt: Date.now(),
    };

    setParticles((prevParticles) => [...prevParticles, newParticle]);
    setGlowPosition({ x: clientX, y: clientY });
    setGlowSize(150); // Change the size of the glow based on mouse position
  };

  // Mousemove event listener to track mouse movements
  useEffect(() => {
    const mouseMoveHandler = (event) => {
      createParticles(event);
    };

    document.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  // Clean up old particles after a certain time (to avoid memory leak)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setParticles((prevParticles) => {
        return prevParticles.filter(
          (particle) => now - particle.createdAt < 1000 // Remove particles older than 1 second
        );
      });
    }, 100); // Check every 100ms

    return () => clearInterval(interval);
  }, []);

  // Update particles' positions based on their speed
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => ({
          ...particle,
          x: particle.x + particle.speedX,
          y: particle.y + particle.speedY,
        }))
      );
    }, 16); // Update every 16ms (approx 60fps)

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="root">
      {/* Render the glow effect at mouse position */}
      <div
        className="glow"
        style={{
          left: `${glowPosition.x - glowSize / 2}px`, // Adjust so it's centered
          top: `${glowPosition.y - glowSize / 2}px`,  // Adjust so it's centered
          width: `${glowSize}px`,  // Glow size dynamically changes
          height: `${glowSize}px`, // Glow size dynamically changes
        }}
      ></div>

      {/* Render particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x - particle.size / 2}px`, // Adjust so particle is centered
            top: `${particle.y - particle.size / 2}px`,  // Adjust so particle is centered
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDuration: "1s", // This makes sure each particle animates for 1 second
          }}
        ></div>
      ))}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
