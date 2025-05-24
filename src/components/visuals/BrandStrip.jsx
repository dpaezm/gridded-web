import imagotipo from "./../../assets/Gridded_imagotipo_black.svg";
import "./BrandStrip.css";

export default function BrandStrip() {
  return (
    <section className="strip-section">
      <div className="marquee">
        <div className="marquee-content">
          {Array.from({ length: 10 }).map((_, i) => (
            <div className="item" key={i}>
              <h3>Works</h3>
              <img src={imagotipo} alt="Logo Gridded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
