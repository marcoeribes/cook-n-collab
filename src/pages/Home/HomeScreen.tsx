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
      <div className="fade-image">
        <img src="/homepage.webp" alt="Home Page" style={{ width: "100%" }} />
      </div>
      <div className="content">
        <header>
          <h1 className="home-title">
            Welcome to {isSmallScreen && <br />} Cook 'n' Collab
          </h1>
        </header>
        <div
          className="container"
          style={{ width: "100%", margin: "20px auto", overflow: "hidden" }}
        >
          <h2>Welcome to Cook 'N' Collab - Where Recipes Meet Collaboration</h2>
          <p>
            At Cook 'N' Collab, we believe that cooking is more than just
            following a recipe - it's an experience to be shared and evolved.
            That's why we've created a unique platform where food lovers and
            culinary enthusiasts come together to create, share, and reinvent
            recipes.
          </p>

          <h3>Explore, Share, Collaborate</h3>
          <ul>
            <li>
              <strong>Explore Recipes:</strong> Dive into a vast collection of
              recipes from around the globe. Whether you're looking for vegan
              delights, meat-lover feasts, or diet-specific dishes like Paleo or
              Keto, our community has something for everyone.
            </li>
            <li>
              <strong>Share Your Creations:</strong> Got a recipe that the world
              needs to try? Upload it with ease and share your culinary
              expertise with our vibrant community.
            </li>
            <li>
              <strong>Collaborate Like Never Before:</strong> Inspired by the
              collaborative power of platforms like GitHub, Cook 'N' Collab
              introduces a new way to cook together.
            </li>
          </ul>

          <h3>Features That Bring Recipes to Life</h3>
          <ul>
            <li>
              <strong>Fork and Transform:</strong> See a recipe you like but
              want to make it your own? Fork it onto your profile and tweak it
              to your heart's content. Turn a meaty dish vegan, or switch up
              ingredients for healthier alternatives.
            </li>
            <li>
              <strong>Recipe Discussions and Reviews:</strong> Engage in lively
              discussions about recipes, share tips, ask questions, and get
              feedback from fellow cooking aficionados.
            </li>
            <li>
              <strong>Pull Requests for Recipes:</strong> Suggest changes to
              recipes directly to the author. Like a GitHub pull request, but
              tastier!
            </li>
            <li>
              <strong>Bookmark Your Favorites:</strong> Save recipes to your
              profile for easy access anytime. It's like your personal digital
              cookbook.
            </li>
          </ul>

          <h3>Join Our Cooking Community</h3>
          <p>
            At Cook 'N' Collab, every dish tells a story, and every recipe is an
            adventure waiting to be tweaked and transformed. Join us in
            redefining the cooking experience, one recipe at a time.
          </p>

          <h3>Ready to Cook and Collaborate?</h3>
          <p>
            Sign up today and start your journey with Cook 'N' Collab. Let's
            make cooking an adventure of collaboration and creativity.
          </p>
        </div>
      </div>
    </div>
  );
}
