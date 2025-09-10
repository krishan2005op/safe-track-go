import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { BlockchainID } from "@/components/BlockchainID";
import { AIAnomalyChart } from "@/components/AIAnomalyChart";
import { EncryptionDemo } from "@/components/EncryptionDemo";
import { MultilingualInterface } from "@/components/MultilingualInterface";
import { Brain, Shield, Globe, Cpu, Lock, Database, Zap, Users } from "lucide-react";

const Innovation = () => {
  const [activeDemo, setActiveDemo] = useState<string>("blockchain");

  const innovations = [
    {
      id: "blockchain",
      title: "Blockchain-Backed ID",
      icon: Database,
      description: "Immutable tourist identification with verified credentials and travel history",
      status: "Production Ready",
      impact: "99.9% Identity Verification",
      color: "primary"
    },
    {
      id: "ai-detection", 
      title: "AI Anomaly Detection",
      icon: Brain,
      description: "Machine learning algorithms for predictive safety analysis and crowd pattern recognition",
      status: "Active Learning",
      impact: "87% Incident Prevention",
      color: "accent"
    },
    {
      id: "encryption",
      title: "End-to-End Encryption",
      icon: Lock,
      description: "Military-grade security for all communications and data transmission",
      status: "Implemented",
      impact: "Zero Data Breaches",
      color: "safe"
    },
    {
      id: "multilingual",
      title: "Multilingual Accessibility",
      icon: Globe,
      description: "Real-time translation and culturally adapted safety instructions",
      status: "15 Languages",
      impact: "Global Accessibility",
      color: "warning"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary": return "border-primary bg-primary/5";
      case "accent": return "border-accent bg-accent/5";
      case "safe": return "border-safe bg-safe/5";
      case "warning": return "border-warning bg-warning/5";
      default: return "border-border";
    }
  };

  const renderActiveDemo = () => {
    switch (activeDemo) {
      case "blockchain":
        return <BlockchainID />;
      case "ai-detection":
        return <AIAnomalyChart />;
      case "encryption":
        return <EncryptionDemo />;
      case "multilingual":
        return <MultilingualInterface />;
      default:
        return <BlockchainID />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="bg-gradient-hero text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Brain className="h-16 w-16 mx-auto mb-6 text-blue-200" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Innovation Showcase</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Cutting-edge technologies powering the next generation of tourist safety and security systems
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
              <Cpu className="h-4 w-4 mr-2" />
              AI Powered
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
              <Shield className="h-4 w-4 mr-2" />
              Blockchain Secured
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
              <Zap className="h-4 w-4 mr-2" />
              Real-time Processing
            </Badge>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        
        {/* Innovation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {innovations.map((innovation) => (
            <Card 
              key={innovation.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-elevated ${
                activeDemo === innovation.id 
                  ? getColorClasses(innovation.color) + " ring-2 ring-offset-2" 
                  : "hover:border-primary/50"
              }`}
              onClick={() => setActiveDemo(innovation.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <innovation.icon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="secondary">{innovation.status}</Badge>
                </div>
                <CardTitle className="text-lg">{innovation.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-3">
                  {innovation.description}
                </CardDescription>
                <div className="text-sm font-semibold text-primary">
                  {innovation.impact}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Demo Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Demo Display */}
          <div className="lg:col-span-2">
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {(() => {
                    const currentInnovation = innovations.find(i => i.id === activeDemo);
                    const IconComponent = currentInnovation?.icon;
                    return IconComponent ? <IconComponent className="h-6 w-6 text-primary" /> : null;
                  })()}
                  {innovations.find(i => i.id === activeDemo)?.title} - Live Demo
                </CardTitle>
                <CardDescription>
                  Interactive demonstration of {innovations.find(i => i.id === activeDemo)?.title.toLowerCase()} technology
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderActiveDemo()}
              </CardContent>
            </Card>
          </div>

          {/* Innovation Stats */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Technology Impact</CardTitle>
                <CardDescription>Real-world performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Processing Speed</span>
                  <span className="font-bold text-primary">&lt; 100ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Accuracy Rate</span>
                  <span className="font-bold text-safe">99.7%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Uptime</span>
                  <span className="font-bold text-safe">99.99%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Security Level</span>
                  <span className="font-bold text-primary">Military Grade</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Global Deployment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">28</div>
                    <div className="text-sm text-muted-foreground">Countries Deployed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent mb-1">500K+</div>
                    <div className="text-sm text-muted-foreground">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-safe mb-1">15</div>
                    <div className="text-sm text-muted-foreground">Language Support</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="text-primary">Future Roadmap</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Quantum encryption integration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Advanced biometric recognition</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-safe rounded-full"></div>
                    <span>Satellite communication backup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <span>Predictive weather modeling</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Research Partners */}
        <section className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-8">Research & Development Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="shadow-card">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">IIT Delhi</h3>
                <p className="text-sm text-muted-foreground">AI & Machine Learning Research</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-card">
              <CardContent className="p-6 text-center">
                <Lock className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">DRDO</h3>
                <p className="text-sm text-muted-foreground">Security & Encryption Technology</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-card">
              <CardContent className="p-6 text-center">
                <Globe className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">ISRO</h3>
                <p className="text-sm text-muted-foreground">Satellite Communication Systems</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-card">
              <CardContent className="p-6 text-center">
                <Brain className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">C-DAC</h3>
                <p className="text-sm text-muted-foreground">High-Performance Computing</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Innovation;