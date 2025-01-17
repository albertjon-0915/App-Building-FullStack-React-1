import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const App = () => {
     const particlesInit = useCallback(async (engine) => {
          console.log(engine);
          await loadSlim(engine);
     }, []);

     const particlesLoaded = useCallback(async (container) => {
          await console.log(container);
     }, []);

     return (
          <Particles
               id="tsparticles"
               init={particlesInit}
               loaded={particlesLoaded}
               options={{
                    background: {
                         color: {
                              value: "#ffffff",
                         },
                    },
                    fpsLimit: 120,
                    interactivity: {
                         events: {
                              onClick: {
                                   enable: true,
                                   mode: "push",
                              },
                              onHover: {
                                   enable: false,
                                   mode: "repulse",
                              },
                              resize: true,
                         },
                         modes: {
                              push: {
                                   quantity: 1,
                              },
                              repulse: {
                                   distance: 200,
                                   duration: 0.4,
                              },
                         },
                    },
                    particles: {
                         color: {
                              value: "#57575765",
                         },
                         links: {
                              color: "#57575765",
                              distance: 150,
                              enable: true,
                              opacity: 0.5,
                              width: 1,
                         },
                         move: {
                              direction: "none",
                              enable: true,
                              outModes: {
                                   default: "bounce",
                              },
                              random: false,
                              speed: 1,
                              straight: false,
                         },
                         number: {
                              density: {
                                   enable: true,
                                   area: 800,
                              },
                              value: 80,
                         },
                         opacity: {
                              value: 0.5,
                         },
                         shape: {
                              type: "circle",
                         },
                         size: {
                              value: { min:0, max: 1 },
                         },
                    },
                    detectRetina: true,
               }}
          />
     );
};

export default App;
