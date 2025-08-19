import { useLeafPoints } from '@/hooks/useLeafPoints';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Leaf, Heart, Calendar } from 'lucide-react';

const LeafPointsHistory = () => {
  const { transactions, leafPoints } = useLeafPoints();

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case 'item_saved':
        return <Heart className="h-4 w-4" />;
      default:
        return <Leaf className="h-4 w-4" />;
    }
  };

  const getActionColor = (actionType: string) => {
    switch (actionType) {
      case 'item_saved':
        return 'bg-primary/10 text-primary';
      default:
        return 'bg-leaf-green/10 text-leaf-green';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5" />
            Leaf Points History
            <Badge variant="secondary">{leafPoints} total</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Leaf className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No leaf points earned yet!</p>
            <p className="text-sm">Start saving items to your wishlist to earn points.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Leaf className="h-5 w-5" />
          Leaf Points History
          <Badge variant="secondary">{leafPoints} total</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div 
              key={transaction.id}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${getActionColor(transaction.action_type)}`}>
                  {getActionIcon(transaction.action_type)}
                </div>
                <div>
                  <p className="font-medium text-sm">{transaction.description}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {formatDate(transaction.created_at)}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-primary font-semibold">
                  +{transaction.points_earned}
                  <Leaf className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeafPointsHistory;