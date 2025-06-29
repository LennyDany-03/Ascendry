"use client"

import { X, AlertTriangle, Trash2 } from "lucide-react"

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Delete", type = "danger" }) => {
  if (!isOpen) return null

  const getButtonStyles = () => {
    switch (type) {
      case "danger":
        return "bg-red-500 hover:bg-red-600 text-white"
      case "warning":
        return "bg-yellow-500 hover:bg-yellow-600 text-white"
      default:
        return "bg-blue-500 hover:bg-blue-600 text-white"
    }
  }

  const getIcon = () => {
    switch (type) {
      case "danger":
        return <Trash2 className="w-6 h-6 text-red-400" />
      default:
        return <AlertTriangle className="w-6 h-6 text-yellow-400" />
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998] flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700/50 rounded-2xl w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            {getIcon()}
            <h3 className="text-lg font-bold text-white">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-lg flex items-center justify-center transition-colors duration-300"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-300 mb-6">{message}</p>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 text-gray-300 hover:text-white rounded-xl font-medium transition-all duration-300"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm()
                onClose()
              }}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${getButtonStyles()}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
