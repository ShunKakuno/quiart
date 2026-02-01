import { useState } from "react"
import { useDeleteArticle } from "@/lib/hooks/useDelete"
import { DeleteConfirmModal } from "@/components/modal/deleteConfirmModal"

type Props = {
  id: number
  className?: string
}

export function DeleteArticleButton({ id, className }: Props) {
  const deleteArticle = useDeleteArticle()
  const [open, setOpen] = useState(false)

  const handleDelete = () => {
    deleteArticle.mutate(id)
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
