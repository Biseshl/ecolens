import { Link } from 'react-router-dom';
import { Handshake, Star, Crown, Database, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Services = () => {
  const services = [
    {
      icon: Handshake,
      title: 'Affiliate partnerships',
      description: 'Join our network of sustainable retailers and earn commissions on every sale through our platform.',
      features: [
        'Competitive commission rates',
        'Real-time analytics dashboard',
        'Marketing support and resources',
        'Monthly payouts'
      ],
      badge: 'Popular'
    },
    {
      icon: Star,
      title: 'Sponsored listings & featured placements',
      description: 'Increase your product visibility with premium placement in search results and category pages.',
      features: [
        'Top search result placement',
        'Category page highlights',
        'Homepage feature opportunities',
        'Detailed performance metrics'
      ],
      badge: 'Business'
    },
    {
      icon: Crown,
      title: 'Premium ad-free membership',
      description: 'Enhance your shopping experience with our premium membership program for conscious consumers.',
      features: [
        'Ad-free browsing experience',
        'Exclusive product previews',
        'Advanced filtering options',
        'Priority customer support'
      ],
      badge: 'Premium'
    },
    {
      icon: Database,
      title: 'Impact-score API licensing (beta)',
      description: 'Integrate our comprehensive sustainability scoring system into your own platform or application.',
      features: [
        'Real-time impact scores',
        'Comprehensive API documentation',
        'Scalable pricing tiers',
        'Developer support'
      ],
      badge: 'Beta'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Partner with EcoLens to reach conscious consumers and promote sustainable products. 
            We offer comprehensive solutions for brands, retailers, and developers.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="relative hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <Badge variant="secondary">{service.badge}</Badge>
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary/10 to-leaf-green/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join our growing network of sustainable businesses and help more consumers 
            make eco-conscious choices. Contact us to learn more about partnership opportunities.
          </p>
          <Button asChild size="lg" className="mb-4">
            <Link to="/pay">
              Explore Payment Options
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
          <div className="text-sm text-muted-foreground">
            All services include comprehensive onboarding and ongoing support
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Why Partner with EcoLens?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Verified Audience',
                description: 'Reach consumers who are actively seeking sustainable products',
                stat: '600+'
              },
              {
                title: 'Trust & Credibility',
                description: 'Our rigorous five-pillar scoring system builds consumer confidence',
                stat: '4.4★'
              },
              {
                title: 'Environmental Impact',
                description: 'Track and showcase the positive environmental impact of your products',
                stat: '12.3t'
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{benefit.stat}</div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;