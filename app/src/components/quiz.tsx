import { useQuiz } from "@/features/quiz/useQuiz"

export function Quiz() {
  const { data, isLoading } = useQuiz()

  return (
    <>
      {!isLoading ? (
        <ul>
          {data!.map(q => (
            <li key={q.id}>
              {q.title} ({q.tag})
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}
