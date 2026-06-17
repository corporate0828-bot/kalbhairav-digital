import { GalleryItem } from '../types';

// Unsplash high-quality image IDs mapped to specific sub-categories for realistic visualization
const UNSPLASH_IMAGES_BY_SUB_CATEGORY: Record<string, string[]> = {
  "offset-wedding": [
    "photo-1607344645866-009c320c5ab8", // burgundy gold card
    "photo-1515934751635-c81c6bc9a2d8", // floral wedding
    "photo-1532712938310-34cb3982ef74", // invitation card hands
    "photo-1522673607200-164d1b6ce486", // table wedding setting
    "photo-1510074377623-8cf13fb86c08"  // premium invite flatlay
  ],
  "offset-pamphlet": [
    "photo-1586075010923-2dd4570fb338", // paper prints
    "photo-1589330694653-ded6df53f6ee", // certificate style flyers
    "photo-1550684848-fac1c5b4e853", // paper flyers stack
    "photo-1512909006721-3d6018887383", // flyer stacks
    "photo-1561070791-26c113006238"  // printed leaflets
  ],
  "offset-invite": [
    "photo-1515934751635-c81c6bc9a2d8", // elegant invite
    "photo-1549417229-aa67d3263c09", // envelope flatlay
    "photo-1607344645866-009c320c5ab8", // golden scroll box
    "photo-1510074377623-8cf13fb86c08", // invitation ribbon
    "photo-1522673607200-164d1b6ce486"  // party card setup
  ],
  "offset-billbook": [
    "photo-1454165804606-c3d57bc86b40", // corporate accounting sheets
    "photo-1550684848-fac1c5b4e853", // duplicate notebook sheets
    "photo-1554224155-8d04cb21cd6c", // accounting binder pages
    "photo-1586075010923-2dd4570fb338", // ledger continuous lines
    "photo-1450133064473-71024230f91b"  // tables on clipboards
  ],
  "offset-register": [
    "photo-1517842645767-c639042777db", // diary register notebook
    "photo-1544947950-fa07a98d237f", // thick bound ledger
    "photo-1531346878377-a5be20888e57", // binder on wood table
    "photo-1471107340919-a87c025ab575", // luxury pen on journal book
    "photo-1516962215378-7fa2e137ae93"  // hardbound vintage notebook
  ],
  "digital-visiting": [
    "photo-1547826039-bfc35e0f1ea8", // black spot uv card
    "photo-1598257006458-087169a1f08d", // card stacks on desk
    "photo-1616469829581-73993eb86b02", // executive branding slate
    "photo-1512909006721-3d6018887383", // minimal visiting layout
    "photo-1550684848-fac1c5b4e853"  // holographic paper edge
  ],
  "digital-cert": [
    "photo-1589330694653-ded6df53f6ee", // dynamic diploma certificate
    "photo-1513694203232-719a280e022f", // framed prints
    "photo-1544947950-fa07a98d237f", // premium heavy sheet
    "photo-1616469829581-73993eb86b02", // appreciation degree layouts
    "photo-1531346878377-a5be20888e57"  // folder certificate cover
  ],
  "digital-invite": [
    "photo-1549417229-aa67d3263c09", // elegant birthday suite
    "photo-1515934751635-c81c6bc9a2d8", // digital invite watercolor
    "photo-1607344645866-009c320c5ab8", // invitation board digital
    "photo-1510074377623-8cf13fb86c08", // celebration announcement card
    "photo-1522673607200-164d1b6ce486"  // baby shower invite design
  ],
  "digital-pamphlet": [
    "photo-1561070791-26c113006238", // colorful posters
    "photo-1586075010923-2dd4570fb338", // pamphlets bundles
    "photo-1550684848-fac1c5b4e853", // saturated booklets
    "photo-1589330694653-ded6df53f6ee", // direct distribution leaflet
    "photo-1618005182384-a83a8bd57fbe"  // graphics design flyer
  ],
  "digital-wedding": [
    "photo-1532712938310-34cb3982ef74", // floral multicolor invitation
    "photo-1607344645866-009c320c5ab8", // deep red mandap invite
    "photo-1515934751635-c81c6bc9a2d8", // magenta velvet wedding layout
    "photo-1510074377623-8cf13fb86c08", // shiny gold thread card
    "photo-1522673607200-164d1b6ce486"  // vibrant wedding leaflet
  ],
  "digital-sticker": [
    "photo-1572375995501-4b0894dbe13b", // sticky dynamic label
    "photo-1512909006721-3d6018887383", // luxury product adhesive tag
    "photo-1616469829581-73993eb86b02", // round shape branded sticker
    "photo-1598257006458-087169a1f08d", // glass print labels
    "photo-1550684848-fac1c5b4e853"  // vinyl sticker cutout
  ],
  "digital-menu": [
    "photo-1590846083693-f23fdede5a93", // coffee bar menu board
    "photo-1561070791-26c113006238", // restaurant menu booklet
    "photo-1550684848-fac1c5b4e853", // laminated dining list
    "photo-1586075010923-2dd4570fb338", // vintage leather menu book
    "photo-1471107340919-a87c025ab575"  // hand held drink card
  ],
  "screen-wedding": [
    "photo-1510074377623-8cf13fb86c08", // hand silk screened gold card
    "photo-1515934751635-c81c6bc9a2d8", // deep purple tactile print
    "photo-1607344645866-009c320c5ab8", // crimson board gold print
    "photo-1532712938310-34cb3982ef74", // elegant traditional scroll
    "photo-1522673607200-164d1b6ce486"  // textured envelope shagun
  ],
  "screen-bag": [
    "photo-1544816155-12df9643f363", // paper bags carrying branding
    "photo-1512909006721-3d6018887383", // luxury box bag setup
    "photo-1616469829581-73993eb86b02", // corporate box carry cases
    "photo-1550684848-fac1c5b4e853", // craft paper handle bag
    "photo-1598257006458-087169a1f08d"  // non woven screen print bag
  ],
  "screen-envelope": [
    "photo-1596622723231-b20320c7346b", // luxurious paper envelopes
    "photo-1549417229-aa67d3263c09", // custom card sleeves envelopes
    "photo-1517842645767-c639042777db", // high textured red pocket
    "photo-1471107340919-a87c025ab575", // gift cover screen ink
    "photo-1516962215378-7fa2e137ae93"  // wax seal envelope print
  ],
  "screen-plate": [
    "photo-1552519507-da3b142c6e3d", // reflective auto plates
    "photo-1616469829581-73993eb86b02", // metal brass branding plates
    "photo-1513694203232-719a280e022f", // thick acrylic signs boards
    "photo-1561070791-2526d30994b5", // neon industrial signage panels
    "photo-1598257006458-087169a1f08d"  // heavy plate prints screen
  ],
  "flex-regular": [
    "photo-1541535650810-10d26f5c2ab3", // political roadside banner
    "photo-1509343256512-d77a5cb3791b", // commercial advertising flex
    "photo-1618005182384-a83a8bd57fbe", // storefront jumbo poster banner
    "photo-1513694203232-719a280e022f", // outdoor frame banner billboard
    "photo-1496442226666-8d4d0e62e6e9"  // big street publicity promotion
  ],
  "flex-star": [
    "photo-1509343256512-d77a5cb3791b", // premium corporate award backdrop
    "photo-1541535650810-10d26f5c2ab3", // non reflective event backing
    "photo-1618005182384-a83a8bd57fbe", // matte red carpet stage flex
    "photo-1513694203232-719a280e022f", // political main vip stage backdrop
    "photo-1496442226666-8d4d0e62e6e9"  // large banner clean backdrop
  ],
  "flex-vinyl": [
    "photo-1618005182384-a83a8bd57fbe", // shopfront shutter vinyl wrap
    "photo-1513694203232-719a280e022f", // glass door sticker branding
    "photo-1572375995501-4b0894dbe13b", // adhesive vehicle wraps designs
    "photo-1598257006458-087169a1f08d", // heavy vinyl wrap displays
    "photo-1512909006721-3d6018887383"  // interior wall decals graphics
  ],
  "flex-vision": [
    "photo-1513694203232-719a280e022f", // Salon one way glass decal window
    "photo-1618005182384-a83a8bd57fbe", // Clinic translucent branding microperforated
    "photo-1508962914676-134849a727f0", // One way vision showroom doors stickers
    "photo-1541535650810-10d26f5c2ab3", // Office cabin glass decal layout
    "photo-1496442226666-8d4d0e62e6e9"  // Translucent window micro holes flex
  ],
  "flex-backlit": [
    "photo-1508962914676-134849a727f0", // Glowing backlit store billboard
    "photo-1513694203232-719a280e022f", // Lightbox neon signage flex print
    "photo-1561070791-2526d30994b5", // Night lighted petrol pump board
    "photo-1618005182384-a83a8bd57fbe", // Retail showroom glows backlit panels
    "photo-1541535650810-10d26f5c2ab3"  // Fastfood takeaway lightbox graphic flex
  ],
  "flex-digital": [
    "photo-1496442226666-8d4d0e62e6e9", // Highway mega hoarding billboard
    "photo-1541535650810-10d26f5c2ab3", // Giant real estate construction site flex
    "photo-1509343256512-d77a5cb3791b", // Corporate skyscraper wrap graphic
    "photo-1513694203232-719a280e022f", // Mega outdoor promotional campaign hoarding
    "photo-1618005182384-a83a8bd57fbe"  // Giant multi-city rally campaign flex billboard
  ]
};

// Realistic Local Indian Names & Business Identifiers for stunning fidelity
const INDIAN_BRANDS = [
  "Pisal Brothers", "Deshmukh & Sons", "Saraswati Textiles", "Kalyani Jewellers", 
  "Royal Mandap & Events", "Sai Sharan Developers", "Deshpande Parivaar", 
  "Jai Ganesh Cooperative Bank", "Lokmat Media Group", "Wai Heritage Estates", 
  "Morya Food Products", "Pragati Coaching Classes", "Balaji Textiles Wai", 
  "Dharmanandan Silk Mills", "Bhavani Steels Satara", "Panchgani Agro-Foods", 
  "Pratapgad Residency", "Krishnakunj Developers", "Raje Heritage Lodge", 
  "Bhairavnath Sugar Mills"
];

const ITEM_ADJECTIVES = [
  "Premium Velvet-Touch", "Regal Hand-Crafted", "Sleek Carbon Series", "Classic Shimmering", 
  "Imperial Embossed", "Bespoke Royal", "Futuristic Double-Struck", "Ultra-Crisp Matte", 
  "Hand-Pulled Opaque", "Waterproof Non-Tearable", "Reflective Micro-Prism", "Continuous Carbonless"
];

const FINISHING_HOVER_TERMS = [
  "imprinted with heavy raised metallic gold inks and micro-lace ornaments",
  "finished in soft matte velvet laminate with precision gloss spot UV outline",
  "stamped with 24k gold leaf foil impression over luxury textured board",
  "utilizing non-fading solvent inks for high contrast sunlight resistance",
  "assembled using reinforced sewn bindings and cloth canvas spine",
  "designed with bubble-free adhesive backing and dual-coating glossy laminates",
  "featuring extreme night-glow backlight transparency for luminous finish",
  "precision slit with Japanese Roland optical eye drag cutters in custom profiles",
  "manufactured on imported 450 GSM pure pulp textured Ivory raw stocks"
];

export function generateGallerySeed(): GalleryItem[] {
  const finalSeed: GalleryItem[] = [];

  // Sub-services specifications
  const SUB_SERVICES = [
    // Offset (5 subservices)
    { id: "offset-wedding", name: "Wedding Card Printing", main: "offset", cat: "Wedding Cards" },
    { id: "offset-pamphlet", name: "Pamphlet Printing (Single Color)", main: "offset", cat: "Pamphlets" },
    { id: "offset-invite", name: "Invitation Card Printing", main: "offset", cat: "Invitation Cards" },
    { id: "offset-billbook", name: "Bill Book Printing", main: "offset", cat: "Bill Books" },
    { id: "offset-register", name: "Register Printing", main: "offset", cat: "Registers" },

    // Digital (7 subservices)
    { id: "digital-visiting", name: "Visiting Card Printing", main: "digital", cat: "Business Cards" },
    { id: "digital-cert", name: "Certificate Printing", main: "digital", cat: "Certificates" },
    { id: "digital-invite", name: "Invitation Card Printing", main: "digital", cat: "Invitation Cards" },
    { id: "digital-pamphlet", name: "Pamphlet Printing", main: "digital", cat: "Pamphlets" },
    { id: "digital-wedding", name: "Wedding Card Printing", main: "digital", cat: "Wedding Cards" },
    { id: "digital-sticker", name: "Sticker Printing", main: "digital", cat: "Stickers" },
    { id: "digital-menu", name: "Menu Card Printing", main: "digital", cat: "Menu Cards" },

    // Screen (4 subservices)
    { id: "screen-wedding", name: "Premium Wedding Card Printing", main: "screen", cat: "Wedding Cards" },
    { id: "screen-bag", name: "Carry Bag / Shopping Bag Printing", main: "screen", cat: "Carry Bags & Boxes" },
    { id: "screen-envelope", name: "Envelope Printing", main: "screen", cat: "Envelopes" },
    { id: "screen-plate", name: "Number Plate Printing", main: "screen", cat: "Reflective Signs" },

    // Flex (6 subservices)
    { id: "flex-regular", name: "Regular Flex Printing", main: "flex", cat: "Flex Banners" },
    { id: "flex-star", name: "Star Flex Printing", main: "flex", cat: "Premium Backdrops" },
    { id: "flex-vinyl", name: "Vinyl Sticker Printing", main: "flex", cat: "Vinyl Wraps" },
    { id: "flex-vision", name: "One Way Vision Printing", main: "flex", cat: "One Way Vision" },
    { id: "flex-backlit", name: "Backlit Flex Printing", main: "flex", cat: "Backlit Boards" },
    { id: "flex-digital", name: "Digital Flex Printing", main: "flex", cat: "Mega Hoardings" }
  ];

  let counter = 1;

  // Let's loop through all subservices and generate precisely 20 beautiful photo samples for each!
  for (const sub of SUB_SERVICES) {
    const unsplashPics = UNSPLASH_IMAGES_BY_SUB_CATEGORY[sub.id] || [];
    
    for (let i = 1; i <= 20; i++) {
      const brand = INDIAN_BRANDS[(i * 3 + counter * 7) % INDIAN_BRANDS.length];
      const adj = ITEM_ADJECTIVES[(i * 4 + counter * 5) % ITEM_ADJECTIVES.length];
      const finisher = FINISHING_HOVER_TERMS[(i * 2 + counter * 9) % FINISHING_HOVER_TERMS.length];
      
      const unsplashImgId = unsplashPics[(i - 1) % unsplashPics.length];
      
      // Create interesting, highly distinct, professional titles
      let title = "";
      if (i === 1) {
        title = `${brand} Royal Velvet Edition`;
      } else if (i === 2) {
        title = `Elite ${adj} Project Box`;
      } else {
        const titleVariants = [
          `${brand} Custom ${sub.name.replace(" Printing", "")}`,
          `Bespoke ${adj} ${sub.name.replace(" Printing", "")}`,
          `Premium ${brand} Edition (${i})`,
          `Corporate Special: ${brand}`,
          `High-Definition ${adj} Board`
        ];
        title = titleVariants[(i + counter) % titleVariants.length];
      }

      // Safe length control for title
      if (title.length > 55) {
        title = title.substring(0, 52) + "...";
      }

      // Beautiful custom description
      const desc = `Designed for client "${brand}" in Bavdhan district, this fine ${sub.name.toLowerCase()} design is ${finisher}. Absolutely stunning visual aesthetics.`;

      // Construct unique Unsplash image URL with crop signatures to look distinct physically
      const cropSigs = [
        "entropy", "faces", "center", "focalpoint", "smart"
      ];
      const cropMethod = cropSigs[i % cropSigs.length];
      const randomLikes = Math.floor(50 + (i * 12 + counter * 4) % 190);
      
      const imageUrl = `https://images.unsplash.com/${unsplashImgId}?auto=format&fit=crop&crop=${cropMethod}&w=800&q=80&sig=${counter}_${i}`;

      finalSeed.push({
        id: `g_${sub.id}_${i}`,
        title: title,
        category: sub.cat,
        imageUrl: imageUrl,
        description: desc,
        likes: randomLikes,
        subServiceId: sub.id,
        mainCategoryId: sub.main
      });

      counter++;
    }
  }

  return finalSeed;
}
