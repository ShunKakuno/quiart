import styles from "@/css/deleteConfirmModal.module.css"

type Props = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DeleteConfirmModal({ isOpen, onClose, onConfirm }: Props) {
  if (!isOpen) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>削除して問題ないですか？</p>
        <div className={styles.actions}>
          <button onClick={onClose}>キャンセル</button>
          <button onClick={onConfirm}>削除する</button>
        </div>
      </div>
    </div>
  )
}
