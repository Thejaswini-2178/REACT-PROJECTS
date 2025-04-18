import { useState, useEffect } from "react";

export default function JobForm({ addJob, updateJob, currentJob, setCurrentJob }) {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    status: "Applied",
    appliedDate: new Date().toISOString().split("T")[0],
    notes: "",
  });

  useEffect(() => {
    if (currentJob) {
      setFormData(currentJob);
    } else {
      setFormData({
        company: "",
        position: "",
        status: "Applied",
        appliedDate: new Date().toISOString().split("T")[0],
        notes: "",
      });
    }
  }, [currentJob]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const job = {
      ...formData,
      updatedAt: new Date().toISOString(),
    };

    if (currentJob) {
      updateJob({ ...job, id: currentJob.id });
    } else {
      addJob(job);
    }
  };

  return (
    <>
      <h2>{currentJob ? "Edit Job" : "Add New Job"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Company:</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Position:</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Status:</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="form-group">
          <label>Applied Date:</label>
          <input
            type="date"
            name="appliedDate"
            value={formData.appliedDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Notes:</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <button type="submit">{currentJob ? "Update" : "Add"} Job</button>
        {currentJob && (
          <button type="button" onClick={() => setCurrentJob(null)}>
            Cancel
          </button>
        )}
      </form>
    </>
  );
}