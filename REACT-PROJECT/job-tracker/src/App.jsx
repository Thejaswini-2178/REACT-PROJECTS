import { useState } from "react";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import Filters from "./components/Filters";
import SearchBar from "./components/SearchBar";
import useLocalStorage from "./hooks/useLocalStorage";
import "./styles.css";

export default function App() {
  const [jobs, setJobs] = useLocalStorage("jobs", []);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentJob, setCurrentJob] = useState(null);

  // Add a new job
  const addJob = (job) => {
    setJobs([...jobs, { ...job, id: Date.now().toString(), updatedAt: new Date().toISOString() }]);
  };

  // Update an existing job
  const updateJob = (updatedJob) => {
    setJobs(jobs.map((job) => (job.id === updatedJob.id ? updatedJob : job)));
    setCurrentJob(null);
  };

  // Delete a job
  const deleteJob = (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      setJobs(jobs.filter((job) => job.id !== id));
      if (currentJob?.id === id) setCurrentJob(null);
    }
  };

  // Filter jobs by status and search term
  const filteredJobs = jobs
    .filter((job) => (statusFilter === "All" ? true : job.status === statusFilter))
    .filter((job) =>
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.position.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="container">
      <h1>Job Application Tracker</h1>

      <div className="form-container">
        <JobForm
          addJob={addJob}
          updateJob={updateJob}
          currentJob={currentJob}
          setCurrentJob={setCurrentJob}
        />
      </div>

      <div className="job-list">
        <h2>Your Job Applications</h2>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Filters statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
        <JobList jobs={filteredJobs} setCurrentJob={setCurrentJob} deleteJob={deleteJob} />
      </div>
    </div>
  );
}