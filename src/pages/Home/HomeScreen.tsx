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
            <svg
              width="374px"
              height="auto"
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="42 0 326 214"
            >
              <path
                id="steam-1"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="steam"
                d="M426.78,268.95s-17.23,12.9-7,27.5c6.93,9.89,41,24.4,41,40.86,0,24.1-47.58,21.12-50.49,54.64-1.77,20.4,29.25,39.24,29.25,39.24"
                transform="translate(-295.92 -224.85)"
                stroke-dasharray="1,42,30"
              />
              <path
                id="steam-2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="steam"
                d="M514.05,229.35c-.17,13.18-32.64,30.57-32.64,48.59,0,26.6,41,39.4,41,55.86,0,24.1-47.58,21.12-50.49,54.64-1.55,17.87,29,39.1,29.25,39.24"
                transform="translate(-295.92 -224.85)"
                stroke-dasharray="54,4,16,7,48"
              />
              <path
                id="steam-3"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="steam"
                d="M554.36,268.95s-17.23,12.9-7,27.5c6.93,9.89,41,24.4,41,40.86,0,24.1-47.58,21.12-50.49,54.64-1.77,20.4,29.25,39.24,29.25,39.24"
                transform="translate(-295.92 -224.85)"
                stroke-dasharray="48,12,32"
              />
            </svg>
            <div>
              <img
                src="/icons/cookncollab-logo2.png"
                alt="logo"
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
          <div style={{ display: "grid", order: 1 }}>
            <section className="text-box box-animation" id="box1">
              <h2>A Digital Cookbook 📖</h2>
              <p>
                Easily upload and store your recipes. Add ingredients, steps,
                photos, and unique tags.
              </p>
            </section>
            <section className="text-box box-animation" id="box2">
              <h2>Share Recipes 🌐</h2>
              <p>
                Post your recipes publicly to inspire your followers, or keep
                them private for your eyes only.
              </p>
            </section>
            <section className="text-box box-animation" id="box3">
              <h2>Collaborate 🤝</h2>
              <p>
                See a recipe you like? Suggest tweaks or 'fork' it to tailor it
                to your dietary preferences.
              </p>
            </section>
          </div>

          <div style={{ display: "grid", order: 3 }}>
            <section className="text-box box-animation" id="box4">
              <h2>Effortless Management 🗃️</h2>
              <p>Quickly access all your recipes by searching them.</p>
            </section>
            <section className="text-box box-animation" id="box5">
              <h2>Seamless Device Sync 💻</h2>
              <p>
                Whether you're using a smartphone, tablet, laptop, or desktop,
                your recipes sync across all devices.
              </p>
            </section>
            <section className="text-box box-animation" id="box6">
              <h2>Support 🎗️</h2>
              <p>
                This is a small project created to encourage more cooking. Have
                any questions? Reach out to us at &nbsp;
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
