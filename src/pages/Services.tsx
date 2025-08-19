import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Handshake, Star, Crown, Database, ArrowRight, Check, Zap, TrendingUp, ShieldCheck, Heart, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState('consumer');

  const pricingCategories = {
    consumer: {
      title: 'Consumer Plans',
      subtitle: 'For eco-conscious shoppers',
      plans: [
        {
          name: 'Free Explorer',
          price: '$0',
          period: 'forever',
          description: 'Perfect for starting your sustainable shopping journey',
          features: [
            'Access to 600+ verified products',
            'Basic sustainability scores',
            'Product comparison tool',
            'Community reviews',
            'Basic leaf points system',
            'Standard customer support'
          ],
          badge: 'Most Popular',
          badgeColor: 'bg-primary',
          ctaText: 'Get Started Free',
          recommended: true
        },
        {
          name: 'Premium Member',
          price: '$9.99',
          period: 'per month',
          description: 'Enhanced features for serious eco-shoppers',
          features: [
            'Everything in Free Explorer',
            'Ad-free browsing experience',
            'Advanced filtering & sorting',
            'Exclusive product previews',
            'Premium leaf points multiplier (2x)',
            'Priority customer support',
            'Monthly sustainability reports',
            'Early access to new features'
          ],
          badge: 'Premium',
          badgeColor: 'bg-leaf-green',
          ctaText: 'Start Premium Trial'
        },
        {
          name: 'Eco Advocate',
          price: '$19.99',
          period: 'per month',
          description: 'For sustainability leaders and influencers',
          features: [
            'Everything in Premium Member',
            'Detailed impact analytics',
            'White-label sustainability reports',
            'API access for personal tracking',
            'Community leadership features',
            'Direct brand collaboration opportunities',
            'Custom sustainability goals',
            'Dedicated account manager'
          ],
          badge: 'Pro',
          badgeColor: 'bg-accent',
          ctaText: 'Become an Advocate'
        }
      ]
    },
    business: {
      title: 'Business Solutions',
      subtitle: 'For brands and retailers',
      plans: [
        {
          name: 'Startup',
          price: '$99',
          period: 'per month',
          description: 'Perfect for small sustainable businesses',
          features: [
            'List up to 50 products',
            'Basic analytics dashboard',
            'Standard verification process',
            'Community support',
            'Monthly performance reports',
            '5% commission on affiliate sales'
          ],
          badge: 'Starter',
          badgeColor: 'bg-primary',
          ctaText: 'Start Selling'
        },
        {
          name: 'Growth',
          price: '$299',
          period: 'per month',
          description: 'Scale your sustainable product reach',
          features: [
            'List up to 200 products',
            'Advanced analytics & insights',
            'Priority verification process',
            'Featured product placements',
            'Bi-weekly strategy calls',
            '7% commission on affiliate sales',
            'Marketing campaign support',
            'Custom brand page'
          ],
          badge: 'Popular',
          badgeColor: 'bg-leaf-green',
          ctaText: 'Scale Your Business',
          recommended: true
        },
        {
          name: 'Enterprise',
          price: '$799',
          period: 'per month',
          description: 'Complete solution for established brands',
          features: [
            'Unlimited product listings',
            'Real-time analytics & API access',
            'Fast-track verification (24-48h)',
            'Premium homepage placements',
            'Weekly dedicated support',
            '10% commission on affiliate sales',
            'Co-marketing opportunities',
            'White-label solutions',
            'Custom integrations'
          ],
          badge: 'Enterprise',
          badgeColor: 'bg-accent',
          ctaText: 'Contact Sales'
        }
      ]
    },
    developer: {
      title: 'Developer & API',
      subtitle: 'For apps and integrations',
      plans: [
        {
          name: 'Sandbox',
          price: '$0',
          period: 'for testing',
          description: 'Test our API with sample data',
          features: [
            '1,000 API calls per month',
            'Sample sustainability data',
            'Basic documentation',
            'Community support',
            'Test environment access'
          ],
          badge: 'Free',
          badgeColor: 'bg-primary',
          ctaText: 'Start Testing'
        },
        {
          name: 'Professional',
          price: '$199',
          period: 'per month',
          description: 'Production-ready API access',
          features: [
            '50,000 API calls per month',
            'Real-time sustainability scores',
            'Comprehensive documentation',
            'Email support',
            'SLA guarantee (99.9% uptime)',
            'Rate limiting controls'
          ],
          badge: 'Production',
          badgeColor: 'bg-leaf-green',
          ctaText: 'Go Production',
          recommended: true
        },
        {
          name: 'Scale',
          price: '$599',
          period: 'per month',
          description: 'High-volume enterprise API',
          features: [
            '500,000 API calls per month',
            'Premium data endpoints',
            'Priority support & SLA',
            'Custom integrations',
            'Dedicated infrastructure',
            'Advanced analytics',
            'White-label licensing'
          ],
          badge: 'Scale',
          badgeColor: 'bg-accent',
          ctaText: 'Contact Enterprise'
        }
      ]
    }
  };

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
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="mb-4" variant="secondary">
            <Heart className="h-4 w-4 mr-1" />
            Trusted by 50,000+ eco-conscious users
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-leaf-green bg-clip-text text-transparent">
            Our Services & Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Partner with EcoLens to reach conscious consumers and promote sustainable products. 
            Choose the plan that fits your needs and budget.
          </p>
        </div>

        {/* Pricing Categories */}
        <div className="mb-16">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
              <TabsTrigger value="consumer" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Consumers
              </TabsTrigger>
              <TabsTrigger value="business" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Business
              </TabsTrigger>
              <TabsTrigger value="developer" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                API/Dev
              </TabsTrigger>
            </TabsList>

            {Object.entries(pricingCategories).map(([key, category]) => (
              <TabsContent key={key} value={key} className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-2">{category.title}</h2>
                  <p className="text-muted-foreground">{category.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.plans.map((plan, index) => (
                    <Card 
                      key={index} 
                      className={`relative transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                        plan.recommended ? 'ring-2 ring-primary shadow-lg scale-105' : ''
                      }`}
                    >
                      {plan.badge && (
                        <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-white text-sm font-medium ${plan.badgeColor}`}>
                          {plan.badge}
                        </div>
                      )}
                      
                      <CardHeader className="text-center pb-4">
                        <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
                        <div className="mb-4">
                          <span className="text-4xl font-bold text-primary">{plan.price}</span>
                          <span className="text-muted-foreground ml-2">/{plan.period}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{plan.description}</p>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <ul className="space-y-3">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start text-sm">
                              <Check className="h-4 w-4 text-primary mr-3 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <Button 
                          className={`w-full mt-6 ${plan.recommended ? 'bg-primary' : ''}`}
                          variant={plan.recommended ? 'default' : 'outline'}
                          asChild
                        >
                          <Link to="/pay">
                            {plan.ctaText}
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Services Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Additional Services</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="relative hover:shadow-lg transition-all duration-300 hover:scale-105 h-full">
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
        </div>

        {/* Enhanced CTA Section */}
        <div className="bg-gradient-to-br from-primary/10 via-leaf-green/10 to-accent/10 rounded-xl p-8 text-center border mb-16">
          <div className="max-w-3xl mx-auto">
            <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Ready to Make an Impact?</h2>
            <p className="text-muted-foreground mb-6 text-lg">
              Join our growing network of sustainable businesses and help more consumers 
              make eco-conscious choices. Start with our free plan or contact us for custom solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group">
                <Link to="/pay">
                  Get Started Today
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">
                  Contact Sales
                </Link>
              </Button>
            </div>
            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" />
                30-day money back
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                24/7 support
              </div>
              <div className="flex items-center gap-1">
                <Zap className="h-4 w-4" />
                Setup in minutes
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border rounded-lg">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border border-border p-4 text-left">Features</th>
                  <th className="border border-border p-4 text-center">Free</th>
                  <th className="border border-border p-4 text-center">Premium</th>
                  <th className="border border-border p-4 text-center">Business</th>
                  <th className="border border-border p-4 text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Product Access', free: '600+', premium: '600+', business: '200 listings', enterprise: 'Unlimited' },
                  { feature: 'Analytics', free: 'Basic', premium: 'Advanced', business: 'Real-time', enterprise: 'Custom Dashboard' },
                  { feature: 'Support', free: 'Community', premium: 'Email', business: 'Priority', enterprise: 'Dedicated Manager' },
                  { feature: 'API Access', free: '✗', premium: '✗', business: 'Limited', enterprise: 'Full Access' },
                  { feature: 'Custom Branding', free: '✗', premium: '✗', business: 'Limited', enterprise: 'White-label' }
                ].map((row, index) => (
                  <tr key={index} className="hover:bg-muted/30">
                    <td className="border border-border p-4 font-medium">{row.feature}</td>
                    <td className="border border-border p-4 text-center">{row.free}</td>
                    <td className="border border-border p-4 text-center">{row.premium}</td>
                    <td className="border border-border p-4 text-center">{row.business}</td>
                    <td className="border border-border p-4 text-center">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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