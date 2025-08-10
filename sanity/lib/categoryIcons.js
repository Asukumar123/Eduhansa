import {
  Book,           // For UPSC – symbol of study and administration
  Cpu,            // For Computer Science
  Calculator,     // For IIT JEE – math/science focus
  Wrench,         // For GATE – engineering tool
  HeartPulse,     // For NEET – medical/healthcare
  ClipboardList,  // For Other Exams – SSC, Banking, etc.
  Clock,          // Default fallback icon
} from "lucide-react";

export function getCategoryIcon(category) {
  switch (category?.toLowerCase()) {
    case "upsc":
      return <Book className="h-5 w-5" />;
    case "computer science":
      return <Cpu className="h-5 w-5" />;
    case "iit jee":
      return <Calculator className="h-5 w-5" />;
    case "gate":
      return <Wrench className="h-5 w-5" />;
    case "neet":
      return <HeartPulse className="h-5 w-5" />;
    case "other exams":
      return <ClipboardList className="h-5 w-5" />;
    default:
      return <Clock className="h-5 w-5" />;
  }
}
