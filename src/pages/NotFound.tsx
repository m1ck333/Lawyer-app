const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-full">
      <div className="max-w-md w-full px-4 py-8 bg-main-light rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-main-dark">
          404 - Page Not Found
        </h2>

        <p className="mt-2 text-minor-dark">
          The page you're looking for does not exist.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
