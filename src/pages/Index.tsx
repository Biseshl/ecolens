import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Leaf, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { categories } from '@/data/products';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    window.location.href = `/catalogue?search=${encodeURIComponent(searchTerm)}`;
  };

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
      <section className="relative bg-gradient-to-br from-primary/5 via-leaf-green/5 to-accent/5 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-leaf-green bg-clip-text text-transparent">
              All your eco-options — vetted, verified, visible.
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
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
