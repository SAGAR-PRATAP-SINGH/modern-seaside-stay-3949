import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Zap, 
  Wrench, 
  Hammer, 
  Paintbrush, 
  Vacuum, 
  HardHat, 
  Car, 
  TreePine,
  ArrowRight,
  Star,
  Shield,
  Clock,
  MapPin
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const serviceIcons = {
  electrician: Zap,
  plumber: Wrench,
  carpenter: Hammer,
  painter: Paintbrush,
  cleaner: Vacuum,
  laborer: HardHat,
  mechanic: Car,
  gardener: TreePine
};

export default function Home() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = Object.entries(t.services.categories).map(([key, title]) => ({
    key,
    title,
    description: t.services.descriptions[key as keyof typeof t.services.descriptions],
    icon: serviceIcons[key as keyof typeof serviceIcons]
  }));

  const features = [
    {
      icon: Shield,
      title: "Verified Workers",
      description: "All workers are background checked and verified for your safety and peace of mind."
    },
    {
      icon: Clock,
      title: "Quick Response",
      description: "Get connected with available workers in your area within minutes of booking."
    },
    {
      icon: Star,
      title: "Quality Service",
      description: "Rated workers with proven track records and positive customer reviews."
    },
    {
      icon: MapPin,
      title: "Local Professionals",
      description: "Find skilled workers right in your neighborhood for immediate assistance."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/20 overflow-hidden">
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="animate-fade-in">
                <span className="text-sm text-primary font-medium uppercase tracking-wider mb-4 block">
                  {t.hero.subtitle}
                </span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  {t.hero.title}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  {t.hero.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button asChild size="lg" className="btn-primary">
                    <Link to="/services">
                      {t.hero.findWorker} <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/auth?type=worker">
                      {t.hero.becomeWorker}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary/50 blur-3xl animate-pulse" />
            <div className="absolute bottom-10 right-40 w-48 h-48 rounded-full bg-secondary blur-3xl animate-pulse [animation-delay:2s]" />
          </div>
        </section>

        {/* Services Section */}
        <section className="section bg-card/30">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t.services.title}
              </h2>
              <p className="text-muted-foreground text-lg">
                {t.services.subtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Card 
                    key={service.key} 
                    className="glass-card hover-scale transition-all duration-300 cursor-pointer border-0 group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader className="text-center pb-2">
                      <div className="mx-auto mb-3 p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-center text-sm">
                        {service.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild className="btn-primary">
                <Link to="/services">
                  {t.common.viewAll} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Why Choose Eazy?
                </h2>
                <p className="text-muted-foreground mb-8">
                  We make it simple to connect with trusted professionals in your area. 
                  Our platform ensures quality, reliability, and peace of mind for every service.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <div 
                      key={index}
                      className="flex items-start space-x-3 animate-fade-in"
                      style={{ animationDelay: `${(index + 1) * 200}ms` }}
                    >
                      <div className="p-2 rounded-full bg-primary/10">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative animate-fade-in [animation-delay:300ms]">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1581092795442-36d480d5bb8e?w=600&h=600&fit=crop"
                    alt="Professional worker" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-2/3 rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop"
                    alt="Quality work" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-6 -right-6 w-1/2 rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&h=200&fit=crop"
                    alt="Professional tools" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 bg-primary/5">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of satisfied customers who trust Eazy for their service needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="btn-primary">
                  <Link to="/services">{t.hero.findWorker}</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/auth?type=worker">{t.hero.becomeWorker}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}