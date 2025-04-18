import { formatDate } from "../utils/formatDate";

export default function JobCard({ job, setCurrentJob, deleteJob }) {
  return (
    <div className="job-card">
      <h3>{job.company}</h3>
      <p><strong>Position:</strong> {job.position}</p>
      <p><strong>Status:</strong> <span className={`status-${job.status.toLowerCase()}`}>{job.status}</span></p>
      <p><strong>Applied:</strong> {formatDate(job.appliedDate)}</p>
      {job.notes && <p><strong>Notes:</strong> {job.notes}</p>}
      <div className="job-actions">
        <button onClick={() => setCurrentJob(job)}>Edit</button>
        <button onClick={() => deleteJob(job.id)}>Delete</button>
      </div>
    </div>
  );
}