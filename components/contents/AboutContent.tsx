"use client";

export function AboutContent() {
  return (
    <div className="p-4 font-[Arial] text-[13px] leading-relaxed text-black">
      <div className="flex gap-4 mb-4">
        <div className="w-20 h-20 bg-[#c0c0c0] border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white flex items-center justify-center text-4xl shrink-0">
          👤
        </div>
        <div>
          <h2 className="text-base font-bold mb-1">About Me</h2>
          <p className="text-[#000080] font-bold">Full-Stack Developer</p>
        </div>
      </div>

      <div className="border border-t-[#808080] border-l-[#808080] border-b-white border-r-white mb-3" />

      <div className="space-y-3">
        <div>
          <h3 className="font-bold text-[12px] text-[#000080] mb-1">📋 General</h3>
          <table className="text-[12px]">
            <tbody>
              <tr><td className="pr-3 text-[#808080]">Name:</td><td>Your Name</td></tr>
              <tr><td className="pr-3 text-[#808080]">Location:</td><td>Your City, Country</td></tr>
              <tr><td className="pr-3 text-[#808080]">Email:</td><td className="text-[#000080] underline">you@example.com</td></tr>
            </tbody>
          </table>
        </div>

        <div>
          <h3 className="font-bold text-[12px] text-[#000080] mb-1">💻 Skills</h3>
          <div className="flex flex-wrap gap-1">
            {["TypeScript", "React", "Next.js", "Node.js", "Python", "PostgreSQL", "Docker", "AWS"].map(
              (skill) => (
                <span
                  key={skill}
                  className="px-2 py-[1px] bg-[#c0c0c0] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-[11px]"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-[12px] text-[#000080] mb-1">📝 Bio</h3>
          <p className="text-[12px]">
            Passionate developer who loves building elegant solutions to complex problems.
            Experienced in full-stack web development with a focus on modern JavaScript/TypeScript
            ecosystems. Always learning, always building.
          </p>
        </div>
      </div>
    </div>
  );
}
