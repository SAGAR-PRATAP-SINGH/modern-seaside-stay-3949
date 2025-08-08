import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Zap, 
  Wrench, 
  Hammer, 
  Paintbrush, 
  Vacuum, 
  HardHat, 
  Car, 
  TreePine,
  Search,
  ArrowRight
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

export default function Services() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const services = Object.entries(t.services.categories).map(([key, title]) => ({
    key,
    title,
    description: t.services.descriptions[key as keyof typeof t.services.descriptions],
    icon: serviceIcons[key as keyof typeof serviceIcons]
  }));

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Header Section */}
        <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-secondary/20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {t.services.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                {t.services.subtitle}
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-lg mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={`${t.common.search} ${t.services.title.toLowerCase()}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredServices.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Card 
                    key={service.key}
                    className="glass-card hover-scale transition-all duration-300 cursor-pointer border-0 group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader className="text-center pb-3">
                      <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <CardDescription className="text-center">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Button 
                        asChild 
                        className="w-full btn-primary"
                        size="sm"
                      >
                        <Link to={`/workers?service=${service.key}`}>
                          {t.nav.findWorker}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  No services found matching your search.
                </p>
                <Button
                  onClick={() => setSearchQuery("")}
                  variant="outline"
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 bg-primary/5">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Can't Find What You Need?
              </h2>
              <p className="text-muted-foreground mb-8">
                Contact us and we'll help you find the right professional for any job.
              </p>
              <Button asChild size="lg" className="btn-primary">
                <Link to="/contact">
                  {t.contact.title}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}