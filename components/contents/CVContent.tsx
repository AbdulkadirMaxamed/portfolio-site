"use client";

export function CVContent() {
  return (
    <div className="p-4 font-[Arial] text-[13px] text-black">
      <div className="text-center mb-3">
        <h2 className="text-base font-bold">YOUR NAME</h2>
        <p className="text-[11px] text-[#808080]">
          you@example.com | github.com/you | Your City, Country
        </p>
      </div>

      <div className="border border-t-[#808080] border-l-[#808080] border-b-white border-r-white mb-3" />

      {/* Experience */}
      <section className="mb-3">
        <h3 className="font-bold text-[12px] text-[#000080] bg-[#c0c0c0] px-1 py-[2px] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] mb-1">
          EXPERIENCE
        </h3>
        <div className="pl-2 space-y-2">
          <div>
            <div className="flex justify-between">
              <span className="font-bold text-[12px]">Senior Developer — Company Name</span>
              <span className="text-[11px] text-[#808080]">2022 — Present</span>
            </div>
            <ul className="list-disc list-inside text-[11px] text-[#404040] mt-1">
              <li>Led development of key product features serving 100K+ users</li>
              <li>Architected microservices migration reducing latency by 40%</li>
            </ul>
          </div>
          <div>
            <div className="flex justify-between">
              <span className="font-bold text-[12px]">Full Stack Developer — Another Co</span>
              <span className="text-[11px] text-[#808080]">2020 — 2022</span>
            </div>
            <ul className="list-disc list-inside text-[11px] text-[#404040] mt-1">
              <li>Built real-time data dashboards with React and WebSockets</li>
              <li>Developed REST APIs serving 50K+ daily requests</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mb-3">
        <h3 className="font-bold text-[12px] text-[#000080] bg-[#c0c0c0] px-1 py-[2px] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] mb-1">
          EDUCATION
        </h3>
        <div className="pl-2">
          <div className="flex justify-between">
            <span className="font-bold text-[12px]">B.Sc. Computer Science — University</span>
            <span className="text-[11px] text-[#808080]">2016 — 2020</span>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section>
        <h3 className="font-bold text-[12px] text-[#000080] bg-[#c0c0c0] px-1 py-[2px] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] mb-1">
          TECHNICAL SKILLS
        </h3>
        <div className="pl-2 text-[11px] space-y-1">
          <p><span className="font-bold">Languages:</span> TypeScript, JavaScript, Python, Rust</p>
          <p><span className="font-bold">Frontend:</span> React, Next.js, TailwindCSS</p>
          <p><span className="font-bold">Backend:</span> Node.js, Express, PostgreSQL, Redis</p>
          <p><span className="font-bold">DevOps:</span> Docker, AWS, CI/CD, GitHub Actions</p>
        </div>
      </section>
    </div>
  );
}
