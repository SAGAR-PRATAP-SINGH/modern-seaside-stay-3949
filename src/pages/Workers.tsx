import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Star, 
  MapPin, 
  Clock,
  Phone,
  Shield,
  Filter
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock worker data
const mockWorkers = [
  {
    id: "1",
    name: "Rajesh Kumar",
    service: "electrician",
    rating: 4.8,
    experience: 8,
    location: "Sector 15, Gurgaon",
    price: "₹500-800/hour",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    skills: ["Wiring", "Home Automation", "Repairs"],
    available: true,
    verified: true
  },
  {
    id: "2", 
    name: "Suresh Sharma",
    service: "plumber",
    rating: 4.6,
    experience: 12,
    location: "Lajpat Nagar, Delhi",
    price: "₹400-600/hour",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    skills: ["Pipe Fitting", "Bathroom Work", "Water Heater"],
    available: true,
    verified: true
  },
  {
    id: "3",
    name: "Amit Singh",
    service: "carpenter",
    rating: 4.9,
    experience: 15,
    location: "Karol Bagh, Delhi",
    price: "₹600-1000/hour",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    skills: ["Furniture Making", "Interior Work", "Repairs"],
    available: false,
    verified: true
  },
  {
    id: "4",
    name: "Ravi Patel",
    service: "painter",
    rating: 4.5,
    experience: 6,
    location: "Bandra, Mumbai",
    price: "₹300-500/hour",
    avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop",
    skills: ["Wall Painting", "Exterior Paint", "Texture Work"],
    available: true,
    verified: true
  }
];

export default function Workers() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [selectedService, setSelectedService] = useState<string>("all");
  const [workers, setWorkers] = useState(mockWorkers);

  useEffect(() => {
    const service = searchParams.get('service');
    if (service) {
      setSelectedService(service);
    }
  }, [searchParams]);

  const filteredWorkers = selectedService === "all" 
    ? workers 
    : workers.filter(worker => worker.service === selectedService);

  const getServiceName = (serviceKey: string) => {
    return t.services.categories[serviceKey as keyof typeof t.services.categories] || serviceKey;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Header Section */}
        <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-secondary/20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {t.workers.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t.workers.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-6 border-b bg-card/30">
          <div className="container">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                {t.common.filter}
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedService === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedService("all")}
                >
                  All Services
                </Button>
                {Object.entries(t.services.categories).map(([key, name]) => (
                  <Button
                    key={key}
                    variant={selectedService === key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedService(key)}
                  >
                    {name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Workers Grid */}
        <section className="section">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkers.map((worker, index) => (
                <Card 
                  key={worker.id}
                  className="glass-card hover-scale transition-all duration-300 border-0"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={worker.avatar} alt={worker.name} />
                          <AvatarFallback>{worker.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <CardTitle className="text-lg flex items-center">
                            {worker.name}
                            {worker.verified && (
                              <Shield className="h-4 w-4 ml-2 text-green-500" />
                            )}
                          </CardTitle>
                          <CardDescription>
                            {getServiceName(worker.service)}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge 
                        variant={worker.available ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {worker.available ? t.workers.available : t.workers.busy}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="font-medium">{worker.rating}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{worker.experience} {t.workers.years}</span>
                      </div>
                    </div>

                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span>{worker.location}</span>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">{t.workers.skills}:</p>
                      <div className="flex flex-wrap gap-1">
                        {worker.skills.map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-primary">{worker.price}</span>
                        <Button size="sm" variant="outline">
                          <Phone className="h-3 w-3 mr-1" />
                          Call
                        </Button>
                      </div>
                      
                      <Button 
                        asChild 
                        className="w-full btn-primary" 
                        disabled={!worker.available}
                      >
                        <Link to={`/booking?worker=${worker.id}`}>
                          {t.workers.bookNow}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredWorkers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  No workers found for the selected service.
                </p>
                <Button
                  onClick={() => setSelectedService("all")}
                  variant="outline"
                >
                  View All Workers
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}