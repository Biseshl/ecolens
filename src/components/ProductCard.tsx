import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLeafPoints } from '@/hooks/useLeafPoints';
import { Product } from '@/data/products';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { saveItem, unsaveItem, isItemSaved } = useLeafPoints();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isItemSaved(product.id)) {
      unsaveItem(product.id);
      toast({
        title: "Item removed",
        description: "Product removed from your wishlist",
      });
    } else {
      const saved = saveItem(product.id);
      if (saved) {
        toast({
          title: "Item saved! +1 Leaf-point",
          description: "Product added to your wishlist",
        });
      }
    }
  };

  const pillars = [
    { name: 'Carbon', value: product.pillars.carbon, color: 'bg-primary' },
    { name: 'Circularity', value: product.pillars.circularity, color: 'bg-leaf-green' },
    { name: 'Cruelty-Free', value: product.pillars.crueltyFree, color: 'bg-accent' },
    { name: 'Community', value: product.pillars.community, color: 'bg-earth-brown' },
    { name: 'Certification', value: product.pillars.certification, color: 'bg-primary-light' },
  ];

  return (
    <Card 
      className="group relative overflow-hidden transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 bg-card/90 backdrop-blur-sm border-border/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={`${product.brand} ${product.name}`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          width={400}
          height={300}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTIwSDIyNVYxODBIMTc1VjEyMFoiIGZpbGw9IiM5Q0E0QUMiLz4KPHN2Zz4K";
            target.alt = "Product image placeholder";
          }}
        />
        <div className="absolute top-2 right-2 flex gap-2">
          {product.isVegan && <Badge variant="secondary" className="text-xs">Vegan</Badge>}
          {product.isPlasticFree && <Badge variant="secondary" className="text-xs">Plastic-free</Badge>}
          {product.isLocal && <Badge variant="secondary" className="text-xs">Local</Badge>}
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <div>
            <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
            <p className="text-xs text-muted-foreground">{product.brand}</p>
            <p className="text-xs text-muted-foreground">{product.category}</p>
          </div>

          {/* Five Pillar Impact Badges */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium">Impact Score</span>
              <span className="text-xs font-semibold">{product.overallScore}%</span>
            </div>
            <Progress value={product.overallScore} className="h-2" />
            <div className="grid grid-cols-5 gap-1 mt-2">
              {pillars.map((pillar, index) => (
                <div key={index} className="text-center">
                  <div className={`h-2 w-full rounded ${pillar.color}`} 
                       style={{ opacity: pillar.value / 5 }} />
                  <span className="text-xs text-muted-foreground">{pillar.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-bold text-lg">${product.price}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button asChild variant="outline" size="sm" className="flex-1">
          <Link to={`/product?id=${product.id}`}>
            <Eye className="h-4 w-4 mr-1" />
            View
          </Link>
        </Button>
        <Button
          variant={isItemSaved(product.id) ? "default" : "outline"}
          size="sm"
          onClick={handleSave}
          className="flex-1"
        >
          <Heart 
            className={`h-4 w-4 mr-1 ${isItemSaved(product.id) ? 'fill-current' : ''}`}
          />
          {isItemSaved(product.id) ? 'Saved' : 'Save'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;