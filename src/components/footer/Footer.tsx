import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="icons">
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
          Cook 'n' Collab 2026
        </p>
      </div>
    </div>
  );
}
