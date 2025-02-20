const SectionSelector = ({ onSelect }) => {
  return (
    <div className=" flex justify-center items-center h-screen w-screen">
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg text-center">
        <h2 className="text-xl font-bold mb-4">Choose a Quiz Section</h2>
        <div className="space-x-4">
          <button
            onClick={() => onSelect("multiple-choice")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Multiple Choice
          </button>
          <button
            onClick={() => onSelect("integer")}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Integer Type
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionSelector;
