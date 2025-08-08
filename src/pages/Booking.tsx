import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  CalendarIcon, 
  Clock, 
  MapPin, 
  ArrowLeft,
  Star,
  Shield
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";

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
  skills: ["Wiring", "Home Automation", "Repairs"],
  verified: true
};

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
  "05:00 PM", "06:00 PM", "07:00 PM"
];

export default function Booking() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState("medium");
  const [worker] = useState(mockWorker);

  const estimatedCost = urgency === "emergency" ? "₹1000-1500" : 
                      urgency === "high" ? "₹700-1000" :
                      urgency === "medium" ? "₹500-800" : "₹400-600";

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !location || !description) {
      alert("Please fill all required fields");
      return;
    }
    
    // Navigate to order summary with booking details
    const bookingDetails = {
      workerId: worker.id,
      date: selectedDate.toISOString(),
      time: selectedTime,
      location,
      description,
      urgency,
      estimatedCost
    };
    
    navigate(`/order-summary?booking=${encodeURIComponent(JSON.stringify(bookingDetails))}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-20">
        <div className="container max-w-4xl">
          <div className="mb-6">
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/workers">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Workers
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Worker Info Card */}
            <div className="lg:col-span-1">
              <Card className="glass-card sticky top-24">
                <CardHeader>
                  <CardTitle>{t.workers.viewProfile}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={worker.avatar} alt={worker.name} />
                      <AvatarFallback>{worker.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold flex items-center">
                        {worker.name}
                        {worker.verified && (
                          <Shield className="h-4 w-4 ml-2 text-green-500" />
                        )}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {t.services.categories.electrician}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-medium">{worker.rating}</span>
                    </div>
                    <span className="text-muted-foreground">
                      {worker.experience} {t.workers.years}
                    </span>
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
                    <p className="font-semibold text-primary">{worker.price}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-2">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-2xl">{t.booking.title}</CardTitle>
                  <CardDescription>{t.booking.subtitle}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Date Selection */}
                  <div className="space-y-2">
                    <Label>{t.booking.selectDate} *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !selectedDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time Selection */}
                  <div className="space-y-2">
                    <Label>{t.booking.selectTime} *</Label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTime(time)}
                          className="text-xs"
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location">{t.booking.location} *</Label>
                    <Input
                      id="location"
                      type="text"
                      placeholder="Enter your complete address"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>

                  {/* Work Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">{t.booking.description} *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the work you need done..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                    />
                  </div>

                  {/* Urgency Level */}
                  <div className="space-y-3">
                    <Label>{t.booking.urgency}</Label>
                    <RadioGroup value={urgency} onValueChange={setUrgency}>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="low" id="low" />
                          <Label htmlFor="low">{t.booking.low}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="medium" id="medium" />
                          <Label htmlFor="medium">{t.booking.medium}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="high" id="high" />
                          <Label htmlFor="high">{t.booking.high}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="emergency" id="emergency" />
                          <Label htmlFor="emergency">{t.booking.emergency}</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Estimated Cost */}
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{t.booking.estimatedCost}:</span>
                      <span className="text-lg font-semibold text-primary">
                        {estimatedCost}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => navigate(-1)}
                    >
                      {t.booking.cancel}
                    </Button>
                    <Button
                      className="flex-1 btn-primary"
                      onClick={handleBooking}
                    >
                      {t.booking.confirm}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}