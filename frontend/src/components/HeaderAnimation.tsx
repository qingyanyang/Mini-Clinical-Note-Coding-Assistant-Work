const HeaderAnimation = () => {
  return (
    <div>
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 shadow-2xl animate-pulse"></div>
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-emerald-300 to-blue-400 opacity-70"></div>
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-emerald-200 to-blue-300 opacity-50"></div>
        </div>
      </div>
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-semibold text-gray-900">
          Good Afternoon, Doctor
        </h1>
        <p className="text-2xl text-gray-700">
          What's on{" "}
          <span className="text-emerald-600 font-medium">your mind?</span>
        </p>
      </div>
    </div>
  );
};

export default HeaderAnimation;
