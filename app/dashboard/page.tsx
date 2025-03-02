export default function Page() {
  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="card bg-base-100 shadow-xl p-6">
          <h1 className="text-3xl font-bold mb-4">Welcome to Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-primary/10 p-4">
              <h2 className="card-title text-primary mb-2">Statistics</h2>
              <p className="text-base-content/70">
                View your latest statistics and analytics
              </p>
            </div>
            <div className="card bg-success/10 p-4">
              <h2 className="card-title text-success mb-2">Reports</h2>
              <p className="text-base-content/70">
                Access detailed reports and insights
              </p>
            </div>
            <div className="card bg-secondary/10 p-4">
              <h2 className="card-title text-secondary mb-2">Activities</h2>
              <p className="text-base-content/70">
                Track your recent activities and updates
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
