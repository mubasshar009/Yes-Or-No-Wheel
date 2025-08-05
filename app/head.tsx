export default function Head() {
  return (
    <>
      <title>Yes or No Wheel - Make Quick Decisions | Free Online Decision Tool</title>
      <meta
        name="description"
        content="Use our free Yes or No Wheel to make quick decisions. A random wheel spinner that gives you a 50/50 chance of Yes or No. Perfect for indecisive moments!"
      />
      <meta
        name="keywords"
        content="yes or no wheel, spin the wheel yes or no, yes or no wheel decide, yes or no, yes and no wheel"
      />
      <meta property="og:title" content="Yes or No Wheel - Make Quick Decisions | Free Online Decision Tool" />
      <meta
        property="og:description"
        content="Stuck on a decision? Let our random Yes or No Wheel decide for you. Simple, fast, and completely random."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://yesno-wheel.com" />
      <meta property="og:image" content="https://yesno-wheel.com/favicon.png" />
      <meta name="twitter:card" content="summary_large_image" />
      
      {/* Strong canonical signals */}
      <link rel="canonical" href="https://yesno-wheel.com/" />
      <link rel="alternate" href="https://yesno-wheel.com/" hrefLang="en" />
      <link rel="alternate" href="https://yesno-wheel.com/" hrefLang="x-default" />
      
      {/* Prevent indexing of old domain */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Additional SEO signals */}
      <meta name="author" content="Yes or No Wheel" />
      <meta name="publisher" content="Yes or No Wheel" />
      <meta name="copyright" content="Yes or No Wheel" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Yes or No Wheel",
            description: "A free online tool that helps you make yes or no decisions randomly.",
            url: "https://yesno-wheel.com",
            applicationCategory: "UtilityApplication",
            operatingSystem: "All",
            browserRequirements: "Requires JavaScript. Requires HTML5.",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            creator: {
              "@type": "Organization",
              name: "Yes or No Wheel",
              url: "https://yesno-wheel.com"
            },
            publisher: {
              "@type": "Organization",
              name: "Yes or No Wheel",
              url: "https://yesno-wheel.com"
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://yesno-wheel.com"
            },
            sameAs: [
              "https://yesno-wheel.com"
            ]
          }),
        }}
      />
    </>
  )
}