import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, CreditCard, Clock, HeartPulse } from "lucide-react";
import { toast } from "sonner";

export const TicketBooking = () => {
  const [searchParams] = useSearchParams();
  const [bookingType, setBookingType] = useState<string>("");
  const [visitors, setVisitors] = useState(1);
  const [kids, setKids] = useState(0);
  const [elderly, setElderly] = useState(0);
  const [medicalIssues, setMedicalIssues] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [selectedAttraction, setSelectedAttraction] = useState<string>("");

  useEffect(() => {
    const attraction = searchParams.get('attraction');
    if (attraction) {
      setSelectedAttraction(attraction);
      toast.success(`Pre-selected attraction: ${attraction}`, {
        duration: 3000,
      });
    }
  }, [searchParams]);

  const ticketTypes = [
    { 
      id: "individual", 
      name: "Individual Ticket", 
      price: 50, 
      description: "Single person entry with basic safety monitoring" 
    },
    { 
      id: "family", 
      name: "Family Package", 
      price: 40,   // price per person now
      description: "Up to 10 people allowed, ₹40 per person" 
    },
    { 
      id: "group", 
      name: "Group Tour", 
      price: 40, 
      description: "Per person (10+ people) with dedicated guide" 
    }
  ];

  const timeSlots = [
    { time: "09:00 AM", crowd: "Low", available: true },
    { time: "11:00 AM", crowd: "Medium", available: true },
    { time: "01:00 PM", crowd: "High", available: false },
    { time: "03:00 PM", crowd: "Medium", available: true },
    { time: "05:00 PM", crowd: "Low", available: true }
  ];

  const handleBooking = () => {
    if (!bookingType || !selectedSlot) {
      toast.error("Please select ticket type and time slot");
      return;
    }

    const selectedTicket = ticketTypes.find(t => t.id === bookingType);
    let totalPrice = 0;

    if (selectedTicket) {
      if (bookingType === "individual") {
        totalPrice = selectedTicket.price * visitors;
      } else if (bookingType === "family") {
        totalPrice = selectedTicket.price * visitors;
      } else if (bookingType === "group") {
        totalPrice = selectedTicket.price * visitors;
      }
    }

    toast.success(`🎫 Booking confirmed! Total: ₹${totalPrice}. RFID bands will be assigned at entry.`, {
      duration: 4000,
    });
  };

  const getCrowdBadgeVariant = (crowd: string) => {
    switch (crowd) {
      case "High": return "destructive";
      case "Medium": return "default";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Pre-selected Attraction */}
      {selectedAttraction && (
        <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
          <h3 className="font-semibold text-primary mb-1">Selected Attraction</h3>
          <p className="text-sm">{selectedAttraction}</p>
        </div>
      )}
      
      {/* Ticket Type Selection */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Select Ticket Type</Label>
        <div className="space-y-3">
          {ticketTypes.map((ticket) => (
            <Card
              key={ticket.id}
              className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                bookingType === ticket.id ? "border-primary bg-primary/5" : ""
              }`}
              onClick={() => {
                setBookingType(ticket.id);
                setVisitors(1);
              }}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{ticket.name}</h3>
                    <p className="text-sm text-muted-foreground">{ticket.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">₹{ticket.price}</div>
                    <div className="text-xs text-muted-foreground">
                      {ticket.id === "group" ? "per person" : ticket.id === "family" ? "per person" : "per ticket"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Number of Visitors (for family & group only) */}
      {(bookingType === "family" || bookingType === "group") && (
        <div>
          <Label htmlFor="visitors" className="text-sm font-medium">Number of Visitors</Label>
          <div className="flex items-center gap-3 mt-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <Input
              id="visitors"
              type="number"
              min={bookingType === "group" ? "10" : "1"}
              max={bookingType === "family" ? "10" : "50"}
              value={visitors}
              onChange={(e) => setVisitors(parseInt(e.target.value) || 1)}
              className="w-24"
            />
            <span className="text-sm text-muted-foreground">
              {bookingType === "group" ? "Min 10 required" : "Max 10 allowed"}
            </span>
          </div>
        </div>
      )}

      {/* Kids, Elderly & Medical Issues (family or group only) */}
      {(bookingType === "family" || bookingType === "group") && (
        <Card>
          <CardContent className="p-4 space-y-4">
            <div>
              <Label className="text-sm font-medium">Number of Kids</Label>
              <Input
                type="number"
                min="0"
                value={kids}
                onChange={(e) => setKids(parseInt(e.target.value) || 0)}
                className="mt-1 w-24"
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Number of Elderly People</Label>
              <Input
                type="number"
                min="0"
                value={elderly}
                onChange={(e) => setElderly(parseInt(e.target.value) || 0)}
                className="mt-1 w-24"
              />
            </div>
            <div>
              <Label className="text-sm font-medium flex items-center gap-2">
                <HeartPulse className="h-4 w-4 text-muted-foreground" />
                Medical Issues (if any)
              </Label>
              <textarea
                value={medicalIssues}
                onChange={(e) => setMedicalIssues(e.target.value)}
                className="mt-2 w-full border rounded-md p-2 text-sm"
                rows={3}
                placeholder="E.g. Diabetes, Heart condition, Asthma..."
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Time Slot Selection */}
      <div>
        <Label className="text-sm font-medium mb-3 block flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Select Time Slot
        </Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {timeSlots.map((slot, index) => (
            <Button
              key={index}
              variant={selectedSlot === slot.time ? "default" : "outline"}
              className="justify-between h-auto p-3"
              disabled={!slot.available}
              onClick={() => slot.available && setSelectedSlot(slot.time)}
            >
              <div className="text-left">
                <div className="font-semibold">{slot.time}</div>
                <div className="text-xs opacity-80">
                  {slot.available ? "Available" : "Full"}
                </div>
              </div>
              <Badge variant={getCrowdBadgeVariant(slot.crowd)} className="ml-2">
                {slot.crowd}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* Booking Summary */}
      {bookingType && selectedSlot && (
        <Card className="border-l-4 border-l-primary bg-primary/5">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Booking Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Ticket Type:</span>
                <span className="font-semibold">{ticketTypes.find(t => t.id === bookingType)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Time Slot:</span>
                <span className="font-semibold">{selectedSlot}</span>
              </div>
              <div className="flex justify-between">
                <span>Visitors:</span>
                <span className="font-semibold">
                  {visitors} {visitors === 1 ? "person" : "people"}
                </span>
              </div>

              {(bookingType === "family" || bookingType === "group") && (
                <>
                  <div className="flex justify-between">
                    <span>Kids:</span>
                    <span className="font-semibold">{kids}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Elderly:</span>
                    <span className="font-semibold">{elderly}</span>
                  </div>
                  {medicalIssues && (
                    <div className="flex justify-between">
                      <span>Medical Issues:</span>
                      <span className="font-semibold text-red-600">{medicalIssues}</span>
                    </div>
                  )}
                </>
              )}

              <div className="flex justify-between border-t pt-2 font-semibold text-primary">
                <span>Total Amount:</span>
                <span>
                  ₹{ticketTypes.find(t => t.id === bookingType)?.price! * visitors}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Book Button */}
      <Button 
        onClick={handleBooking} 
        className="w-full bg-gradient-primary"
        disabled={!bookingType || !selectedSlot}
      >
        <CreditCard className="h-4 w-4 mr-2" />
        Book Tickets & Assign RFID Bands
      </Button>

      {/* Info Note */}
      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <strong>Note:</strong> RFID-enabled smart bands will be provided at entry for real-time location tracking and emergency response. 
        Pricing varies based on crowd levels to encourage off-peak visits.
      </div>
    </div>
  );
};

