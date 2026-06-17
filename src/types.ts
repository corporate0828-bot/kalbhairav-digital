export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  priceRange: string;
  rating: number;
  image: string;
  features: string[];
  paperType: string;
  minOrder: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  likes: number;
  subServiceId?: string;
  mainCategoryId?: string;
}

export interface CustomRequest {
  id: string;
  name: string;
  phone: string;
  email?: string;
  describeDesign: string;
  quantity: number;
  budget: string;
  referenceImage?: string; // Base64 data url or standard url
  status: 'Pending' | 'Approved' | 'Printing' | 'Completed';
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Machine {
  id: string;
  name: string;
  type: string;
  speed: string;
  description: string;
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  rating: number;
  comment: string;
  avatar: string;
}

export interface ServerData {
  products: Product[];
  gallery: GalleryItem[];
  customRequests: CustomRequest[];
  faqs: FAQItem[];
  machines: Machine[];
  team: TeamMember[];
  testimonials: Testimonial[];
  analytics: {
    pageViews: number;
    totalRequests: number;
    completedRequests: number;
  };
}
