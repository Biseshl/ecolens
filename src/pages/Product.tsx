import { useSearchParams } from 'react-router-dom';
import { Heart, ExternalLink, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getProductById } from '@/data/products';
import { useLeafPoints } from '@/hooks/useLeafPoints';
import { useToast } from '@/hooks/use-toast';

const Product = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('id');
  const { saveItem, isItemSaved } = useLeafPoints();
  const { toast } = useToast();

  if (!productId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground">Invalid product ID</p>
        </div>
      </div>
    );
  }

  const product = getProductById(productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground">This product doesn't exist</p>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    const saved = saveItem(product.id);
    if (saved) {
      toast({
        title: "Product saved! +1 Leaf-point",
        description: "Added to your wishlist",
      });
    } else {
      toast({
        title: "Already saved",
        description: "This product is already in your wishlist",
      });
    }
  };

  const handleBuyClick = (url: string) => {
    alert("We may earn a small commission when you buy via our links—at no extra cost to you.");
    window.open(url, '_blank');
  };

  const pillars = [
    { name: 'Carbon Footprint', value: product.pillars.carbon, max: 5 },
    { name: 'Circularity', value: product.pillars.circularity, max: 5 },
    { name: 'Cruelty-Free', value: product.pillars.crueltyFree, max: 5 },
    { name: 'Community Impact', value: product.pillars.community, max: 5 },
    { name: 'Certification', value: product.pillars.certification, max: 5 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={product.image}
                alt={`${product.brand} ${product.name}`}
                className="w-full h-full object-cover"
                width={800}
                height={600}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zNzUgMjcwSDQyNVYzMzBIMzc1VjI3MFoiIGZpbGw9IiM5Q0E0QUMiLz4KPHN2Zz4K";
                  target.alt = "Product image placeholder";
                }}
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{product.category}</Badge>
                {product.isVegan && <Badge variant="secondary">Vegan</Badge>}
                {product.isPlasticFree && <Badge variant="secondary">Plastic-free</Badge>}
                {product.isLocal && <Badge variant="secondary">Local</Badge>}
              </div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-xl text-muted-foreground mb-4">{product.brand}</p>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Five Pillar Impact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Five Pillar Impact Score
                  <span className="text-2xl font-bold text-primary">{product.overallScore}%</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pillars.map((pillar, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{pillar.name}</span>
                      <span className="text-sm">{pillar.value}/{pillar.max}</span>
                    </div>
                    <Progress value={(pillar.value / pillar.max) * 100} />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Price Options */}
            <Card>
              <CardHeader>
                <CardTitle>Buy Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {product.priceOptions.map((option, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{option.retailer}</p>
                      <p className="text-2xl font-bold">${option.price}</p>
                    </div>
                    <Button 
                      onClick={() => handleBuyClick(option.url)}
                      className="ml-4"
                    >
                      Buy Now
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground mt-4">
                  We may earn a small commission when you buy via our links—at no extra cost to you.
                </p>
              </CardContent>
            </Card>

            {/* Save to Wishlist */}
            <Button 
              onClick={handleSave}
              variant={isItemSaved(product.id) ? "default" : "outline"}
              className="w-full"
              size="lg"
            >
              <Heart className={`h-5 w-5 mr-2 ${isItemSaved(product.id) ? 'fill-current' : ''}`} />
              {isItemSaved(product.id) ? 'Saved to wishlist' : 'Save to wishlist (+1 leaf)'}
            </Button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          <div className="grid gap-4">
            {product.reviews.map((review, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-medium">{review.author}</span>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;