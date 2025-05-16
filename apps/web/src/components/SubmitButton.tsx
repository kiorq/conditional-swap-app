const SubmitButton = () => {
  return (
    <button
      role="button"
      aria-label="Submit"
      className="flex flex-row items-center gap-2 bg-green-600 rounded-lg py-2 px-10 text-base font-semibold text-white cursor-pointer hover:bg-green-700"
    >
      Submit
    </button>
  );
};

export default SubmitButton;
