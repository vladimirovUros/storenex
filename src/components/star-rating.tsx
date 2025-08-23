import { StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const MAX_RATING = 5;
const MIN_RATING = 0;

interface StarRatingProps {
  rating: number;
  className?: string;
  iconClassName?: string;
  text?: string;
}

export const StarRating = ({
  rating,
  className,
  iconClassName,
  text,
}: StarRatingProps) => {
  const safeRating = Math.max(MIN_RATING, Math.min(rating, MAX_RATING));

  const getStarState = (starIndex: number) => {
    const starPosition = starIndex + 1;

    if (safeRating >= starPosition) {
      return { type: "full", percentage: 100 };
    } else if (safeRating > starPosition - 1) {
      const percentage = (safeRating - (starPosition - 1)) * 100;
      return { type: "partial", percentage: Math.round(percentage) };
    } else {
      return { type: "empty", percentage: 0 };
    }
  };

  return (
    <div className={cn("flex items-center gap-x-1", className)}>
      {Array.from({ length: MAX_RATING }).map((_, index) => {
        const starState = getStarState(index);

        return (
          <div key={index} className="relative inline-block">
            <StarIcon className={cn("size-4 text-gray-300", iconClassName)} />
            {starState.type !== "empty" && (
              <div
                className="absolute top-0 left-0 overflow-hidden"
                style={{
                  width: `${starState.percentage}%`,
                  height: "100%",
                }}
              >
                <StarIcon
                  className={cn(
                    "size-4 fill-yellow-500 text-yellow-500",
                    iconClassName
                  )}
                />
              </div>
            )}
          </div>
        );
      })}
      {text && (
        <span className="text-sm text-gray-500">
          {text} ({safeRating})
        </span>
      )}
    </div>
  );
};

export default StarRating;
