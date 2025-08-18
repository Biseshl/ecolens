import { useState } from 'react';
import { CreditCard, ExternalLink, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Pay = () => {
  const [showReceipt, setShowReceipt] = useState(false);

  const handlePayPalClick = () => {
    window.open('https://www.paypal.com/au/home', '_blank');
    setShowReceipt(true);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const receiptItems = [
    { name: 'Premium Membership (Annual)', price: 49.99 },
    { name: 'API Access (Developer Tier)', price: 29.99 },
    { name: 'Processing Fee', price: 2.00 }
  ];

  const subtotal = receiptItems.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Payment Demo</h1>
            <p className="text-muted-foreground">
              This is a demonstration payment page for class assignment purposes only
            </p>
          </div>

          {/* Payment Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg bg-muted/30">
                <p className="text-sm text-muted-foreground mb-4">
                  <strong>Important:</strong> This is a demo payment system. No real payments will be processed.
                  Clicking the PayPal button will open PayPal's website in a new tab for demonstration purposes only.
                </p>
                
                <Button 
                  onClick={handlePayPalClick}
                  className="w-full bg-[#0070ba] hover:bg-[#005ea6] text-white"
                  size="lg"
                >
                  Pay with PayPal (Demo)
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                No real payment will be processed. This is for demonstration only.
              </div>
            </CardContent>
          </Card>

          {/* Receipt Section */}
          {showReceipt && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Payment Receipt
                  <Button variant="outline" size="sm" onClick={handlePrintReceipt}>
                    <Printer className="h-4 w-4 mr-2" />
                    Print Receipt
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Receipt #:</span>
                    <span className="text-sm">DEMO-{Date.now()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Date:</span>
                    <span className="text-sm">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Status:</span>
                    <span className="text-sm text-success font-medium">Demo Completed</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="font-medium">Items:</h3>
                  {receiptItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{item.name}</span>
                      <span className="text-sm font-medium">${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Subtotal:</span>
                    <span className="text-sm">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center font-medium">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground text-center">
                    This is a demonstration receipt. No actual payment has been processed. 
                    This transaction is for educational purposes only.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Additional Information */}
          <div className="mt-8 text-center">
            <div className="p-6 bg-muted/30 rounded-lg">
              <h3 className="font-semibold mb-2">Demo Payment Information</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• No real money will be charged or transferred</p>
                <p>• PayPal link opens their homepage for demonstration</p>
                <p>• Receipt generation is simulated for UI/UX demonstration</p>
                <p>• This feature is built for university assignment evaluation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pay;