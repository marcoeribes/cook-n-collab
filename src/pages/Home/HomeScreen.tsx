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
        <header>
          <h1 className="home-title">
            Welcome to {isSmallScreen && <br />} Cook 'n' Collab
          </h1>
        </header>
        <main
          className="container"
          style={{
            maxWidth: "900px",
            width: "100%",
            margin: "20px auto",
            overflow: "hidden",
            textAlign: "justify",
          }}
        >
          <section>
            <p>
              Cooking has never been more collaborative! Cook ‘n’ Collab is a
              platform to post and share recipes with all your followers.
            </p>
            <p>
              It’s like a community cookbook, where everyone on the platform can
              share and edit recipes for everyone to see.
            </p>
          </section>
          <section>
            <h2>A Digital Cookbook 📖</h2>
            <p>
              Easily upload and store your recipes. Add ingredients, steps,
              photos, and unique tags.
            </p>
          </section>
          <section>
            <h2>Collaborate 🤝</h2>
            <p>
              Post your recipes publicly to inspire your followers, or keep them
              private for your eyes only.
            </p>
            <p>
              See a recipe you like? Suggest tweaks or 'fork' it to tailor it to
              your dietary preferences.
            </p>
          </section>
          <section>
            <h2>Effortless Management 🗃️</h2>
            <p>Quickly access all your recipes by searching them.</p>
          </section>
          <section>
            <h2>Seamless Device Sync 📱💻</h2>
            <p>
              Whether you're using a smartphone, tablet, laptop, or desktop,
              your recipes sync across all devices.
            </p>
          </section>
          <section>
            <h2>Support 🎗️</h2>
            <p>
              This is a small project created to encourage more cooking. Have
              any questions? Reach out to us at{" "}
              <a href="mailto:contact@cookncollab.com">
                contact@cookncollab.com
              </a>
              .
            </p>
          </section>
          <footer>
            <p>
              Join Cook ‘n’ Collab today, and transform the way you cook, share,
              and enjoy food! 🍳📲🌍
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
