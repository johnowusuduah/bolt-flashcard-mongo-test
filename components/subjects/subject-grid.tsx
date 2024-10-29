import { SubjectCard } from "@/components/subjects/subject-card";

interface Subject {
  id: string;
  name: string;
  description: string;
  totalCards: number;
  dueCards: number;
}

interface SubjectGridProps {
  subjects: Subject[];
  onSubjectClick: (subjectId: string) => void;
}

export function SubjectGrid({ subjects, onSubjectClick }: SubjectGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {subjects.map((subject) => (
        <SubjectCard
          key={subject.id}
          {...subject}
          onClick={() => onSubjectClick(subject.id)}
        />
      ))}
    </div>
  );
}