"use client";

import { useEffect, useState } from "react";
import { SubjectGrid } from "@/components/subjects/subject-grid";
import { StudySession } from "@/components/study/study-session";

// Temporary user ID for demo purposes
const DEMO_USER_ID = "demo-user";

export default function Home() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  useEffect(() => {
    fetchSubjects();
  }, []);

  async function fetchSubjects() {
    try {
      const response = await fetch(`/api/subjects?userId=${DEMO_USER_ID}`);
      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error("Failed to fetch subjects:", error);
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {selectedSubject ? (
        <StudySession
          subjectId={selectedSubject}
          userId={DEMO_USER_ID}
          onComplete={() => {
            setSelectedSubject(null);
            fetchSubjects();
          }}
        />
      ) : (
        <>
          <h1 className="text-4xl font-bold mb-8">Your Study Decks</h1>
          <SubjectGrid
            subjects={subjects}
            onSubjectClick={(subjectId) => setSelectedSubject(subjectId)}
          />
        </>
      )}
    </main>
  );
}