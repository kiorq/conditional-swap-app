import { Calendar, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const DateRange = ({
  onChange,
}: {
  onChange: ({}: { startDate: Date; endDate: Date }) => void;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on outside click
  useEffect(() => {
    if (!modalOpen) return;
    function handleClick(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setModalOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [modalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (from && to) {
      onChange({ startDate: new Date(from), endDate: new Date(to) });

      setModalOpen(false);
    }
  };

  return (
    <div>
      <div
        role="button"
        aria-label="Select Date Range"
        className="flex flex-row justify-center items-center gap-2 bg-gray-900 rounded-lg py-3 px-6 text-sm text-gray-400 cursor-pointer hover:bg-gray-800 hover:text-white"
        onClick={() => setModalOpen(true)}
      >
        <Calendar className="w-4 h-4" />
        {from && to ? (
          <p>
            {from} - {to}
          </p>
        ) : (
          <p>Select Date Range</p>
        )}
      </div>
      {modalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/10 backdrop-blur-sm">
          <div
            ref={modalRef}
            className="bg-gray-900 border border-gray-700 rounded-xl shadow-xl p-8 w-full max-w-xs flex flex-col gap-4 relative justify-center items-center"
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-white"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold text-white mb-2">
              Select Date Range
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">From Date</label>
                <input
                  type="date"
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">To Date</label>
                <input
                  type="date"
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg py-2 transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRange;
