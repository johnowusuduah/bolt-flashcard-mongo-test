"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FlashcardProps {
  front: string;
  back: string;
  onRate: (quality: number) => void;
}

export function Flashcard({ front, back, onRate }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="perspective-1000 w-full max-w-2xl mx-auto">
      <Card
        className={cn(
          "w-full h-[400px] cursor-pointer transition-transform duration-500 transform-style-preserve-3d",
          isFlipped && "rotate-y-180"
        )}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="absolute inset-0 backface-hidden">
          <div className="h-full flex items-center justify-center p-6 text-center">
            <h3 className="text-2xl font-semibold">{front}</h3>
          </div>
        </div>
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div className="h-full flex flex-col items-center justify-between p-6">
            <div className="flex-1 flex items-center justify-center text-center">
              <p className="text-xl">{back}</p>
            </div>
            <div className="flex gap-2 mt-4">
              {[0, 1, 2, 3, 4, 5].map((quality) => (
                <button
                  key={quality}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRate(quality);
                  }}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    "hover:bg-primary hover:text-primary-foreground",
                    "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                    quality < 3
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : quality < 4
                      ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  )}
                >
                  {quality}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}