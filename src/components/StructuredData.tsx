export function StructuredData() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Guida Tattica Matrimonio Low Cost",
    description:
      "Guida PDF completa per organizzare un matrimonio da €30.000 con soli €8.000. Include template email vendor, checklist costi nascosti, calcolatore budget e timeline 12 mesi.",
    image: "https://matrimoniolowcost.it/og-image.jpg",
    brand: {
      "@type": "Brand",
      name: "Matrimonio Low Cost",
    },
    offers: {
      "@type": "Offer",
      url: "https://matrimoniolowcost.it",
      priceCurrency: "EUR",
      price: "19.00",
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "182",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Matrimonio Low Cost",
    description:
      "Guida tattica per organizzare matrimoni economici in Italia senza compromettere la qualità.",
    url: "https://matrimoniolowcost.it",
    email: "help@matrimoniolowcost.it",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Milano",
      addressRegion: "Lombardia",
      addressCountry: "IT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.4642,
      longitude: 9.19,
    },
    areaServed: {
      "@type": "Country",
      name: "Italia",
    },
    priceRange: "€€",
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Matrimonio Low Cost",
    url: "https://matrimoniolowcost.it",
    founder: {
      "@type": "Person",
      name: "Tommaso Nervegna",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "help@matrimoniolowcost.it",
      contactType: "customer service",
      availableLanguage: "Italian",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: 'Sembra "cheap" agli invitati?',
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Risparmi eliminando markup vendor e costi nascosti, non tagliando qualità visibile. Location agriturismo > villa commerciale. Buffet gourmet > menu servito noioso. Fiori stagionali > rose importate.",
        },
      },
      {
        "@type": "Question",
        name: "Quanto tempo serve per applicare le strategie?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "2-3 ore totali distribuite su 12 mesi. La guida ha template email pre-scritti e checklist temporali. Copi, incolli, negozi.",
        },
      },
      {
        "@type": "Question",
        name: "Funziona anche per matrimoni piccoli (<50 invitati)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sì, anzi meglio. Risparmi percentuali maggiori perché hai più flessibilità. Alcune coppie hanno fatto matrimoni 30 persone sotto €4.000 totali.",
        },
      },
      {
        "@type": "Question",
        name: "È legale negoziare così aggressivamente?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Assolutamente. Non c'è nulla di illegale nel chiedere sconti, unbundling servizi, o portare fornitori esterni. Sono tutte pratiche commerciali standard.",
        },
      },
      {
        "@type": "Question",
        name: "E se non sono soddisfatto?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Offriamo garanzia 30 giorni soddisfatti o rimborsati. Se le strategie non funzionano per te, ti rimborsiamo senza domande.",
        },
      },
      {
        "@type": "Question",
        name: "In che formato ricevo la guida?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "PDF professionale da 60 pagine, scaricabile immediatamente dopo l'acquisto. Include anche template email e checklist pronte all'uso.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
