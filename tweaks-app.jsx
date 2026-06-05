/* global React, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakToggle */
const { useEffect } = React;

const WC_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "headerLogo": "Badge",
  "flowerMotion": true,
  "heroPetals": true
}/*EDITMODE-END*/;

const WC_LOGO_MAP = {
  "Horizontal": { src: "https://cdn.prod.website-files.com/69cc7021372926046a9c4cfb/6a22cdf2569510b6800204e6_logo-horizontal.svg", cls: "" },
  "Badge":      { src: "https://cdn.prod.website-files.com/69cc7021372926046a9c4cfb/6a22cdf21d89d731ced7a554_logo-circular.svg",   cls: "is-badge" },
  "Vertical":   { src: "https://cdn.prod.website-files.com/69cc7021372926046a9c4cfb/6a22cdf2b368ee37239ae6b2_logo-vertical.svg",   cls: "is-vertical" }
};

function WildChildTweaks() {
  const [t, setTweak] = useTweaks(WC_TWEAK_DEFAULTS);

  /* header logo variant */
  useEffect(() => {
    const img = document.querySelector(".nav-logo");
    if (!img) return;
    const m = WC_LOGO_MAP[t.headerLogo] || WC_LOGO_MAP.Horizontal;
    img.setAttribute("src", m.src);
    img.classList.remove("is-badge", "is-vertical");
    if (m.cls) img.classList.add(m.cls);
  }, [t.headerLogo]);

  /* flower spin motion */
  useEffect(() => {
    document.body.classList.toggle("no-motion", !t.flowerMotion);
  }, [t.flowerMotion]);

  /* decorative hero petals */
  useEffect(() => {
    document.querySelectorAll(".hero-petal").forEach((el) => {
      el.style.display = t.heroPetals ? "" : "none";
    });
  }, [t.heroPetals]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Header" />
      <TweakRadio
        label="Logo lockup"
        value={t.headerLogo}
        options={["Horizontal", "Badge", "Vertical"]}
        onChange={(v) => setTweak("headerLogo", v)}
      />
      <TweakSection label="Motion" />
      <TweakToggle
        label="Flower spin"
        value={t.flowerMotion}
        onChange={(v) => setTweak("flowerMotion", v)}
      />
      <TweakToggle
        label="Hero petals"
        value={t.heroPetals}
        onChange={(v) => setTweak("heroPetals", v)}
      />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("wc-tweaks-root")).render(<WildChildTweaks />);
