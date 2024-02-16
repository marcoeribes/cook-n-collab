import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div className="icons">
          <a
            href="https://github.com/marcoeribes/cook-n-collab"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/icons/github-mark.svg" alt="Github" className="icon" />
          </a>
          <a
            href="https://discord.gg/GmBAp7g9z4"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/icons/discord-mark-blue.svg"
              alt="Discord"
              className="icon"
            />
          </a>
        </div>
        <p>
          Cook 'n' Collab 2024 - Built by{" "}
          <a href="https://marcoeribes.me" target="_blank" className="link">
            Marco Eribes
          </a>
        </p>
      </div>
    </div>
  );
}
