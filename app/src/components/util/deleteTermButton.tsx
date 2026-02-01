import { useState } from "react"
import { useDeleteTerm } from "@/lib/hooks/useDelete"
import { DeleteConfirmModal } from "@/components/modal/deleteConfirmModal"

type Props = {
  id: number
  className?: string
}

export function DeleteTermButton({ id, className }: Props) {
  const deleteTerm = useDeleteTerm()
  const [open, setOpen] = useState(false)

  const handleDelete = () => {
    deleteTerm.mutate(id)
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
