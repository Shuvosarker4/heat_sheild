
import { Link } from "react-router";
import { ArrowUpRight, FolderOpen } from "lucide-react";
import projects from "../data/projects.json";

const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="bg-[#09182B] px-5 py-20 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-12">
          <span className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
            <span className="h-[2px] w-8 bg-[#D92323]" />
            Our Portfolio
          </span>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Innovation{" "}
                <span className="text-blue-400">&</span>{" "}
                <span className="text-[#D92323]">Design</span>
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                Discover our latest projects and explore how we deliver
                reliable fire protection and safety engineering solutions.
              </p>
            </div>

            <Link
              to="/project"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition hover:text-white"
            >
              Explore All Projects
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>

        {/* Project Cards */}
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#172B45] shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-blue-950/40"
            >
              {/* Project Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#09182B]/80 via-transparent to-transparent" />

                <span className="absolute bottom-4 left-5 rounded-md border border-white/20 bg-[#09182B]/80 px-3 py-1 text-sm font-semibold text-white backdrop-blur">
                  Project {project.number}
                </span>
              </div>

              {/* Project Content */}
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-400">
                  <FolderOpen size={15} />
                  {project.projectType || "Featured Project"}
                </div>

                <h3 className="mb-3 line-clamp-2 text-xl font-semibold leading-snug text-white transition group-hover:text-blue-400">
                  {project.title}
                </h3>

                <p className="line-clamp-4 text-sm leading-7 text-slate-400">
                  {project.shortDescription}
                </p>

                <div className="mt-auto flex justify-end pt-6">
                  <Link
                    to={`/project/${project.slug}`}
                    className="inline-flex items-center gap-2 rounded-md bg-[#1455A4] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2563EB]"
                  >
                    View Project
                    <ArrowUpRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
