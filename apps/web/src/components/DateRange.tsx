import { Calendar } from "lucide-react";

const DateRange = () => {
  return (
    <div>
      <div
        role="button"
        aria-label="As Soon As Possible"
        className="flex flex-row items-center gap-2 bg-gray-900 rounded-lg py-3 px-6 text-sm text-gray-400 cursor-pointer hover:bg-gray-800 hover:text-white"
      >
        <Calendar className="w-4 h-4" />
        <p>As Soon As Possible</p>
      </div>
    </div>
  );
};

export default DateRange;
