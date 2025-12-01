export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="relative">
        {/* Outer static ring */}
        <div className="w-16 h-16 rounded-full border-4 border-neutral-200/60"></div>
        
        {/* Primary spinning ring */}
        <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div>
        
        {/* Accent spinning ring - opposite direction */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-accent-400 border-t-transparent animate-spin animation-delay-150"></div>
        
        {/* Center dot with pulse effect */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary-500 animate-pulse"></div>
      </div>
    </div>
  );
}