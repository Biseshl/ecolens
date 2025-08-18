import { Leaf, RotateCcw, Shield, Users, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HowItWorks = () => {
  const pillars = [
    {
      icon: Leaf,
      title: 'Carbon Footprint',
      description: 'We evaluate the carbon emissions throughout the product lifecycle, from production to disposal, promoting climate-positive choices.',
      color: 'text-primary'
    },
    {
      icon: RotateCcw,
      title: 'Circularity',
      description: 'Products are assessed for recyclability, reusability, and circular design principles that minimize waste and maximize resource efficiency.',
      color: 'text-leaf-green'
    },
    {
      icon: Shield,
      title: 'Cruelty-Free',
      description: 'We verify that products and their ingredients are not tested on animals and support ethical treatment of all living beings.',
      color: 'text-accent'
    },
    {
      icon: Users,
      title: 'Community Impact',
      description: 'We evaluate how products support fair labor practices, local communities, and social responsibility throughout the supply chain.',
      color: 'text-earth-brown'
    },
    {
      icon: Award,
      title: 'Certification',
      description: 'Products must meet recognized sustainability standards and certifications from trusted third-party organizations.',
      color: 'text-primary-light'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">How EcoLens Works</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive five-pillar system evaluates products across multiple sustainability dimensions, 
            giving you the confidence to make eco-conscious choices that align with your values.
          </p>
        </div>

        {/* Five Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`mx-auto mb-4 p-3 rounded-full bg-muted w-fit ${pillar.color}`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl">{pillar.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{pillar.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* How Scoring Works */}
        <div className="bg-muted/50 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">How We Score Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">0-5</div>
              <h3 className="font-semibold mb-2">Individual Pillar Scores</h3>
              <p className="text-sm text-muted-foreground">
                Each pillar is scored from 0 to 5 based on rigorous criteria and verified data
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-leaf-green mb-2">0-100%</div>
              <h3 className="font-semibold mb-2">Overall Impact Score</h3>
              <p className="text-sm text-muted-foreground">
                Combined score representing the product's overall sustainability performance
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">Verified</div>
              <h3 className="font-semibold mb-2">Third-Party Validation</h3>
              <p className="text-sm text-muted-foreground">
                All claims are verified through certified testing and documentation
              </p>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-8">Our Evaluation Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Product Submission',
                description: 'Brands submit products with detailed sustainability documentation'
              },
              {
                step: '2',
                title: 'Expert Review',
                description: 'Our sustainability experts evaluate each product against our five pillars'
              },
              {
                step: '3',
                title: 'Verification',
                description: 'Third-party certifications and claims are independently verified'
              },
              {
                step: '4',
                title: 'Scoring & Listing',
                description: 'Products receive scores and are listed in our verified marketplace'
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold">
                  {step.step}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;