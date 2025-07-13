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
      <meta property="og:url" content="https://yourwebsite.com" />
      <meta property="og:image" content="https://yourwebsite.com/og-image.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
      {/* ✅ Add this canonical tag */}
      <link rel="canonical" href="https://yesno-wheel.com/" />
      {/* Other meta tags */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Yes or No Wheel",
            description: "A free online tool that helps you make yes or no decisions randomly.",
            url: "https://yourwebsite.com",
            applicationCategory: "UtilityApplication",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            operatingSystem: "All",
          }),
        }}
      />
    </>
  )
}
