import { Button } from "@/components/ui/button";

export const MultilingualInterface = () => {
  const languages = ["English", "Hindi", "Spanish", "French", "German"];
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {languages.map((lang) => (
          <Button key={lang} variant="outline" size="sm">
            {lang}
          </Button>
        ))}
      </div>
      <div className="p-4 bg-accent/10 rounded">
        <p className="text-sm">Emergency Alert in selected language:</p>
        <p className="font-semibold mt-2">🚨 आपातकालीन सहायता भेजी गई है</p>
      </div>
    </div>
  );
};