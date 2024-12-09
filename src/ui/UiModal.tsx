import { CSSProperties, ReactNode, useRef } from "react";

interface UIModalProps {
  children?: ReactNode;
  onClose?: () => void;
  style?: CSSProperties;
  showAnimation?: boolean;
}

export default function UIModal({
  children,
  onClose,
  style,
  showAnimation,
}: UIModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleCancel = () => {
    if (!showAnimation) return onClose?.();

    modalRef.current?.classList.add("opacity-0", "translate-y-10");
    setTimeout(() => onClose?.(), 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`relative bg-white rounded-lg shadow-lg transform transition-all duration-300 ${
          showAnimation ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={style}
        ref={modalRef}
      >
        <button
          className="absolute top-[10rem] right-[10rem] text-gray-200 hover:text-gray-700 cursor-pointer text-4xl"
          onClick={handleCancel}
          aria-label="Close Modal"
        >
          <i className="fa-solid fa-times"></i>
        </button>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
