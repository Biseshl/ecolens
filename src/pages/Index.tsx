import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Leaf, Star, TrendingUp, Recycle, TreePine, Droplets, Sun, Wind, Coffee, Utensils, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { categories } from '@/data/products';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    window.location.href = `/catalogue?search=${encodeURIComponent(searchTerm)}`;
  };

  // Eco doodle elements for background
  const ecoDoodles = [
    { Icon: Leaf, position: 'top-16 left-[10%]', delay: '0s', size: 'h-8 w-8' },
    { Icon: Recycle, position: 'top-32 right-[15%]', delay: '2s', size: 'h-6 w-6' },
    { Icon: TreePine, position: 'top-48 left-[20%]', delay: '4s', size: 'h-10 w-10' },
    { Icon: Sun, position: 'top-20 right-[30%]', delay: '1s', size: 'h-7 w-7' },
    { Icon: Wind, position: 'top-40 left-[5%]', delay: '3s', size: 'h-6 w-6' },
    { Icon: Droplets, position: 'top-60 right-[10%]', delay: '5s', size: 'h-5 w-5' },
    { Icon: Coffee, position: 'top-24 left-[25%]', delay: '2.5s', size: 'h-6 w-6' },
    { Icon: Utensils, position: 'top-52 right-[25%]', delay: '1.5s', size: 'h-7 w-7' },
    { Icon: ShoppingBag, position: 'top-36 left-[15%]', delay: '4.5s', size: 'h-6 w-6' },
    { Icon: Leaf, position: 'top-64 left-[30%]', delay: '3.5s', size: 'h-5 w-5' },
  ];

  const kpis = [
    { icon: TrendingUp, value: '600+', label: 'Products at launch' },
    { icon: Star, value: '4.4★', label: 'Avg. user rating' },
    { icon: Leaf, value: '12.3 t', label: 'CO₂ saved (demo)' }
  ];

  const topCategories = [
    { name: 'Personal Care', icon: '🧴', description: 'Natural beauty & hygiene products' },
    { name: 'Home', icon: '🏠', description: 'Sustainable household essentials' },
    { name: 'Fashion', icon: '👕', description: 'Ethical clothing & accessories' },
    { name: 'Groceries', icon: '🥬', description: 'Organic & local food options' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative py-24 bg-gradient-to-br from-leaf-green/90 to-earth-brown/80 overflow-hidden"
      >
        {/* Eco Doodle Background */}
        <div className="absolute inset-0 pointer-events-none">
          {ecoDoodles.map((doodle, index) => {
            const { Icon, position, delay, size } = doodle;
            return (
              <Icon
                key={index}
                className={`absolute ${position} ${size} text-white/10 animate-[float_6s_ease-in-out_infinite] opacity-60`}
                style={{ 
                  animationDelay: delay,
                  transform: 'rotate(-15deg)'
                }}
              />
            );
          })}
          
          {/* Additional scattered elements */}
          <div className="absolute top-1/4 right-[8%] w-12 h-12 rounded-full bg-white/5 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-3/4 left-[12%] w-8 h-8 rounded-full bg-white/5 animate-pulse" style={{ animationDelay: '3s' }} />
          <div className="absolute top-1/2 right-[5%] w-6 h-6 rounded-full bg-white/5 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              All your eco-options — vetted, verified, visible.
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow">
              Discover sustainable products that align with your values. Every choice makes a difference.
            </p>
            
            {/* Search Box */}
            <div className="flex max-w-md mx-auto mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search eco-friendly products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} className="ml-2">Search</Button>
            </div>

            <Button asChild size="lg" className="mb-12">
              <Link to="/catalogue">Browse all products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* KPI Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {kpis.map((kpi, index) => {
              const IconComponent = kpi.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <IconComponent className="h-12 w-12 text-primary mx-auto mb-4" />
                    <div className="text-3xl font-bold text-primary mb-2">{kpi.value}</div>
                    <p className="text-muted-foreground">{kpi.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Top Categories</h2>
            <p className="text-muted-foreground">Explore our curated selection of sustainable products</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <Link to={`/catalogue?category=${encodeURIComponent(category.name)}`}>
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
