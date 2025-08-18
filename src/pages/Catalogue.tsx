import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import ProductCard from '@/components/ProductCard';
import { mockProducts, categories } from '@/data/products';

const Catalogue = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isVegan, setIsVegan] = useState(false);
  const [isPlasticFree, setIsPlasticFree] = useState(false);
  const [isLocal, setIsLocal] = useState(false);
  const [maxPrice, setMaxPrice] = useState(200);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesVegan = !isVegan || product.isVegan;
      const matchesPlasticFree = !isPlasticFree || product.isPlasticFree;
      const matchesLocal = !isLocal || product.isLocal;
      const matchesPrice = product.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesVegan && 
             matchesPlasticFree && matchesLocal && matchesPrice;
    });
  }, [searchTerm, selectedCategory, isVegan, isPlasticFree, isLocal, maxPrice]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setIsVegan(false);
    setIsPlasticFree(false);
    setIsLocal(false);
    setMaxPrice(200);
  };

  return (
    <div className="min-h-screen"
         style={{
           background: 'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(120 15% 95%) 50%, hsl(var(--muted)) 100%)'
         }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Product Catalogue</h1>
          <p className="text-sm text-primary/80 font-medium mb-2">Your eco-friendly product finder</p>
          <p className="text-muted-foreground">
            Discover sustainable products that make a difference
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card/80 backdrop-blur-sm border rounded-lg p-6 mb-8 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Filters</h2>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear all
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Vegan Filter */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isVegan}
                  onChange={(e) => setIsVegan(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm font-medium">Vegan</span>
              </label>
            </div>

            {/* Plastic-free Filter */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isPlasticFree}
                  onChange={(e) => setIsPlasticFree(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm font-medium">Plastic-free</span>
              </label>
            </div>

            {/* Local Filter */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isLocal}
                  onChange={(e) => setIsLocal(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm font-medium">Local (&lt;100 km)</span>
              </label>
            </div>

            {/* Price Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Max price: ${maxPrice}</label>
              <Slider
                value={[maxPrice]}
                onValueChange={(value) => setMaxPrice(value[0])}
                max={200}
                min={0}
                step={5}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
            {/* Clear Filters Chip */}
            {(searchTerm || selectedCategory || isVegan || isPlasticFree || isLocal || maxPrice < 200) && (
              <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-sm">
                <span>Filters active</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-auto p-1 text-xs hover:bg-primary/20"
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found matching your criteria.</p>
            <Button variant="outline" onClick={clearFilters} className="mt-4">
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalogue;