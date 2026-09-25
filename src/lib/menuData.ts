export type MenuItem = {
  name: string;
  description: string;
  price: number;
  category: "ESPRESSO" | "FILTER" | "COLD" | "NON-COFFEE" | "PASTRY";
  image?: string;
};

export type FeaturedProduct = {
  id: string;
  name: string;
  notes: string;
  price: number;
  image: string;
};

export type ProcessStep = {
  number: number;
  title: string;
  description: string;
  image: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  location: string;
};

export const menuItems: MenuItem[] = [
  { name: "House Espresso", description: "Rich, full-bodied with notes of dark chocolate and cherry.", price: 4.5, category: "ESPRESSO" },
  { name: "Cortado", description: "Equal parts espresso and steamed milk.", price: 5.0, category: "ESPRESSO" },
  { name: "Pour Over", description: "Rotating single-origin selection, brewed to order.", price: 6.0, category: "FILTER" },
  { name: "Batch Brew", description: "Our daily house blend.", price: 3.5, category: "FILTER" },
  { name: "Cold Brew", description: "Steeped for 18 hours, smooth and bold.", price: 5.0, category: "COLD" },
  { name: "Iced Latte", description: "Espresso and milk over ice.", price: 5.5, category: "COLD" },
  { name: "Matcha Latte", description: "Ceremonial grade matcha with steamed milk.", price: 6.0, category: "NON-COFFEE" },
  { name: "Chai Latte", description: "Spiced black tea with steamed milk.", price: 5.5, category: "NON-COFFEE" },
  { name: "Butter Croissant", description: "Flaky, buttery perfection.", price: 4.5, category: "PASTRY" },
  { name: "Almond Croissant", description: "Twice baked with almond frangipane.", price: 5.5, category: "PASTRY" },
];

export const featuredProducts: FeaturedProduct[] = [
  { id: "house-espresso", name: "House Espresso", notes: "Dark Chocolate, Cherry, Hazelnut", price: 4.5, image: "/assets/images/featured/featured-house-espresso.jpg" },
  { id: "ethiopia", name: "Ethiopia Yirgacheffe", notes: "Jasmine, Peach, Honey", price: 5.5, image: "/assets/images/featured/featured-ethiopia.jpg" },
  { id: "cold-brew", name: "Signature Cold Brew", notes: "Smooth, Cocoa, Caramel", price: 5.0, image: "/assets/images/featured/featured-cold-brew.jpg" },
];

export const processSteps: ProcessStep[] = [
  { number: 1, title: "SELECT", description: "We source only the finest beans from ethical farms around the world.", image: "/assets/images/process/process-select.jpg" },
  { number: 2, title: "ROAST", description: "Our artisan roasting process brings out the unique flavors of each origin.", image: "/assets/images/process/process-roast.jpg" },
  { number: 3, title: "GRIND", description: "Freshly ground for every cup to ensure maximum flavor extraction.", image: "/assets/images/process/process-grind.jpg" },
  { number: 4, title: "BREW", description: "Meticulous brewing techniques tailored to each bean's profile.", image: "/assets/images/process/process-brew.jpg" },
  { number: 5, title: "SERVE", description: "Presented with care, ready for you to savor every sip.", image: "/assets/images/process/process-serve.jpg" },
];

export const testimonials: Testimonial[] = [
  { quote: "The best coffee I've had in the city. The attention to detail is unmatched.", name: "Sarah L.", location: "Downtown" },
  { quote: "A truly cinematic coffee experience. Every cup tells a story.", name: "James M.", location: "Westside" },
  { quote: "NOIR is my daily ritual. Consistently perfect.", name: "Elena R.", location: "Uptown" },
  { quote: "The pour-over here changed my perspective on coffee.", name: "David K.", location: "Midtown" },
  { quote: "Beautiful space, incredible coffee, and wonderful staff.", name: "Mia T.", location: "Eastside" },
];
