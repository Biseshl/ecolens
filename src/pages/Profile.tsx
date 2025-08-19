import { useLeafPoints } from '@/hooks/useLeafPoints';
import LeafPointsHistory from '@/components/LeafPointsHistory';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Leaf } from 'lucide-react';

const Profile = () => {
  const { leafPoints, savedItems } = useLeafPoints();

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Stats */}
          <div className="lg:col-span-1 space-y-6">
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
                    <span className="font-medium">Saved Items</span>
                  </div>
                  <Badge variant="outline">
                    {savedItems.length}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Leaf Points History */}
          <div className="lg:col-span-2">
            <LeafPointsHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;