import { useLeafPoints } from '@/hooks/useLeafPoints';
import LeafPointsHistory from '@/components/LeafPointsHistory';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Leaf, Heart, ShoppingBag, Eye } from 'lucide-react';
import { mockProducts } from '@/data/products';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { leafPoints, savedItems, unsaveItem } = useLeafPoints();

  // Get saved product details
  const savedProducts = mockProducts.filter(product => savedItems.includes(product.id));

  const handleUnsave = (productId: string) => {
    unsaveItem(productId);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Your Profile</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your eco-friendly journey and see how you're making a difference.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Profile Stats */}
          <div className="xl:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-primary" />
                    <span className="font-medium">Leaf Points</span>
                  </div>
                  <Badge variant="secondary" className="text-lg">
                    {leafPoints}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    <span className="font-medium">Saved Items</span>
                  </div>
                  <Badge variant="outline">
                    {savedItems.length}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Saved Products */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Saved Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                {savedProducts.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No saved products yet!</p>
                    <p className="text-sm">Start saving eco-friendly products to track them here.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {savedProducts.map((product) => (
                      <div 
                        key={product.id}
                        className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.brand}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Badge variant="outline" className="text-xs px-1 py-0">
                              {product.overallScore}/100
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            asChild
                            className="h-8 w-8 p-0"
                          >
                            <Link to={`/product/${product.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleUnsave(product.id)}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                          >
                            <Heart className="h-4 w-4 fill-current" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Leaf Points History */}
          <div className="xl:col-span-2">
            <LeafPointsHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;