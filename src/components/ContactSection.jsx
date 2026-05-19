import ServisniKontaktCard from "./ServisniKontaktCard";

export default function ContactSection() {
  return (
    <section id="kontakt" style={{ background: "#878787" }} className="py-20">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div style={{ maxWidth: "600px", width: "100%" }}>
          <ServisniKontaktCard large />
        </div>
      </div>
    </section>
  );
}
