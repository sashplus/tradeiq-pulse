import { Button } from "@/components/ui/button";
import { CouncilIndicator } from "./CouncilIndicator";
import { Eye } from "lucide-react";
import type { CouncilData } from "@/types/council";

interface NewsCouncilBlockProps {
  council: CouncilData;
  onViewAnalysis?: () => void;
  compact?: boolean;
}

export function NewsCouncilBlock({
  council,
  onViewAnalysis,
  compact = false,
}: NewsCouncilBlockProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <CouncilIndicator
          verdict={council.verdict}
          agreement={council.agreement}
          modelCount={council.modelCount}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-3 py-2 px-3 bg-muted/50 rounded-lg border border-border/50">
      <div className="flex items-center gap-3">
        <CouncilIndicator
          verdict={council.verdict}
          agreement={council.agreement}
          modelCount={council.modelCount}
        />
        <span className="text-xs text-muted-foreground">
          AI Council consensus • {council.agreement}% agreement
        </span>
      </div>
      {onViewAnalysis && (
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onViewAnalysis();
          }}
          className="h-7 text-xs"
        >
          <Eye className="h-3 w-3 mr-1" />
          View Council Analysis
        </Button>
      )}
    </div>
  );
}
