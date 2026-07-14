import { QuantumGlyph } from "@/components/quantum-glyph";

const fieldNotes = [
  {
    index: "01",
    label: "studying",
    value: "Texas Academy of Mathematics and Science",
  },
  {
    index: "02",
    label: "building",
    value: "everything and nothing!",
  },
  {
    index: "03",
    label: "currently",
    value: "quantum gravity maxxing",
  },
] as const;

export default function Home() {
  return (
    <main className="landing-shell">
      <div className="ambient-marks" aria-hidden="true">
        <span className="ambient-mark mark-one">∂?</span>
        <span className="ambient-mark mark-two">t + ε</span>
        <span className="ambient-mark mark-three">∞ − 1</span>
        <span className="ambient-mark mark-four">x₁</span>
        <span className="ambient-mark mark-five">∇·B = 0</span>
        <span className="ambient-mark mark-six">ℏ</span>
        <span className="ambient-mark mark-seven">e^(iπ) + 1 = 0</span>
        <span className="ambient-mark mark-eight">ζ(s)</span>
        <span className="ambient-mark mark-nine">Δx Δp</span>
        <span className="ambient-mark mark-ten">S¹ ↪ ℝ²</span>
        <span className="ambient-mark mark-eleven">Rμν − ½Rgμν</span>
        <span className="ambient-mark mark-twelve">∫𝒟φ</span>
        <span className="ambient-mark mark-thirteen">χ(M)</span>
        <span className="ambient-mark mark-fourteen">P(A|B)</span>
        <span className="ambient-mark mark-fifteen">c = ℏ = 1</span>
        <span className="ambient-mark mark-sixteen">∮γ</span>
        <span className="ambient-mark mark-seventeen">[x, p] = iℏ</span>
        <span className="ambient-mark mark-eighteen">|ψ|²</span>
        <span className="ambient-mark mark-nineteen">Γ(½) = √π</span>
        <span className="ambient-mark mark-twenty">SO(3)</span>
        <span className="ambient-mark mark-twenty-one">∇²</span>
        <span className="ambient-mark mark-twenty-two">δ(x)</span>
        <span className="ambient-mark mark-twenty-three">⟨x⟩</span>
        <span className="ambient-mark mark-twenty-four">L²(ℝ)</span>
        <span className="ambient-mark mark-twenty-five">ω² = k/m</span>
        <span className="ambient-mark mark-twenty-six">ΔS ≥ 0</span>
        <span className="ambient-mark mark-twenty-seven">∂Σ</span>
        <span className="ambient-mark mark-twenty-eight">rank(A)</span>
        <span className="ambient-mark mark-twenty-nine">|0⟩ + |1⟩</span>
        <span className="ambient-mark mark-thirty">∮ B · dl</span>
        <span className="ambient-mark long-mark mark-thirty-one">
          ∫ₘ R√|g| d⁴x
        </span>
        <span className="ambient-mark long-mark mark-thirty-two">
          iℏ ∂|ψ⟩/∂t = Ĥ|ψ⟩
        </span>
        <span className="ambient-mark long-mark mark-thirty-three">
          ∇×E = −∂B/∂t
        </span>
        <span className="ambient-mark long-mark mark-thirty-four">
          Gμν + Λgμν = 8πGTμν
        </span>
        <span className="ambient-mark long-mark mark-thirty-five">
          ∑ₙ₌₀∞ (−1)ⁿx²ⁿ⁺¹/(2n + 1)!
        </span>
        <span className="ambient-mark long-mark mark-thirty-six">
          ⟨ψ|Â|ψ⟩ / ⟨ψ|ψ⟩
        </span>
        <span className="ambient-mark long-mark mark-thirty-seven">
          d²x/dt² + ω²x = 0
        </span>
        <span className="ambient-mark long-mark mark-thirty-eight">
          limₙ→∞ (1 + 1/n)ⁿ
        </span>
        <span className="ambient-mark long-mark mark-thirty-nine">
          ∮ᶜ F · dr = ∬ₛ (∇×F) · dS
        </span>
        <span className="ambient-mark long-mark mark-forty">
          ∂μTᵘᵛ = 0
        </span>
        <span className="ambient-mark long-mark mark-forty-one">
          π₁(S¹) ≅ ℤ
        </span>
        <span className="ambient-mark long-mark mark-forty-two">
          {"𝓕{∂f/∂x} = iξf̂(ξ)"}
        </span>
      </div>

      <section className="identity" aria-labelledby="site-title">
        <div className="identity-grid">
          <figure className="glyph-figure">
            <QuantumGlyph />
          </figure>

          <div className="identity-copy">
            <p className="eigen-note">
              ∃ caffeine ∈ ℝ⁺: ||Ψ(caffeine) - Ψ*|| &lt; ε
            </p>
            <h1 id="site-title">
              <span className="name-blue">Arnav</span>{" "}
              <span className="name-mauve">Mittal</span>
            </h1>
            <p className="intro">
              hi, i&apos;m arnav, a student interested in{" "}
              <span className="accent-blue">theoretical physics</span>,{" "}
              <span className="accent-mauve">mathematics</span>,{" "}
              <span className="accent-blue">technology</span>, and{" "}
              <span className="accent-mauve">more!</span>
            </p>
          </div>
        </div>

        <aside className="personal-index" aria-label="A few things about Arnav">
          <div className="personal-index-heading">
            <span>a few things about me</span>
          </div>

          <div className="personal-index-grid">
            {fieldNotes.map((note) => (
              <div className="personal-entry" key={note.index}>
                <small>
                  {note.index} / {note.label}
                </small>
                <p>{note.value}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
