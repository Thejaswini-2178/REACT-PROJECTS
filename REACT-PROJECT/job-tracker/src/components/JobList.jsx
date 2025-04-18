import JobCard from "./JobCard";

export default function JobList({ jobs, setCurrentJob, deleteJob }) {
  if (jobs.length === 0) {
    return <p>No jobs found. Add a new job application!</p>;
  }

  return (
    <div className="jobs-container">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          setCurrentJob={setCurrentJob}
          deleteJob={deleteJob}
        />
      ))}
    </div>
  );
}