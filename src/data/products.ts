// Import all product images
import bambooToothbrush from '@/assets/bamboo-toothbrush.jpg';
import cottonToteBag from '@/assets/cotton-tote-bag.jpg';
import glassStorageSet from '@/assets/glass-storage-set.jpg';
import organicQuinoa from '@/assets/organic-quinoa.jpg';
import shampooBar from '@/assets/shampoo-bar.jpg';
import woolSweater from '@/assets/wool-sweater.jpg';
import beeswaxWraps from '@/assets/beeswax-wraps.jpg';
import coffeeBeans from '@/assets/coffee-beans.jpg';
import coconutDeodorant from '@/assets/coconut-deodorant.jpg';
import hempSneakers from '@/assets/hemp-sneakers.jpg';
import solarCharger from '@/assets/solar-charger.jpg';
import organicPasta from '@/assets/organic-pasta.jpg';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  description: string;
  isVegan: boolean;
  isPlasticFree: boolean;
  isLocal: boolean;
  pillars: {
    carbon: number;
    circularity: number;
    crueltyFree: number;
    community: number;
    certification: number;
  };
  overallScore: number;
  priceOptions: Array<{
    retailer: string;
    price: number;
    url: string;
  }>;
  reviews: Array<{
    rating: number;
    comment: string;
    author: string;
  }>;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Bamboo Toothbrush Set",
    brand: "EcoSmile",
    category: "Personal Care",
    price: 12.99,
    image: bambooToothbrush,
    description: "Biodegradable bamboo toothbrushes with soft bristles",
    isVegan: true,
    isPlasticFree: true,
    isLocal: true,
    pillars: { carbon: 5, circularity: 4, crueltyFree: 5, community: 4, certification: 5 },
    overallScore: 92,
    priceOptions: [
      { retailer: "EcoStore", price: 12.99, url: "https://example.com" },
      { retailer: "GreenMart", price: 14.50, url: "https://example.com" }
    ],
    reviews: [
      { rating: 5, comment: "Love these! Great quality and eco-friendly.", author: "Sarah M." }
    ]
  },
  {
    id: "2",
    name: "Organic Cotton Tote Bag",
    brand: "FairTrade Co",
    category: "Fashion",
    price: 19.99,
    image: cottonToteBag,
    description: "Durable organic cotton tote bag with reinforced handles",
    isVegan: true,
    isPlasticFree: true,
    isLocal: false,
    pillars: { carbon: 4, circularity: 5, crueltyFree: 5, community: 5, certification: 4 },
    overallScore: 92,
    priceOptions: [
      { retailer: "FairTrade Direct", price: 19.99, url: "https://example.com" },
      { retailer: "EthicalMart", price: 22.00, url: "https://example.com" }
    ],
    reviews: [
      { rating: 4, comment: "Strong and well-made. Perfect for shopping.", author: "Mike L." }
    ]
  },
  {
    id: "3",
    name: "Glass Food Storage Set",
    brand: "ClearChoice",
    category: "Home",
    price: 45.99,
    image: glassStorageSet,
    description: "BPA-free glass containers with bamboo lids",
    isVegan: true,
    isPlasticFree: false,
    isLocal: true,
    pillars: { carbon: 3, circularity: 5, crueltyFree: 5, community: 3, certification: 4 },
    overallScore: 80,
    priceOptions: [
      { retailer: "KitchenWare Plus", price: 45.99, url: "https://example.com" },
      { retailer: "HomeGoods", price: 48.99, url: "https://example.com" }
    ],
    reviews: [
      { rating: 5, comment: "Perfect for meal prep and reduces plastic waste.", author: "Emma K." }
    ]
  },
  {
    id: "4",
    name: "Organic Quinoa",
    brand: "NatureFarm",
    category: "Groceries",
    price: 8.99,
    image: organicQuinoa,
    description: "Certified organic quinoa, locally sourced",
    isVegan: true,
    isPlasticFree: true,
    isLocal: true,
    pillars: { carbon: 4, circularity: 3, crueltyFree: 5, community: 5, certification: 5 },
    overallScore: 88,
    priceOptions: [
      { retailer: "OrganicMart", price: 8.99, url: "https://example.com" },
      { retailer: "HealthyChoice", price: 9.50, url: "https://example.com" }
    ],
    reviews: [
      { rating: 5, comment: "Fresh and tasty, great for salads.", author: "David R." }
    ]
  },
  {
    id: "5",
    name: "Shampoo Bar - Lavender",
    brand: "Pure Naturals",
    category: "Personal Care",
    price: 15.99,
    image: shampooBar,
    description: "Zero-waste shampoo bar with organic lavender",
    isVegan: true,
    isPlasticFree: true,
    isLocal: false,
    pillars: { carbon: 5, circularity: 5, crueltyFree: 5, community: 3, certification: 4 },
    overallScore: 88,
    priceOptions: [
      { retailer: "ZeroWaste Store", price: 15.99, url: "https://example.com" },
      { retailer: "NaturalBeauty", price: 17.50, url: "https://example.com" }
    ],
    reviews: [
      { rating: 4, comment: "Lathers well and smells amazing!", author: "Lisa P." }
    ]
  },
  {
    id: "6",
    name: "Recycled Wool Sweater",
    brand: "ReNew Fashion",
    category: "Fashion",
    price: 89.99,
    image: woolSweater,
    description: "Cozy sweater made from 100% recycled wool",
    isVegan: false,
    isPlasticFree: true,
    isLocal: false,
    pillars: { carbon: 4, circularity: 5, crueltyFree: 2, community: 4, certification: 3 },
    overallScore: 72,
    priceOptions: [
      { retailer: "SustainableFashion", price: 89.99, url: "https://example.com" },
      { retailer: "EcoClothing", price: 94.99, url: "https://example.com" }
    ],
    reviews: [
      { rating: 4, comment: "Warm and comfortable, love the sustainable aspect.", author: "Alex T." }
    ]
  },
  {
    id: "7",
    name: "Beeswax Food Wraps",
    brand: "BeeGood",
    category: "Home",
    price: 24.99,
    image: beeswaxWraps,
    description: "Reusable beeswax wraps, set of 3 sizes",
    isVegan: false,
    isPlasticFree: true,
    isLocal: true,
    pillars: { carbon: 4, circularity: 5, crueltyFree: 3, community: 5, certification: 4 },
    overallScore: 84,
    priceOptions: [
      { retailer: "LocalHive", price: 24.99, url: "https://example.com" },
      { retailer: "ZeroWaste", price: 26.99, url: "https://example.com" }
    ],
    reviews: [
      { rating: 5, comment: "Great alternative to plastic wrap!", author: "Jenny W." }
    ]
  },
  {
    id: "8",
    name: "Fair Trade Coffee Beans",
    brand: "EthicalBrew",
    category: "Groceries",
    price: 16.99,
    image: coffeeBeans,
    description: "Single-origin fair trade coffee beans",
    isVegan: true,
    isPlasticFree: false,
    isLocal: false,
    pillars: { carbon: 3, circularity: 2, crueltyFree: 5, community: 5, certification: 5 },
    overallScore: 80,
    priceOptions: [
      { retailer: "CoffeeDirect", price: 16.99, url: "https://example.com" },
      { retailer: "EthicalGrocer", price: 18.50, url: "https://example.com" }
    ],
    reviews: [
      { rating: 5, comment: "Rich flavor and supports farmers!", author: "Carlos M." }
    ]
  },
  {
    id: "9",
    name: "Coconut Oil Deodorant",
    brand: "FreshStart",
    category: "Personal Care",
    price: 11.99,
    image: coconutDeodorant,
    description: "Natural deodorant with coconut oil and essential oils",
    isVegan: true,
    isPlasticFree: false,
    isLocal: true,
    pillars: { carbon: 4, circularity: 3, crueltyFree: 5, community: 4, certification: 4 },
    overallScore: 80,
    priceOptions: [
      { retailer: "NaturalBody", price: 11.99, url: "https://example.com" },
      { retailer: "CleanLiving", price: 13.50, url: "https://example.com" }
    ],
    reviews: [
      { rating: 4, comment: "Works great and smells fresh.", author: "Maria S." }
    ]
  },
  {
    id: "10",
    name: "Hemp Canvas Sneakers",
    brand: "WalkGreen",
    category: "Fashion",
    price: 79.99,
    image: hempSneakers,
    description: "Sustainable sneakers made from hemp canvas",
    isVegan: true,
    isPlasticFree: true,
    isLocal: false,
    pillars: { carbon: 4, circularity: 4, crueltyFree: 5, community: 3, certification: 4 },
    overallScore: 80,
    priceOptions: [
      { retailer: "EcoFootwear", price: 79.99, url: "https://example.com" },
      { retailer: "GreenShoes", price: 84.99, url: "https://example.com" }
    ],
    reviews: [
      { rating: 4, comment: "Comfortable and stylish sustainable shoes.", author: "Tom B." }
    ]
  },
  {
    id: "11",
    name: "Solar Phone Charger",
    brand: "SunPower",
    category: "Home",
    price: 34.99,
    image: solarCharger,
    description: "Portable solar panel phone charger",
    isVegan: true,
    isPlasticFree: false,
    isLocal: false,
    pillars: { carbon: 5, circularity: 3, crueltyFree: 5, community: 3, certification: 3 },
    overallScore: 76,
    priceOptions: [
      { retailer: "TechGreen", price: 34.99, url: "https://example.com" },
      { retailer: "SolarShop", price: 37.99, url: "https://example.com" }
    ],
    reviews: [
      { rating: 4, comment: "Great for camping and outdoor activities.", author: "Rachel H." }
    ]
  },
  {
    id: "12",
    name: "Organic Pasta",
    brand: "GreenHarvest",
    category: "Groceries",
    price: 4.99,
    image: organicPasta,
    description: "Whole wheat organic pasta made locally",
    isVegan: true,
    isPlasticFree: true,
    isLocal: true,
    pillars: { carbon: 4, circularity: 4, crueltyFree: 5, community: 5, certification: 5 },
    overallScore: 92,
    priceOptions: [
      { retailer: "LocalFarm", price: 4.99, url: "https://example.com" },
      { retailer: "OrganicStore", price: 5.50, url: "https://example.com" }
    ],
    reviews: [
      { rating: 5, comment: "Delicious and supports local farmers.", author: "Antonio G." }
    ]
  }
];

export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return mockProducts.filter(product => product.category === category);
};

export const categories = ["Personal Care", "Home", "Fashion", "Groceries"];