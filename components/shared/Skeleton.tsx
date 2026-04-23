export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-3 flex flex-col h-full animate-pulse">
      <div className="aspect-square rounded-lg bg-gray-100 mb-4" />
      <div className="h-4 bg-gray-100 rounded-md w-3/4 mb-2" />
      <div className="h-4 bg-gray-100 rounded-md w-1/2 mb-4" />
      <div className="mt-auto pt-2 border-t border-gray-50 flex justify-between items-center">
        <div className="h-3 bg-gray-50 rounded-md w-1/3" />
        <div className="w-6 h-6 bg-gray-50 rounded-full" />
      </div>
    </div>
  );
}

export function ProductPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="h-4 bg-gray-100 rounded-md w-48 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div className="aspect-square bg-gray-100 rounded-2xl" />
        <div className="space-y-6">
          <div className="h-8 bg-gray-100 rounded-md w-3/4" />
          <div className="h-4 bg-gray-100 rounded-md w-1/4" />
          <div className="h-20 bg-gray-100 rounded-md w-full" />
          <div className="h-12 bg-gray-100 rounded-md w-1/2" />
        </div>
      </div>
    </div>
  );
}
