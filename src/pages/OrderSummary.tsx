import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Briefcase,
  Star,
  Copy
} from "lucide-react";
import { format } from "date-fns";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

// Mock worker data
const mockWorker = {
  id: "1",
  name: "Rajesh Kumar",
  service: "electrician",
  rating: 4.8,
  experience: 8,
  location: "Sector 15, Gurgaon",
  price: "₹500-800/hour",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  phone: "+91 98765 43210",
  verified: true
};

export default function OrderSummary() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [bookingId] = useState(`EZ${Date.now().toString().slice(-6)}`);
  const { toast } = useToast();

  useEffect(() => {
    const bookingData = searchParams.get('booking');
    if (bookingData) {
      try {
        const details = JSON.parse(decodeURIComponent(bookingData));
        setBookingDetails(details);
      } catch (error) {
        console.error('Error parsing booking data:', error);
      }
    }
  }, [searchParams]);

  const copyBookingId = () => {
    navigator.clipboard.writeText(bookingId);
    toast({
      title: "Booking ID Copied",
      description: "Booking ID has been copied to clipboard",
    });
  };

  if (!bookingDetails) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">No Booking Found</h1>
            <Button asChild>
              <Link to="/services">Browse Services</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const bookingDate = new Date(bookingDetails.date);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-20">
        <div className="container max-w-4xl">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {t.orderSummary.title}
            </h1>
            <p className="text-muted-foreground">
              {t.orderSummary.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Booking Details */}
            <div className="space-y-6">
              {/* Booking ID */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {t.orderSummary.bookingId}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyBookingId}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-mono font-bold text-primary">
                    {bookingId}
                  </p>
                  <Badge className="mt-2" variant="default">
                    {t.orderSummary.confirmed}
                  </Badge>
                </CardContent>
              </Card>

              {/* Worker Details */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    {t.orderSummary.workerDetails}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={mockWorker.avatar} alt={mockWorker.name} />
                      <AvatarFallback>{mockWorker.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{mockWorker.name}</h3>
                      <p className="text-muted-foreground">
                        {t.services.categories.electrician}
                      </p>
                      <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm">{mockWorker.rating}</span>
                        <span className="text-muted-foreground text-sm ml-2">
                          ({mockWorker.experience} years)
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{mockWorker.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="font-medium">Phone: </span>
                      <span className="ml-1">{mockWorker.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Service Details */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Briefcase className="h-5 w-5 mr-2" />
                    {t.orderSummary.serviceDetails}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.orderSummary.service}</p>
                    <p className="font-medium">{t.services.categories.electrician}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Work Description</p>
                    <p className="font-medium">{bookingDetails.description}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Urgency Level</p>
                    <Badge variant="outline" className="capitalize">
                      {bookingDetails.urgency}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Information */}
            <div className="space-y-6">
              {/* Schedule */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>{t.orderSummary.bookingDetails}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-3 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">{t.orderSummary.date}</p>
                      <p className="font-medium">{format(bookingDate, "PPP")}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-3 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">{t.orderSummary.time}</p>
                      <p className="font-medium">{bookingDetails.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 text-primary mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">{t.orderSummary.location}</p>
                      <p className="font-medium">{bookingDetails.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cost Summary */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>{t.orderSummary.totalCost}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Service Cost</span>
                      <span>{bookingDetails.estimatedCost}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Platform Fee</span>
                      <span>₹50</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total Estimated</span>
                      <span className="text-primary">
                        {bookingDetails.estimatedCost.split('-')[0]}-{parseInt(bookingDetails.estimatedCost.split('-')[1].replace('₹','')) + 50}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    *Final cost may vary based on actual work completed
                  </p>
                </CardContent>
              </Card>

              {/* Status */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>{t.orderSummary.status}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-medium text-green-600 dark:text-green-400">
                      {t.orderSummary.confirmed}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    The worker will contact you shortly to confirm the appointment.
                  </p>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button asChild className="w-full btn-primary">
                  <Link to="/services">
                    Book Another Service
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/">
                    Return to Home
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}