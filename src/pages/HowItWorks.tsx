import { useState } from 'react';
import { Leaf, RotateCcw, Shield, Users, Award, ChevronDown, PlayCircle, CheckCircle, Star, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';

const HowItWorks = () => {
  const [activePillar, setActivePillar] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);

  const pillars = [
    {
      icon: Leaf,
      title: 'Carbon Footprint',
      description: 'We evaluate the carbon emissions throughout the product lifecycle, from production to disposal, promoting climate-positive choices.',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      hoverColor: 'hover:bg-primary/20',
      details: [
        'Lifecycle Carbon Assessment (LCA)',
        'Supply Chain Emissions Analysis',
        'Transportation Impact Evaluation',
        'End-of-Life Carbon Calculation'
      ],
      score: '4.2/5'
    },
    {
      icon: RotateCcw,
      title: 'Circularity',
      description: 'Products are assessed for recyclability, reusability, and circular design principles that minimize waste and maximize resource efficiency.',
      color: 'text-leaf-green',
      bgColor: 'bg-leaf-green/10',
      hoverColor: 'hover:bg-leaf-green/20',
      details: [
        'Material Recyclability Index',
        'Design for Disassembly Score',
        'Circular Economy Integration',
        'Waste Reduction Potential'
      ],
      score: '4.5/5'
    },
    {
      icon: Shield,
      title: 'Cruelty-Free',
      description: 'We verify that products and their ingredients are not tested on animals and support ethical treatment of all living beings.',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      hoverColor: 'hover:bg-accent/20',
      details: [
        'Animal Testing Verification',
        'Ingredient Source Validation',
        'Third-Party Certification Check',
        'Supply Chain Audit'
      ],
      score: '4.8/5'
    },
    {
      icon: Users,
      title: 'Community Impact',
      description: 'We evaluate how products support fair labor practices, local communities, and social responsibility throughout the supply chain.',
      color: 'text-earth-brown',
      bgColor: 'bg-earth-brown/10',
      hoverColor: 'hover:bg-earth-brown/20',
      details: [
        'Fair Labor Practice Assessment',
        'Community Development Impact',
        'Local Economic Contribution',
        'Social Responsibility Metrics'
      ],
      score: '4.1/5'
    },
    {
      icon: Award,
      title: 'Certification',
      description: 'Products must meet recognized sustainability standards and certifications from trusted third-party organizations.',
      color: 'text-primary-light',
      bgColor: 'bg-primary/10',
      hoverColor: 'hover:bg-primary/20',
      details: [
        'ISO 14001 Environmental Standards',
        'Cradle to Cradle Certification',
        'B-Corp Verification',
        'LEED Green Building Standards'
      ],
      score: '4.6/5'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="mb-4" variant="secondary">
            <Star className="h-4 w-4 mr-1" />
            Trusted by 50,000+ eco-conscious consumers
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-leaf-green bg-clip-text text-transparent">
            How EcoLens Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Our comprehensive five-pillar system evaluates products across multiple sustainability dimensions, 
            giving you the confidence to make eco-conscious choices that align with your values.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group">
              <PlayCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Demo Video
            </Button>
            <Button variant="outline" size="lg">
              <TrendingUp className="h-5 w-5 mr-2" />
              View Sample Report
            </Button>
          </div>
        </div>

        {/* Interactive Five Pillars */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Five Sustainability Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, index) => {
              const IconComponent = pillar.icon;
              const isActive = activePillar === index;
              return (
                <Card 
                  key={index} 
                  className={`cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                    isActive ? 'ring-2 ring-primary shadow-lg scale-105' : ''
                  } ${pillar.hoverColor}`}
                  onClick={() => setActivePillar(isActive ? null : index)}
                >
                  <CardHeader className="text-center">
                    <div className={`mx-auto mb-4 p-4 rounded-full ${pillar.bgColor} w-fit ${pillar.color} transition-all duration-300 ${
                      isActive ? 'scale-110' : ''
                    }`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl flex items-center justify-between">
                      {pillar.title}
                      <Badge variant="outline" className="ml-2">
                        {pillar.score}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{pillar.description}</p>
                    
                    {isActive && (
                      <div className="animate-fade-in space-y-2">
                        <h4 className="font-semibold text-sm">Key Evaluation Areas:</h4>
                        {pillar.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                            {detail}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="mt-4 flex justify-center">
                      <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${
                        isActive ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Interactive Scoring System */}
        <div className="bg-gradient-to-br from-muted/30 to-muted/50 rounded-xl p-8 mb-16 border">
          <h2 className="text-3xl font-bold text-center mb-8">How We Score Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-primary mb-2 group-hover:animate-pulse">0-5</div>
              <h3 className="font-semibold mb-2">Individual Pillar Scores</h3>
              <p className="text-sm text-muted-foreground">
                Each pillar is scored from 0 to 5 based on rigorous criteria and verified data
              </p>
              <div className="mt-4 flex justify-center space-x-1">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-leaf-green mb-2 group-hover:animate-pulse">0-100%</div>
              <h3 className="font-semibold mb-2">Overall Impact Score</h3>
              <p className="text-sm text-muted-foreground">
                Combined score representing the product's overall sustainability performance
              </p>
              <div className="mt-4 w-full bg-muted rounded-full h-2">
                <div className="bg-leaf-green h-2 rounded-full animate-[width_2s_ease-in-out] w-[85%]"></div>
              </div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-accent mb-2 group-hover:animate-pulse">Verified</div>
              <h3 className="font-semibold mb-2">Third-Party Validation</h3>
              <p className="text-sm text-muted-foreground">
                All claims are verified through certified testing and documentation
              </p>
              <div className="mt-4 flex justify-center">
                <CheckCircle className="h-8 w-8 text-accent animate-bounce" />
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Process Steps */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Evaluation Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Product Submission',
                description: 'Brands submit products with detailed sustainability documentation',
                detail: 'Comprehensive documentation including materials, sourcing, manufacturing processes, and certifications.'
              },
              {
                step: '2',
                title: 'Expert Review',
                description: 'Our sustainability experts evaluate each product against our five pillars',
                detail: 'Multi-disciplinary team of environmental scientists, social impact specialists, and certification experts.'
              },
              {
                step: '3',
                title: 'Verification',
                description: 'Third-party certifications and claims are independently verified',
                detail: 'Independent laboratory testing, supply chain audits, and certification body validation.'
              },
              {
                step: '4',
                title: 'Scoring & Listing',
                description: 'Products receive scores and are listed in our verified marketplace',
                detail: 'Final scores published with transparency reports and recommendations for improvement.'
              }
            ].map((step, index) => (
              <Card 
                key={index} 
                className={`text-center cursor-pointer transition-all duration-500 transform hover:scale-105 hover:shadow-xl ${
                  activeStep === index ? 'ring-2 ring-primary shadow-lg scale-105 bg-primary/5' : ''
                }`}
                onClick={() => setActiveStep(activeStep === index ? -1 : index)}
                onMouseEnter={() => setActiveStep(index)}
              >
                <CardContent className="p-6">
                  <div className={`mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-300 ${
                    activeStep === index 
                      ? 'bg-primary text-primary-foreground scale-110' 
                      : 'bg-primary/10 text-primary'
                  }`}>
                    {step.step}
                  </div>
                  <h3 className="font-semibold mb-2 text-lg">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
                  
                  {activeStep === index && (
                    <div className="animate-fade-in border-t pt-4 mt-4">
                      <p className="text-xs text-muted-foreground italic">
                        {step.detail}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border border-border rounded-lg px-4">
              <AccordionTrigger className="hover:text-primary">
                How accurate are your sustainability scores?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Our scores are based on verified data from certified third-party organizations, independent testing labs, and rigorous supply chain audits. We maintain a 95% accuracy rate through continuous monitoring and updates.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border border-border rounded-lg px-4">
              <AccordionTrigger className="hover:text-primary">
                How often are product scores updated?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Product scores are reviewed quarterly and updated immediately when new certifications, supply chain changes, or manufacturing improvements are verified. We also conduct annual comprehensive reviews for all listed products.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border border-border rounded-lg px-4">
              <AccordionTrigger className="hover:text-primary">
                Can brands improve their scores over time?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Absolutely! We provide detailed feedback and improvement roadmaps to brands. Many of our partners have significantly improved their scores by implementing our recommendations for sustainable practices and supply chain optimization.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="border border-border rounded-lg px-4">
              <AccordionTrigger className="hover:text-primary">
                What certifications do you recognize?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We recognize over 50 international certifications including B-Corp, Cradle to Cradle, Fair Trade, GOTS, FSC, Energy Star, and many regional sustainability standards. Our certification database is continuously updated to reflect emerging standards.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
