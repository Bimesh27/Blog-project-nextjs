const LoadingDots = () => {
  return (
    <div className="flex space-x-2 animate-pulse justify-center w-full items-center">
      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
    </div>
  );
};

export default LoadingDots;