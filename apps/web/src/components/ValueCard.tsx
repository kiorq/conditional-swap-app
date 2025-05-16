const ValueCard = ({ value, label }: { value: number; label: string }) => {
  return (
    <div className="flex gap-2 flex-col px-6 py-6 bg-gray-900 rounded-lg w-fit justify-center items-center">
      <p className="text-5xl font-medium font-mono">{value}</p>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  );
};

export default ValueCard;
