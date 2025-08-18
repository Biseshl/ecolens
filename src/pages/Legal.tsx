import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Legal = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Legal Information</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Important legal information regarding the use of EcoLens platform and services.
          </p>
        </div>

        {/* Legal Tabs */}
        <Tabs defaultValue="privacy" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="affiliate">Affiliate</TabsTrigger>
            <TabsTrigger value="disclaimer">Disclaimer</TabsTrigger>
            <TabsTrigger value="terms">Terms</TabsTrigger>
          </TabsList>

          <TabsContent value="privacy" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Data Collection</h3>
                  <p className="text-muted-foreground">
                    EcoLens is designed with privacy in mind. We only collect minimal data necessary for functionality.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Saved Items & Leaf-Points</h3>
                  <p className="text-muted-foreground">
                    We only remember saved items locally on your device to maintain your Leaf-points counter. 
                    This information is stored in your browser's local storage and is not transmitted to our servers 
                    or shared with third parties.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">No Personal Data Collection</h3>
                  <p className="text-muted-foreground">
                    We do not collect, store, or process any personal information such as names, email addresses, 
                    or contact details unless you explicitly provide them through our contact forms.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Cookies</h3>
                  <p className="text-muted-foreground">
                    We use only essential cookies required for the website to function properly. 
                    No tracking or analytics cookies are used.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Data Retention</h3>
                  <p className="text-muted-foreground">
                    Since we only store data locally on your device, you have full control over your data. 
                    You can clear your saved items and leaf-points by clearing your browser's local storage.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="affiliate" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Affiliate Disclosure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Commission Earnings</h3>
                  <p className="text-muted-foreground">
                    We may earn a small commission when you buy via our links—at no extra cost to you.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Transparency</h3>
                  <p className="text-muted-foreground">
                    We believe in full transparency about our affiliate relationships. When you click on product links 
                    and make a purchase, we may receive a commission from the retailer. This helps support our platform 
                    and allows us to continue providing free access to sustainability information.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">No Additional Cost</h3>
                  <p className="text-muted-foreground">
                    These affiliate commissions do not increase the price you pay for products. The commission is paid 
                    by the retailer from their existing profit margins.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Editorial Independence</h3>
                  <p className="text-muted-foreground">
                    Our product recommendations and sustainability scores are based on objective criteria and are not 
                    influenced by affiliate relationships. We maintain editorial independence in our product evaluations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="disclaimer" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Disclaimer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Educational Purpose</h3>
                  <p className="text-muted-foreground">
                    This website/app is for a class assignment and not for commercial purposes.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Demo Platform</h3>
                  <p className="text-muted-foreground">
                    EcoLens is a demonstration platform created for educational purposes as part of a university 
                    assignment. While we strive for accuracy in our sustainability information, this platform 
                    should not be considered a commercial service.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Product Information</h3>
                  <p className="text-muted-foreground">
                    Product information, sustainability scores, and availability are provided for demonstration 
                    purposes only. Actual product details, prices, and availability may vary from real-world retailers.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">No Commercial Transactions</h3>
                  <p className="text-muted-foreground">
                    No real commercial transactions occur through this platform. All payment processing and 
                    purchase links are for demonstration purposes only.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Limitation of Liability</h3>
                  <p className="text-muted-foreground">
                    This platform is provided "as is" for educational purposes. We make no warranties or 
                    representations about the accuracy or completeness of the information provided.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="terms" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Terms of Use</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Acceptance of Terms</h3>
                  <p className="text-muted-foreground">
                    By accessing and using this website, you accept and agree to be bound by the terms and 
                    provision of this agreement.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Educational Use Only</h3>
                  <p className="text-muted-foreground">
                    This platform is intended solely for educational and demonstration purposes. Any commercial 
                    use is strictly prohibited.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Intellectual Property</h3>
                  <p className="text-muted-foreground">
                    All content on this website, including text, graphics, logos, and images, is the property 
                    of the course project creators and is protected by copyright laws.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">User Conduct</h3>
                  <p className="text-muted-foreground">
                    Users agree not to use the platform for any unlawful purpose or any purpose prohibited 
                    under these terms of use.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Modifications</h3>
                  <p className="text-muted-foreground">
                    We reserve the right to modify these terms at any time. Changes will be effective 
                    immediately upon posting to the website.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Contact Information</h3>
                  <p className="text-muted-foreground">
                    For questions about these terms, please contact us through our contact page.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer Notice */}
        <div className="mt-12 p-6 bg-muted/30 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">
            This legal information is provided for demonstration purposes as part of a university assignment. 
            In a real-world application, these policies would be reviewed and approved by legal professionals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Legal;