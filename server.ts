import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import { ServerData, CustomRequest, Product, GalleryItem } from './src/types';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '50mb' }));

// Initial database seed
const DB_PATH = path.join(process.cwd(), 'db.json');

const INITIAL_DATA: ServerData = {
  products: [
    {
      id: "p1",
      name: "Dharmanandan Royal Wedding Box",
      category: "Wedding Cards",
      description: "Premium velvet-coated heavy board wedding invite box with gold-embossed deity insignia, pull-out card drawers tray, and gold foil accents. Perfect for high-status weddings.",
      priceRange: "₹250 - ₹1,200 per piece",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80",
      features: ["3.5mm Heavy Rigid Board", "Gold Hot-Foil Stamping", "Velvet & Suede Coating", "Detachable Sweet Drawer"],
      paperType: "350 GSM Textured Art Card + Rigid Box Board",
      minOrder: 100
    },
    {
      id: "p2",
      name: "Vakratunda Golden Foil Invitation",
      category: "Wedding Cards",
      description: "Elegant slide-in wedding folder with laser-cut Ganesha detail and rich purple laser-ink print on premium heavy imported scroll paper.",
      priceRange: "₹80 - ₹250 per piece",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80",
      features: ["Intricate Laser Cutting", "Gold Laser Foil Ink", "Scented Cardboard Sheet", "Custom Font Calligraphy"],
      paperType: "300 GSM Scented Metallic Sheet",
      minOrder: 150
    },
    {
      id: "p3",
      name: "Imperial Charcoal Spot-UV Business Cards",
      category: "Business Cards",
      description: "Sleek, futuristic double-sided carbon cards with premium soft-touch matte finish and raised glossy spot UV lacquer over key elements.",
      priceRange: "₹3 - ₹12 per piece",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&w=800&q=80",
      features: ["Matte Soft-Touch Velvet Feel", "Raised Gloss Spot UV", "Seamless 3D Corner Curving", "Dual Side Offset Color Sync"],
      paperType: "450 GSM Luxurious Soft-Touch Art Paper",
      minOrder: 200
    },
    {
      id: "p4",
      name: "Futuristic Holographic Poster Press",
      category: "Posters",
      description: "Extravagant high-definition promotional posters with customized shifting holographic color film. Ideal for concerts, festivals, or product launches.",
      priceRange: "₹40 - ₹150 per poster",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
      features: ["Full Rainbow Holographic Film Overlay", "Waterproof UV Shield Coating", "Stunning Ultra HD Sharpness", "Teasel Resistant Framing"],
      paperType: "280 GSM Glossy Photo Laminated Sheets",
      minOrder: 50
    },
    {
      id: "p5",
      name: "Royal Matte-Finish Gift Boxes & Packaging",
      category: "Packaging",
      description: "Handcrafted rigid cardboard packaging boxes with custom shape-retention foam or velvet linings. Made fit for boutique brands and sweet presentations.",
      priceRange: "₹120 - ₹600 per box",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=800&q=80",
      features: ["Magnetic Lid Closure", "Recyclable eco-board Core", "Tailor-made Partition Grid", "High Dynamic Weight Load"],
      paperType: "1200 GSM Heavy Duty Rigid Kraft Board",
      minOrder: 100
    },
    {
      id: "p6",
      name: "Carbonless Triplicate Invoice & Bill Books",
      category: "Bill Books",
      description: "Flawless triplicate carbonless invoice sheets, numbered sequentially with strong reinforced binding strip and convenient card dividers.",
      priceRange: "₹90 - ₹180 per book",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80",
      features: ["Duplicate/Triplicate Color Coding", "Precise Perforated Border", "Sequenced Red Ink Numbering", "Anti-Ink Smudge Formulation"],
      paperType: "80 GSM Carbonless Transfer Stock",
      minOrder: 10
    }
  ],
  gallery: [
    {
      id: "g1",
      title: "Gold Foil Royal Mandap Invitation",
      category: "Wedding Cards",
      imageUrl: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80",
      description: "Premium wedding set customized with deep burgundy dye and sparkling 24k gold leaf letterpress embossing.",
      likes: 142
    },
    {
      id: "g2",
      title: "Luxury Sweet & Dry Fruit Hamper Boxes",
      category: "Packaging",
      imageUrl: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=800&q=80",
      description: "Sturdy geometric packaging featuring dynamic purple foil patterns created for an premium Diwali corporate gift.",
      likes: 98
    },
    {
      id: "g3",
      title: "Tactile Cotton Letterpress Wedding Card",
      category: "Wedding Cards",
      imageUrl: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80",
      description: "Eco-friendly, highly textured 600 GSM double-thick cotton wedding set. Imprinted with traditional marigold yellow ink.",
      likes: 215
    },
    {
      id: "g4",
      title: "Gold-Leaf Embossed Boutique Business Card",
      category: "Business Cards",
      imageUrl: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&w=800&q=80",
      description: "Luxury matte black 450 GSM cards printed with gold-powder heat-stamped typography for a high-end salon.",
      likes: 187
    },
    {
      id: "g5",
      title: "Retro Abstract Gig Poster Print",
      category: "Posters",
      imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
      description: "Limited edition screen printed event graphic on unbleached heavy kraft substrate with bright neon pigments.",
      likes: 76
    },
    {
      id: "g6",
      title: "Sleek Corporate Branding Package",
      category: "Packaging",
      imageUrl: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&w=800&q=80",
      description: "Complete elite identity setup: heavy letterheads, die-cut custom stationery folders, and premium metallic pens.",
      likes: 139
    }
  ],
  customRequests: [
    {
      id: "r1",
      name: "Ramesh Sharma",
      phone: "+91 70281 11712",
      email: "ramesh@gmail.com",
      describeDesign: "Require 300 luxury velvet sweet boxes for an elite wedding. Shimmering purple box color with silver lining. Needs to look extremely rich.",
      quantity: 300,
      budget: "₹250 - ₹500 per piece",
      status: 'Pending',
      date: "2026-06-15"
    }
  ],
  faqs: [
    {
      id: "fa1",
      question: "What is your typical turnaround time for wedding cards?",
      answer: "For standard cards, it takes 3 to 5 business days. For customized luxury boxes with manual rigid structures and velvet/embossing finishes, the design approval and hand-crafting process takes about 7 to 12 working days from draft sign-off.",
      category: "Services"
    },
    {
      id: "fa2",
      question: "Can I provide my own design or template?",
      answer: "Absolutely! You can upload reference images, PDFs, CoralDRAW (.CDR) or Illustrator (.AI) vector files. Our pre-press graphics team will analyze your artwork, do necessary color corrections, and adapt them safely to print layouts.",
      category: "Custom Design"
    },
    {
      id: "fa3",
      question: "Do you have a minimum order quantity (MOQ)?",
      answer: "Yes, MOQs vary by product. For business cards, the MOQ is 200 cards. For wedding invites, it's 100 sets. For custom rigid packaging boxes, the MOQ is 100 units. For billing books, we can print as low as 10 registers.",
      category: "Pricing"
    },
    {
      id: "fa4",
      question: "Do you support shipping all over India?",
      answer: "Yes! We partner with leading express cargo providers to securely deliver critical wedding cards and commercial printing products all over India, including Mumbai, Delhi, Pune, Bangalore, Kolkata, and Hyderabad. Tracking details are shared instantly upon dispatch.",
      category: "Delivery"
    }
  ],
  machines: [
    {
      id: "m1",
      name: "Heidelberg Speedmaster XL 106",
      type: "4-Color Offset Press with UV In-Line Coater",
      speed: "18,000 sheets / hour",
      description: "The crown jewel of traditional lithographic printing. Delivering immaculate registration, color fidelity, and dynamic satin UV coatings at unbelievable speeds.",
      image: "/src/assets/images/heidelberg_speedmaster_1781641181399.jpg"
    },
    {
      id: "m2",
      name: "Konica Minolta AccurioPress C14000",
      type: "High-Speed Digital Laser Production Engine",
      speed: "140 ppm (A4)",
      description: "State-of-the-art digital printing with automatic color correction and heavy-paper registration controllers. Perfect for high-speed small-run flyers, certificates, and brochures on up to 450 GSM media.",
      image: "/src/assets/images/konica_accuriopress_1781641304017.jpg"
    }
  ],
  team: [
    {
      id: "t1",
      name: "Nikhil Pisal",
      role: "Founder & Managing Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "t2",
      name: "Nishant Pisal",
      role: "Head of Creative Pre-Press & Operations",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80"
    }
  ],
  testimonials: [
    {
      id: "tst1",
      name: "Ananya Deshpande",
      company: "Event Horizons Wedding Planners",
      rating: 5,
      comment: "Bhairavnath Digital delivered 500 gold-embossed velvet invitation boxes within just 8 days! The quality of the paper and gold foil alignment was absolutely premier. Their work made our client's event exceptionally memorable.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "tst2",
      name: "Vikram R. Joshi",
      company: "Pragati Food Products",
      rating: 5,
      comment: "We migrated our complete packaging box printing to Bhairavnath Digital last year. Their Heidelberg line has given us flawless color consistency across thousands of product boxes. Highly professional and cost-effective.",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80"
    }
  ],
  analytics: {
    pageViews: 12540,
    totalRequests: 420,
    completedRequests: 395
  }
};

// Database utility functions
function getDB(): ServerData {
  try {
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify(INITIAL_DATA, null, 2), 'utf-8');
      return INITIAL_DATA;
    }
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error("Read DB Error, falling back to initial data:", err);
    return INITIAL_DATA;
  }
}

function saveDB(data: ServerData) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error("Save DB Error:", err);
  }
}

// Ensure database seeded
getDB();

// API ROUTES
app.get('/api/data', (req, res) => {
  const db = getDB();
  db.analytics.pageViews += 1;
  saveDB(db);
  res.json(db);
});

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'bhairavnath2026') {
    res.json({ success: true, token: "bhairavnath-super-secure-token-2026-premium" });
  } else {
    res.status(401).json({ success: false, error: "Invalid business username or private password." });
  }
});

// Submit a Custom Quote Request
app.post('/api/requests', (req, res) => {
  const { name, phone, email, describeDesign, quantity, budget, referenceImage } = req.body;
  
  if (!name || !phone || !describeDesign) {
    return res.status(400).json({ error: "Name, Phone of customer, and Design description are required." });
  }

  const db = getDB();
  const newRequest: CustomRequest = {
    id: "req_" + Date.now(),
    name,
    phone,
    email,
    describeDesign,
    quantity: Number(quantity) || 100,
    budget: budget || "Not Specified",
    referenceImage, // In real life Cloudinary, here can be Base64 which works identically for local persist!
    status: 'Pending',
    date: new Date().toISOString().split('T')[0]
  };

  db.customRequests.unshift(newRequest);
  db.analytics.totalRequests += 1;
  saveDB(db);

  res.json({ success: true, request: newRequest });
});

// Update Request Status
app.post('/api/admin/requests/status', (req, res) => {
  const { id, status } = req.body;
  const db = getDB();
  const index = db.customRequests.findIndex(r => r.id === id);
  if (index !== -1) {
    db.customRequests[index].status = status;
    if (status === 'Completed') {
      db.analytics.completedRequests += 1;
    }
    saveDB(db);
    res.json({ success: true, request: db.customRequests[index] });
  } else {
    res.status(404).json({ error: "Quote request not found." });
  }
});

// Delete Quote Request
app.delete('/api/admin/requests/:id', (req, res) => {
  const id = req.params.id;
  const db = getDB();
  const originalLength = db.customRequests.length;
  db.customRequests = db.customRequests.filter(r => r.id !== id);
  if (db.customRequests.length < originalLength) {
    saveDB(db);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: "Quote request not found." });
  }
});

// Add Product - Admin Panel
app.post('/api/admin/products', (req, res) => {
  const product: Product = req.body;
  if (!product.name || !product.category || !product.priceRange) {
    return res.status(400).json({ error: "Product name, category and price range are required." });
  }
  const db = getDB();
  product.id = "p_" + Date.now();
  db.products.push(product);
  saveDB(db);
  res.json({ success: true, product });
});

// Delete Product
app.delete('/api/admin/products/:id', (req, res) => {
  const id = req.params.id;
  const db = getDB();
  db.products = db.products.filter(p => p.id !== id);
  saveDB(db);
  res.json({ success: true });
});

// Add Gallery Image - Admin Panel
app.post('/api/admin/gallery', (req, res) => {
  const item: GalleryItem = req.body;
  if (!item.title || !item.imageUrl || !item.category) {
    return res.status(400).json({ error: "Title, Category and Image URL are required." });
  }
  const db = getDB();
  item.id = "g_" + Date.now();
  item.likes = 0;
  db.gallery.push(item);
  saveDB(db);
  res.json({ success: true, item });
});

// Like Gallery item
app.post('/api/gallery/like', (req, res) => {
  const { id } = req.body;
  const db = getDB();
  const index = db.gallery.findIndex(g => g.id === id);
  if (index !== -1) {
    db.gallery[index].likes += 1;
    saveDB(db);
    res.json({ success: true, likes: db.gallery[index].likes });
  } else {
    res.status(404).json({ error: "Image not found." });
  }
});

// Express Server Gemini AI Integration
// Initialize Google Gen AI client lazy/safely
let geminiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI | null {
  if (!geminiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY" && key.trim() !== "") {
      geminiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
  }
  return geminiClient;
}

// AI Card Recommendation Engine
app.post('/api/ai/recommend', async (req, res) => {
  const { occasion, colorTheme, papersDescription, budgetRange } = req.body;
  
  if (!occasion) {
    return res.status(400).json({ error: "Occasion or celebration purpose is required." });
  }

  const ai = getGemini();

  if (ai) {
    try {
      const prompt = `You are the lead luxury design consultant at 'Bhairavnath Digital', an ultra-premium physical printing press based in India.
User is asking for an AI recommendation for their printing material.
Details:
- Occasion/Event: ${occasion}
- Preferred Color Theme: ${colorTheme || 'Any luxury theme'}
- Paper or Finish Preferences: ${papersDescription || 'Any premium Indian paper/finish'}
- Budget Bracket: ${budgetRange || 'Premium but reasonable'}

Provide a professional, extremely detailed design and material recommendation back in clean JSON format.
In your response, include:
1. "aestheticConcept": A luxurious editorial title for the design theme (e.g. "Royal Crimson & Gold Leaf")
2. "paperType": Specific physical paper suggestion (e.g. "350 GSM Textured Ivory Board with Scented Finish")
3. "printFinishes": List of recommended premium finishes (e.g. ["24K Gold Hot-Foil Stamp", "Custom Blind Debossing", "Velvet Coating"])
4. "expertRationale": 2-3 sentences explaining why this combination is perfect, speaking in an extremely exclusive Swiss/Indian design authority tone.
5. "estimatedCost": Relative cost assessment (e.g., "₹180 - ₹350 per invite")
6. "productionTurnaround": Specific time to craft and print (e.g., "7 to 10 Days")
7. "complementaryPieces": List of matching accessories suggested to buy (e.g., ["Embossed Envelope with Gold Monogram Liner", "Thank You Note Cards", "Welcome Signage Board"])

Always return strictly valid JSON corresponding precisely to these properties. Do not wrap in markdown codeblocks like \`\`\`json. Return the direct JSON string only.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              aestheticConcept: { type: Type.STRING },
              paperType: { type: Type.STRING },
              printFinishes: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              expertRationale: { type: Type.STRING },
              estimatedCost: { type: Type.STRING },
              productionTurnaround: { type: Type.STRING },
              complementaryPieces: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["aestheticConcept", "paperType", "printFinishes", "expertRationale", "estimatedCost", "productionTurnaround", "complementaryPieces"]
          }
        }
      });

      if (response && response.text) {
        const payload = JSON.parse(response.text.trim());
        return res.json({ success: true, recommendation: payload, model: "AI Gemini-3.5" });
      }
    } catch (err: any) {
      console.error("Gemini AI API Call failed, falling back to local recommendation generator:", err);
    }
  }

  // Graceful fallback heuristics if Gemini API key is missing or failed
  console.log("Using server fallback generator for recommendation...");
  
  // Custom Indian-themed rich heuristic matching
  let aestheticConcept = "Shahi Marigold & Luxurious Bronze";
  let paperType = "350 GSM Linen-Textured Pure Cotton Board";
  let printFinishes = ["Gold Foil Matte Pressed Die", "Satin UV Coat Layer", "Hand-crafted Border Ribbon Edge"];
  let expertRationale = `To honor the grandeur of your ${occasion} celebration, we pairing a majestic ${colorTheme || 'burgundy and copper'} pigment with micro-engraved metallic foil. The deep tactile grain of Italian cotton cards offers a regal sensation.`;
  let estimatedCost = "₹120 - ₹280 per piece";
  let productionTurnaround = "5 to 8 Days";
  let complementaryPieces = ["Matching Scented Envelope with Custom Seal Wax", "Linen Menu Cards", "Gold Foil Table Tent Numbers"];

  if (occasion.toLowerCase().includes('wedding') || occasion.toLowerCase().includes('marriage') || occasion.toLowerCase().includes('shadi')) {
    aestheticConcept = "Ananta Heritage Emperor Velvet Royal Box";
    paperType = "400 GSM Royal Suede Infused Ivory rigid sheeting";
    printFinishes = ["24K Deep Laser Gold Hot Stamping", "Classic Inner Foil Envelope Flap Lining", "Deity Embossing"];
    expertRationale = "A celebration of eternal union deserves an heirloom. This velvet-sleeved rigid luxury box presents a deeply engaging sensory experience of weight, tactile depth, and glittering gold accents for your family and guests.";
    estimatedCost = "₹350 - ₹950 per invite set";
    productionTurnaround = "10 to 14 Days";
    complementaryPieces = ["Gilded Sweet Boxes", "Laser Cut RSVP Pocket Enclosures", "Matching Velvet Envelope Bags"];
  } else if (occasion.toLowerCase().includes('business') || occasion.toLowerCase().includes('corporate') || occasion.toLowerCase().includes('office')) {
    aestheticConcept = "Titanium Charcoal Minimalist UV Spot";
    paperType = "450 GSM Matte Polymerized Synthetic Smart Cardstock";
    printFinishes = ["Spot UV Gloss Lacquering", "Seamless Triple-Edge Color Gilding", "Anti-fingerprint Matte Finish"];
    expertRationale = "Ensure instantly memorable contact with high-impact corporate materials. This polymer-coated heavy stock stands out through its incredible structural rigidity and striking tactile spot varnish.";
    estimatedCost = "₹6 - ₹15 per business card";
    productionTurnaround = "3 to 5 Days";
    complementaryPieces = ["Textured Letterhead Set", "Debossed Leather Ring Notebook Binder", "Branded Custom Gift Packaging Bags"];
  }

  res.json({
    success: true,
    recommendation: {
      aestheticConcept,
      paperType,
      printFinishes,
      expertRationale,
      estimatedCost,
      productionTurnaround,
      complementaryPieces
    },
    model: "Bhairavnath Design Engine (Local Fallback)"
  });
});


// FRONTEND BUILD & VITE SERVING
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Bhairavnath Digital Full-Stack Server running on http://localhost:${PORT}`);
  });
}

startServer();
