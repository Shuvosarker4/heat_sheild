
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import projects from "../data/projects.json";

const ProjectDetails = () => {
  const { slug } = useParams();

  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#09182B] px-5 text-center">
        <div>
          <h2 className="text-3xl font-bold text-white">
            Project Not Found
          </h2>

          <p className="mt-3 text-slate-400">
            The project you are looking for does not exist.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#1455A4] px-5 py-3 text-white transition hover:bg-blue-600"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </section>
    );
  }

  const latestProjects = [...projects]
    .filter((item) => item.id !== project.id)
    .sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    )
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-[#09182B] px-5 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">

        {/* Back Navigation */}
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-blue-400"
        >
          <ArrowLeft size={18} />
          Back to Projects
        </Link>

        {/* Project Header */}
        <div className="mb-10 border-b border-white/10 pb-8">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
            <span className="h-[2px] w-8 bg-[#D92323]" />
            Project Profile / {project.number}
          </span>

          <h1 className="mt-5 max-w-4xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {project.title}
          </h1>

          <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-[#D92323] sm:text-base">
            {project.projectType}
          </p>

          <p className="mt-5 max-w-4xl text-base leading-8 text-slate-400">
            {project.shortDescription}
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid items-start gap-10 lg:grid-cols-3">

          {/* Left Content */}
          <div className="space-y-10 lg:col-span-2">

            {/* Main Project Image */}
            <div className="overflow-hidden rounded-xl border border-white/10 bg-[#172B45]">
              <img
                src={project.coverImage}
                alt={project.title}
                className="h-[280px] w-full object-cover sm:h-[450px]"
              />
            </div>

            {/* Project Overview */}
            <section className="rounded-xl border border-white/10 bg-[#172B45] p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#1455A4]/20 text-blue-400">
                  <ShieldCheck size={25} />
                </div>

                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                    About The Project
                  </span>

                  <h2 className="mt-1 text-2xl font-bold text-white">
                    Project Overview
                  </h2>
                </div>
              </div>

              <div className="space-y-4 text-sm leading-8 text-slate-400 sm:text-base">
                <p>
                  {project.overview?.description ||
                    project.shortDescription}
                </p>

                {project.overview?.additionalDescription && (
                  <p>
                    {project.overview.additionalDescription}
                  </p>
                )}
              </div>
            </section>

            {/* Project Systems */}
            {project.systems?.length > 0 && (
              <section>
                <div className="mb-7">
                  <span className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                    Our Work
                  </span>

                  <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                    Project Systems & Scope
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    Explore the fire detection and fire protection
                    systems incorporated into this project.
                  </p>
                </div>

                <div className="space-y-7">
                  {project.systems.map((system) => (
                    <article
                      key={system.id}
                      className="overflow-hidden rounded-xl border border-white/10 bg-[#172B45]"
                    >
                      {/* System Header */}
                      <div className="border-b border-white/10 bg-[#1455A4]/10 p-6">
                        <div className="flex items-start gap-4">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#1455A4] text-sm font-bold text-white">
                            {system.number}
                          </span>

                          <div>
                            <h3 className="text-xl font-bold text-white">
                              {system.title}
                            </h3>

                            {system.system && (
                              <p className="mt-2 text-sm font-semibold text-blue-400">
                                System: {system.system}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* System Content */}
                      <div className="space-y-7 p-6">

                        {/* Description */}
                        <div>
                          <h4 className="mb-3 font-semibold text-white">
                            System Description
                          </h4>

                          <p className="text-sm leading-8 text-slate-400">
                            {system.description}
                          </p>
                        </div>

                        {/* Key Components */}
                        {system.keyComponents?.length > 0 && (
                          <div>
                            <h4 className="mb-4 font-semibold text-white">
                              Key System Components
                            </h4>

                            <div className="grid gap-3 sm:grid-cols-2">
                              {system.keyComponents.map((component, index) => (
                                <div
                                  key={index}
                                  className="flex items-start gap-3 rounded-lg border border-white/5 bg-[#09182B]/60 p-3"
                                >
                                  <CheckCircle2
                                    size={18}
                                    className="mt-0.5 shrink-0 text-blue-400"
                                  />

                                  <span className="text-sm leading-6 text-slate-300">
                                    {component}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Project Scope */}
                        {system.scope?.length > 0 && (
                          <div>
                            <h4 className="mb-4 font-semibold text-white">
                              Project Scope
                            </h4>

                            <div className="space-y-3">
                              {system.scope.map((item, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-3 text-sm text-slate-400"
                                >
                                  <span className="h-2 w-2 rounded-full bg-[#D92323]" />
                                  {item}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Project Gallery */}
            {project.gallery?.length > 0 && (
              <section>
                <div className="mb-6">
                  <span className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                    Project Gallery
                  </span>

                  <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                    Project Images
                  </h2>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {project.gallery.map((image, index) => (
                    <div
                      key={`${image}-${index}`}
                      className="group overflow-hidden rounded-xl border border-white/10 bg-[#172B45]"
                    >
                      <img
                        src={image}
                        alt={`${project.title} - Image ${index + 1}`}
                        loading="lazy"
                        className="h-60 w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-7 lg:sticky lg:top-24">

            {/* Latest Projects */}
            <div className="rounded-xl border border-white/10 bg-[#172B45] p-6">
              <h3 className="mb-6 border-b border-white/10 pb-4 text-xl font-bold text-white">
                Latest Projects
              </h3>

              <div className="space-y-6">
                {latestProjects.map((item) => (
                  <Link
                    key={item.id}
                    to={`/project/${item.slug}`}
                    className="group flex gap-4"
                  >
                    <div className="h-20 w-24 shrink-0 overflow-hidden rounded-lg">
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div className="min-w-0">
                      <h4 className="line-clamp-2 text-sm font-semibold leading-6 text-slate-200 transition group-hover:text-blue-400">
                        {item.title}
                      </h4>

                      <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-blue-400">
                        View Details
                        <ArrowUpRight size={13} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Card */}
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#1455A4] p-6">
              <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />

              <div className="relative">
                <h3 className="text-xl font-bold text-white">
                  Have a Similar Project?
                </h3>

                <p className="mt-3 text-sm leading-7 text-blue-100">
                  Contact our team for professional fire protection
                  and safety engineering solutions.
                </p>

                <Link
                  to="/#footer"
                  className="mt-6 inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-[#1455A4] transition hover:bg-slate-100"
                >
                  Contact Us
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default ProjectDetails;
