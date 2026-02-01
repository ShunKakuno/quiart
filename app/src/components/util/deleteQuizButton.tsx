import { useState } from "react"
import { useDeleteQuiz } from "@/lib/hooks/useDelete"
import { DeleteConfirmModal } from "@/components/modal/deleteConfirmModal"

type Props = {
  id: number
  className?: string
}

export function DeleteQuizButton({ id, className }: Props) {
  const deleteQuiz = useDeleteQuiz()
  const [open, setOpen] = useState(false)

  const handleDelete = () => {
    deleteQuiz.mutate(id)
    setOpen(false)
  }

  return (
    <>
      <button
        className={className}
        onClick={() => setOpen(true)}
      >
        ✖
      </button>

      <DeleteConfirmModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  )
}
