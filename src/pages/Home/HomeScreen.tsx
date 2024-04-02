import { useEffect, useState } from "react";
import "./HomeScreen.css";

export default function HomeScreen() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1100);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 1200);
    };

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div>
      <div className="content">
        <header
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1 className="home-title">
            Welcome to {isSmallScreen && <br />} Cook 'n' Collab
          </h1>
          <p>
            Cooking has never been more collaborative! Cook ‘n’ Collab is a
            platform to post and share recipes with all your followers. A
            digital community cookbook where everyone on the platform can share
            and edit recipes for everyone to see.
          </p>
        </header>

        <main className="main-content">
          <div className="logo-image">
            <img
              src="/icons/cookncollab-logo2.png"
              alt="logo"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div style={{ display: "grid", order: 1 }}>
            <section
              className="text-box"
              style={{
                opacity: 0,
                animation: "fadeIn 2s",
                animationDelay: "0s",
                animationFillMode: "forwards",
              }}
            >
              <h2>A Digital Cookbook 📖</h2>
              <p>
                Easily upload and store your recipes. Add ingredients, steps,
                photos, and unique tags.
              </p>
            </section>
            <section
              className="text-box"
              style={{
                opacity: 0,
                animation: "fadeIn 2s",
                animationDelay: "1s",
                animationFillMode: "forwards",
              }}
            >
              <h2>Share Recipes 🌐</h2>
              <p>
                Post your recipes publicly to inspire your followers, or keep
                them private for your eyes only.
              </p>
            </section>
            <section
              className="text-box"
              style={{
                opacity: 0,
                animation: "fadeIn 2s",
                animationDelay: "2s",
                animationFillMode: "forwards",
              }}
            >
              <h2>Collaborate 🤝</h2>
              <p>
                See a recipe you like? Suggest tweaks or 'fork' it to tailor it
                to your dietary preferences.
              </p>
            </section>
          </div>

          <div style={{ display: "grid", order: 3 }}>
            <section
              className="text-box"
              style={{
                opacity: 0,
                animation: "fadeIn 2s",
                animationDelay: ".5s",
                animationFillMode: "forwards",
              }}
            >
              <h2>Effortless Management 🗃️</h2>
              <p>Quickly access all your recipes by searching them.</p>
            </section>
            <section
              className="text-box"
              style={{
                opacity: 0,
                animation: "fadeIn 2s",
                animationDelay: "1.5s",
                animationFillMode: "forwards",
              }}
            >
              <h2>Seamless Device Sync 💻</h2>
              <p>
                Whether you're using a smartphone, tablet, laptop, or desktop,
                your recipes sync across all devices.
              </p>
            </section>
            <section
              className="text-box"
              style={{
                opacity: 0,
                animation: "fadeIn 2s",
                animationDelay: "2.5s",
                animationFillMode: "forwards",
              }}
            >
              <h2>Support 🎗️</h2>
              <p>
                This is a small project created to encourage more cooking. Have
                any questions? Reach out to us at
                <a href="mailto:contact@cookncollab.com">
                  contact@cookncollab.com
                </a>
                .
              </p>
            </section>
          </div>
        </main>
        <footer>
          <p>
            Join Cook ‘n’ Collab today, and transform the way you cook, share,
            and enjoy food! 🍳📲🌍
          </p>
        </footer>
      </div>
    </div>
  );
}
