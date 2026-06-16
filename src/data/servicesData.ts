export interface SubService {
  id: string;
  name: string;
  description: string;
  demoImage: string;
  specs: string[];
}

export interface MainServiceCategory {
  id: string;
  title: string;
  iconName: 'Printer' | 'Layers' | 'Paintbrush' | 'Layout';
  description: string;
  items: SubService[];
}

export const SERVICES_DATA: MainServiceCategory[] = [
  {
    id: "offset",
    title: "Offset Printing",
    iconName: "Printer",
    description: "High-volume traditional lithographic runs with absolute color precision and perfect layering.",
    items: [
      {
        id: "offset-wedding",
        name: "Wedding Card Printing",
        description: "Bespoke high-volume traditional wedding invitations. Stamped with premium metallic foils, screen-aligned floral borders, and printed on heavy textured Indian papers.",
        demoImage: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80",
        specs: ["Paper density: 300 - 450 GSM", "Machine: Heidelberg Speedmaster", "Ink: Traditional oil-based premium series", "Supports: Blind embossing & foil stamping"]
      },
      {
        id: "offset-pamphlet",
        name: "Pamphlet Printing (Single Color)",
        description: "Budget-friendly, ultra-crisp single color flyers for distributions, retail promos, or local community alerts. Excellent sharp typography.",
        demoImage: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80",
        specs: ["Paper density: 70 - 120 GSM Maplitho", "Fast turnarounds for high volumes", "Ink: Intense Carbon Black or Deep Royal Blue", "Perfect for local distributors and wholesale dealers"]
      },
      {
        id: "offset-invite",
        name: "Invitation Card Printing",
        description: "Elegant bespoke invitation sets for golden anniversaries, corporate openings, upscale family events, and royal celebrations.",
        demoImage: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80",
        specs: ["Paper: Metallic/Ivory Imported board", "Coating: Velvet Matte finish overlays", "Accent options: Gilded gold outer edges", "Custom envelopes with secure peel-and-seal"]
      },
      {
        id: "offset-billbook",
        name: "Bill Book Printing",
        description: "Professional multi-duplicate continuous carbonless invoice sheets, order receipts, ledger sheets, and sequential serial numbered bill structures.",
        demoImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
        specs: ["Type: NCR Carbonless (Duplicate / Triplicate)", "Paper colors: White, Pink, Canary Yellow", "Binding: Strong padded head with protective cover", "Included: Perforated tear lines and sequential numbering"]
      },
      {
        id: "offset-register",
        name: "Register Printing",
        description: "Heavy-duty custom register notebooks, company account books, school logs, and attendee registers. Hand-bound with durable hardbound canvas covers.",
        demoImage: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80",
        specs: ["Pages: 100 - 400 ruled sheets", "Paper: High opacity ledger bond sheets", "Binding: Section sewn & cloth-reinforced spine", "Layout: Custom table headers per client grid specifications"]
      }
    ]
  },
  {
    id: "digital",
    title: "Digital Printing (Multicolor)",
    iconName: "Layers",
    description: "Lightning-fast high-fidelity digital prints with unlimited color palettes and custom variable prints.",
    items: [
      {
        id: "digital-visiting",
        name: "Visiting Card Printing",
        description: "First-impression business cards with vibrant, saturated color ranges, perfect alignments, and ultra-sharp professional portraits.",
        demoImage: "https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&w=800&q=80",
        specs: ["Paper options: 350 GSM Art card, Velvet matte, Linen", "Finish: Spot UV, Soft touch lamination, Rounded corners", "Variable data: Integrated personal QR codes on the fly", "Print: Double-sided edge to edge colors"]
      },
      {
        id: "digital-cert",
        name: "Certificate Printing",
        description: "High-grade multicolor certificates for institutes, academies, contests, and appreciation awards. Sharp text and intricate anti-copy border patterns.",
        demoImage: "https://images.unsplash.com/photo-1589330694653-ded6df53f6ee?auto=format&fit=crop&w=800&q=80",
        specs: ["Paper: 280-300 GSM Non-tearable / Parchment / Pearl", "Embellishments: High-raised golden seal foils", "Variable printing: Instant student-wise name & date injection", "Layout: Fine ornamental borders with security backgrounds"]
      },
      {
        id: "digital-invite",
        name: "Invitation Card Printing",
        description: "Dynamic digital invitation cards for instantaneous deliveries. Offers gorgeous floral color rendering and personal names printed directly on each.",
        demoImage: "https://images.unsplash.com/photo-1549417229-aa67d3263c09?auto=format&fit=crop&w=800&q=80",
        specs: ["Sizing: Standard A5 or customized envelope sizes", "Paper: Metallic cream, star-quartz silver, texture matte", "Supports: High precision bleed-edge trim layouts", "Speedy delivery: Instant printing on demand"]
      },
      {
        id: "digital-pamphlet",
        name: "Pamphlet Printing",
        description: "Glossy multicolor promotional flyers and handbills for local retail shops, institutions, boutiques, and active restaurant launches.",
        demoImage: "https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&w=800&q=80",
        specs: ["Paper density: 90 - 130 GSM Glossy/Matte art sheet", "Resolution: Photo-realistic 2400 dpi high-definition", "Volume: Ideal for small to mid-scale marketing campaigns", "Fulfillment: Cut to perfect precise bleed boundaries"]
      },
      {
        id: "digital-wedding",
        name: "Wedding Card Printing",
        description: "Exquisite multi-color personalized wedding cards featuring rich traditional floral designs, vibrant mandalas, and beautiful pre-wedding photoshoot backdrops.",
        demoImage: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80",
        specs: ["Ink: Non-fading UV-stabilized multicolor series", "Paper: Premium imported textured boards", "Personalization: Seat codes and family names printed individually", "Includes custom gold leaf sticker alignments"]
      },
      {
        id: "digital-sticker",
        name: "Sticker Printing",
        description: "Self-adhesive multicoloured vinyl or paper stickers. Perfect for brand labels, food product packaging jars, warning tabs, and customized decals.",
        demoImage: "https://images.unsplash.com/photo-1572375995501-4b0894dbe13b?auto=format&fit=crop&w=800&q=80",
        specs: ["Materials: White Gloss vinyl, transparent PVC, Chrome decal", "Cutting style: Kiss cut, die-cut, standard custom sheets", "Adhesion level: Permanent water-proof acrylic adhesive", "Finish option: High protective glossy lamination coat"]
      },
      {
        id: "digital-menu",
        name: "Menu Card Printing",
        description: "Premium restaurant menu books with crisp food items listings, vivid gastronomy photography, and thick stainsless cover protections.",
        demoImage: "https://images.unsplash.com/photo-1590846083693-f23fdede5a93?auto=format&fit=crop&w=800&q=80",
        specs: ["Binding: Ring bound, fold, or premium hardboard", "Protection: High thick tear-proof lamination (Dust/Oil proof)", "Paper: 350 GSM heavy card sheet core", "Layout: Dynamic visual grids with clean readable typography"]
      }
    ]
  },
  {
    id: "screen",
    title: "Screen Printing",
    iconName: "Paintbrush",
    description: "Classic hand-pulled traditional silkscreen printing with rich raised inks, opaque whites, and high coverage tactile finishes.",
    items: [
      {
        id: "screen-wedding",
        name: "Premium Wedding Card Printing",
        description: "Ultra-luxury traditional wedding invitation cases. Silkscreen processes deposit heavy, thick, tactile golden inks and sparkling metallic powders that raised lithographs cannot replicate.",
        demoImage: "https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?auto=format&fit=crop&w=800&q=80",
        specs: ["Inks: Highly opaque metallic gold, silver, bronze copper", "Paper: Deep dyed hand-pressed textured khadi sheets", "Finish: Raised tactile surface texture you can physically feel", "Layouts: Sacred traditional motifs and intricate lace boundaries"]
      },
      {
        id: "screen-bag",
        name: "Carry Bag / Shopping Bag Printing",
        description: "Custom screen-printed non-woven bags, rigid wedding box bags, boutique paper envelopes, and customized cotton shopping bags for sustainable corporate branding.",
        demoImage: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        specs: ["Materials: Non-woven, thick Kraft paper, organic cotton, canvas", "Ink type: High-pigmented eco flex PVC-free textile inks", "Fadeproof: Fully washable and high abrasion resistant", "Minimum Order: 200 bags with bulk corporate discounts"]
      },
      {
        id: "screen-envelope",
        name: "Envelope Printing",
        description: "Custom premium corporate envelopes, heavy-duty wedding cash gift token sleeves (shagun envelopes), and specialized boutique folders.",
        demoImage: "https://images.unsplash.com/photo-1596622723231-b20320c7346b?auto=format&fit=crop&w=800&q=80",
        specs: ["Paper: Textured 150 - 220 GSM tinted envelopes", "Print style: Single / Double color hand-screen registered", "Accents: Shiny red metallic seal stamp alignments", "Size: Standard DL, Custom cash token fits, or customized A4 folders"]
      },
      {
        id: "screen-plate",
        name: "Number Plate Printing",
        description: "Precision screen-printed reflective metal plates, custom signage boards, and machinery industrial plates with highly weatherproof ink coatings.",
        demoImage: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
        specs: ["Material: Heavy gauge aluminum, acrylic or PVC", "Inks: UV-hardened intense exterior screen inks (Sun proof)", "Reflective: Supports micro-prism reflective foils underlay", "Durable: 5+ years warranty against outdoor yellowing or peeling"]
      }
    ]
  },
  {
    id: "flex",
    title: "Flex Printing",
    iconName: "Layout",
    description: "Jumbo weather-proof large format flex, banners, blockout panels, and glow backlit signs for heavy commercial promotions.",
    items: [
      {
        id: "flex-regular",
        name: "Regular Flex Printing",
        description: "High-visibility, cost-efficient outdoor banners, local political boards, social festive backdrops, and simple roadside promotional hoardings.",
        demoImage: "https://images.unsplash.com/photo-1541535650810-10d26f5c2ab3?auto=format&fit=crop&w=800&q=80",
        specs: ["Material weight: 240 - 340 GSM flex substrate", "Inks: Heavy solvent weather-resistant outdoor ink series", "Sizing: Seamless widths up to 10 feet (infinite joint lengths)", "Friction: High wind resistance with brass eyelets attached"]
      },
      {
        id: "flex-star",
        name: "Star Flex Printing",
        description: "Heavy-duty premium frontlit outdoor flex. Star flex features smoother matte surfaces that fully cancel flash reflections, making it perfect for high-class photo backdrops and elite event stages.",
        demoImage: "https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?auto=format&fit=crop&w=800&q=80",
        specs: ["Material weight: 380 - 440 GSM premium matte star grade", "Ink: High density eco-solvent, vivid deep color contrast", "Reflection: Zero shine, optimum for digital cameras & flashes", "Ideal: Indoor event backdrops, luxury retail shops hoardings"]
      },
      {
        id: "flex-vinyl",
        name: "Vinyl Sticker Printing",
        description: "Weather-proof self-adhesive digital vinyl prints. Tailored for shop front shutters, glass door laminates, vehicle wraps, and dynamic interior wall stickers.",
        demoImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
        specs: ["Material: Pure white adhesive vinyl roll", "Finish: High gloss or soft satin scratchproof lamination", "Application: Perfect dry bubbles-free adhesive backing", "Printer: High resolution Japanese Roland series"]
      },
      {
        id: "flex-vision",
        name: "One Way Vision Printing",
        description: "Micro-perforated see-through window glass decals. Allows clear transparency from inside the boutique while showing high-visibility vibrant branding advertisements to pedestrians outside.",
        demoImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
        specs: ["Material: Perforated black/white adhesive film (50/50 ratio)", "Optimum outdoor visibility for retail salons and clinics", "UV shielded: Retains ink colors under heavy direct sunlight", "No sticky reside upon clean peel-off removal"]
      },
      {
        id: "flex-backlit",
        name: "Backlit Flex Printing",
        description: "High translucency sign-board flex prints that allow crisp, balanced neon light transmission from behind, resulting in outstanding night commercial visibility.",
        demoImage: "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=800&q=80",
        specs: ["Substrate: Special heavy translucent double-struck backlit film", "Sizing: Custom fit for metal light box enclosures", "Prints: High ink saturation to maintain deep colors when lit", "Applications: 24/7 active retail shops, petrol pumps, theaters"]
      },
      {
        id: "flex-digital",
        name: "Digital Flex Printing",
        description: "Elite outdoor jumbo graphics containing photo-grade details. Ideal for highway mega hoardings, luxury real estate site screens, and grand political campaigns.",
        demoImage: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
        specs: ["Resolution: Ultra HD crisp lines definition", "Printers: High-end Seiko / Konica Minolta heavy engines", "Weather resistance: Guaranteed waterproof, stormproof, and sunproof", "Sewing: Heavily reinforced side pockets for rod installations"]
      }
    ]
  }
];
