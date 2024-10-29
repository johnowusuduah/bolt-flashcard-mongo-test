"use client";

import { useState, useEffect } from "react";
import { Flashcard } from "@/components/ui/flashcard";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface StudySessionProps {
  subjectId: string;
  userId: string;
  onComplete: () => void;
}

export function StudySession({ subjectId, userId, onComplete }: StudySessionProps) {
  const [cards, setCards] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    fetchDueCards();
  }, [subjectId]);

  async function fetchDueCards() {
    try {
      const response = await fetch(
        `/api/flashcards?subjectId=${subjectId}&userId=${userId}&dueOnly=true`
      );
      const data = await response.json();
      setCards(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch flashcards",
        variant: "destructive",
      });
    }
  }

  async function handleRate(quality: number) {
    try {
      await fetch(`/api/flashcards/${cards[currentIndex].id}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quality, userId }),
      });

      if (currentIndex === cards.length - 1) {
        onComplete();
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save review",
        variant: "destructive",
      });
    }
  }

  if (cards.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-semibold mb-4">No cards due for review!</h3>
        <Button onClick={onComplete}>Back to Subjects</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Card {currentIndex + 1} of {cards.length}
        </h2>
        <Button variant="outline" onClick={onComplete}>
          End Session
        </Button>
      </div>
      <Progress value={(currentIndex / cards.length) * 100} />
      <Flashcard
        front={cards[currentIndex].front}
        back={cards[currentIndex].back}
        onRate={handleRate}
      />
    </div>
  );
}