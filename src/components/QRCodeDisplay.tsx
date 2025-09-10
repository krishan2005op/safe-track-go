import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Shield, Calendar, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

interface QRCodeDisplayProps {
  touristId: string;
}

export const QRCodeDisplay = ({ touristId }: QRCodeDisplayProps) => {
  const generateQRPattern = () => {
    // Generate a simple QR-like pattern for demonstration
    const size = 15;
    const pattern = [];
    
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        // Create a pseudo-random but deterministic pattern
        const seed = (i * j + i + j) % 3;
        row.push(seed === 0);
      }
      pattern.push(row);
    }
    
    return pattern;
  };

  const qrPattern = generateQRPattern();

  const touristInfo = {
    name: "Alex Johnson",
    nationality: "India",
    group: "Adventure Group #47",
    emergencyContact: "+91-9876543210",
    checkIn: "09:30 AM",
    expectedReturn: "06:00 PM"
  };

  const handleScanSimulation = () => {
    toast.success(`✅ QR Code scanned! Tourist ID: ${touristId} verified successfully.`, {
      duration: 3000,
    });
  };

  const handleShareId = () => {
    toast.info(`📤 Tourist ID ${touristId} shared with emergency contacts and guide.`);
  };

  return (
    <div className="space-y-4">
      {/* QR Code Display */}
      <Card className="shadow-card">
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold mb-4">Digital Tourist ID</h3>
          
          {/* QR Code Pattern */}
          <div className="mx-auto mb-4 p-4 bg-white rounded-lg shadow-inner border">
            <div className="grid grid-cols-15 gap-px bg-gray-200 p-2 rounded">
              {qrPattern.map((row, i) => 
                row.map((cell, j) => (
                  <div
                    key={`${i}-${j}`}
                    className={`w-2 h-2 ${cell ? 'bg-black' : 'bg-white'}`}
                  />
                ))
              )}
            </div>
          </div>
          
          <div className="text-center">
            <Badge variant="secondary" className="mb-2">
              ID: {touristId}
            </Badge>
            <p className="text-sm text-muted-foreground">
              Scan for instant verification and emergency information
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Tourist Information */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            <span className="text-sm">Tourist Name</span>
          </div>
          <span className="text-sm font-semibold">{touristInfo.name}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm">Nationality</span>
          </div>
          <span className="text-sm font-semibold">{touristInfo.nationality}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm">Group</span>
          </div>
          <span className="text-sm font-semibold">{touristInfo.group}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-primary" />
            <span className="text-sm">Emergency Contact</span>
          </div>
          <span className="text-sm font-semibold">{touristInfo.emergencyContact}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-sm">Check-in Time</span>
          </div>
          <span className="text-sm font-semibold">{touristInfo.checkIn}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-sm">Expected Return</span>
          </div>
          <span className="text-sm font-semibold">{touristInfo.expectedReturn}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <Button 
          variant="default" 
          className="w-full" 
          onClick={handleScanSimulation}
        >
          Simulate QR Scan
        </Button>
        
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" onClick={handleShareId}>
            Share ID
          </Button>
          <Button variant="outline" size="sm">
            Update Info
          </Button>
        </div>
      </div>

      {/* Security Features */}
      <div className="p-3 bg-safe/10 rounded-lg border border-safe/20">
        <h4 className="font-semibold text-sm mb-2 text-safe">Security Features</h4>
        <div className="space-y-1 text-xs text-safe">
          <p>✓ Blockchain verified identity</p>
          <p>✓ Encrypted emergency data</p>
          <p>✓ Real-time location tracking</p>
          <p>✓ Automatic check-in/check-out</p>
        </div>
      </div>
    </div>
  );
};