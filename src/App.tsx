import React, { useState } from "react";

interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
}

interface Website {
  id: number;
  name: string;
  url: string;
  description: string;
  projects: Project[];
}

const defaultWebsites: Website[] = [
  {
    id: 1,
    name: "Ministry of Education",
    url: "https://www.india.gov.in/",
    description: "Government website for educational projects",
    projects: [
      {
        id: 1,
        name: "School Development",
        description: "Project for school development",
        status: "In Progress",
      },
      {
        id: 2,
        name: "Teacher Training",
        description: "Project for teacher training",
        status: "Completed",
      },
    ],
  },
  {
    id: 2,
    name: "Ministry of Health",
    url: "https://www.health.gov",
    description: "Government website for health",
    projects: [
      {
        id: 1,
        name: "Hospital Development",
        description: "Project for hospital development",
        status: "In Progress",
      },
      {
        id: 2,
        name: "Vaccine Distribution",
        description: "Project for vaccine distribution",
        status: "Completed",
      },
    ],
  },
];

const defaultProjectSubmission = {
  name: "",
  description: "",
  websiteId: 0,
};

const WebsiteCard = ({ website }: { website: Website }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-lg font-bold">{website.name}</h2>
      <p className="text-gray-600">{website.description}</p>
      <a
        href={website.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800"
      >
        Visit website
      </a>
      <h3 className="text-lg font-bold mt-4">Projects:</h3>
      <ul>
        {website.projects.map((project) => (
          <li key={project.id}>
            <h4 className="text-md font-bold">{project.name}</h4>
            <p className="text-gray-600">{project.description}</p>
            <p className="text-gray-600">Status: {project.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [websites, setWebsites] = useState(defaultWebsites);
  const [projectSubmission, setProjectSubmission] = useState(
    defaultProjectSubmission
  );
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newProject: Project = {
      id: websites.length + 1,
      name: projectSubmission.name,
      description: projectSubmission.description,
      status: "In Progress",
    };
    const updatedWebsites = websites.map((website) => {
      if (website.id === projectSubmission.websiteId) {
        return { ...website, projects: [...website.projects, newProject] };
      }
      return website;
    });
    setWebsites(updatedWebsites);
    setProjectSubmission(defaultProjectSubmission);
    setShowForm(false);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setProjectSubmission({ ...projectSubmission, [name]: value });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-4">Government Services</h1>
      {websites.map((website) => (
        <WebsiteCard key={website.id} website={website} />
      ))}
      <button
        className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg mb-4"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Hide form" : "Submit a project"}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4">
          <label className="block mb-2">
            <span className="text-gray-600">Project Name:</span>
            <input
              type="text"
              name="name"
              value={projectSubmission.name}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-lg"
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-600">Project Description:</span>
            <input
              type="text"
              name="description"
              value={projectSubmission.description}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-lg"
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-600">Website:</span>
            <select
              name="websiteId"
              value={projectSubmission.websiteId}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="0">Select a website</option>
              {websites.map((website) => (
                <option key={website.id} value={website.id}>
                  {website.name}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg"
          >
            Submit project
          </button>
        </form>
      )}
    </div>
  );
};

export default App;
