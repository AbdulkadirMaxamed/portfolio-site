// Printable / downloadable PDF version of the CV, generated from data/cv.ts
// so the on-screen CV and the downloaded file never drift apart.

import { Document, Font, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { CV } from "@/data/cv";

// Keep words whole — the default hyphenation splits words like "Re-act".
Font.registerHyphenationCallback((word) => [word]);

const ink = "#141a2e";
const body = "#2a3040";
const muted = "#6b7180";
const accent = "#2a73d9";
const rule = "#c9ccd3";

const s = StyleSheet.create({
  page: { paddingTop: 36, paddingBottom: 36, paddingHorizontal: 40, fontFamily: "Helvetica", fontSize: 9, color: body },
  header: { flexDirection: "row", gap: 24 },
  name: { fontFamily: "Helvetica-Bold", fontSize: 26, color: ink },
  title: { fontFamily: "Helvetica-Bold", fontSize: 13, color: accent, marginTop: 4 },
  credentials: { fontFamily: "Helvetica-Oblique", fontSize: 9, color: body, marginTop: 3 },
  summary: { width: 220, fontSize: 9, lineHeight: 1.35, paddingTop: 4 },
  contacts: { flexDirection: "row", flexWrap: "wrap", columnGap: 16, rowGap: 4, marginTop: 16, fontSize: 8.5 },
  contact: { color: accent, textDecoration: "none" },
  divider: { borderBottomWidth: 1, borderBottomColor: rule, marginTop: 14, marginBottom: 14 },
  columns: { flexDirection: "row", gap: 26 },
  half: { flex: 1 },
  company: { fontFamily: "Helvetica", color: body },
  paragraph: { marginTop: 3, fontSize: 9, lineHeight: 1.35 },
  references: { marginTop: 16, paddingTop: 8, borderTopWidth: 1, borderTopColor: rule, fontSize: 8, color: muted },
  sectionTitle: { fontFamily: "Helvetica-Bold", fontSize: 12, color: ink, marginBottom: 7 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  itemTitle: { fontFamily: "Helvetica-Bold", fontSize: 10, color: ink },
  itemSub: { fontSize: 9, color: body, marginTop: 2 },
  date: { fontSize: 8, color: body },
  location: { fontSize: 8, color: muted, marginTop: 1 },
  job: { marginBottom: 10, paddingLeft: 10, borderLeftWidth: 1, borderLeftColor: rule },
  bullets: { marginTop: 5 },
  bullet: { flexDirection: "row", marginBottom: 2.5 },
  bulletDot: { width: 10, fontSize: 9 },
  bulletText: { flex: 1, fontSize: 9, lineHeight: 1.35 },
  skillRow: { flexDirection: "row", marginBottom: 5 },
  skillLabel: { width: 74, fontSize: 9, fontFamily: "Helvetica-Bold", color: ink },
  skillValue: { flex: 1, fontSize: 9, lineHeight: 1.3 },
  projects: { flexDirection: "row", flexWrap: "wrap", gap: 20, marginTop: 2 },
  project: { width: "46%" },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 4, marginTop: 5 },
  tag: { backgroundColor: "#eef0f3", borderRadius: 3, paddingVertical: 2, paddingHorizontal: 5, fontSize: 7.5 },
});

function Section({ title, children, first = false }: { title: string; children: React.ReactNode; first?: boolean }) {
  return (
    <View style={{ marginTop: first ? 0 : 14 }}>
      <Text style={s.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

export function CVDocument({ cv }: { cv: CV }) {
  return (
    <Document title={`${cv.name} — CV`} author={cv.name} subject={cv.title}>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <View style={{ flex: 1 }}>
            <Text style={s.name}>{cv.name}</Text>
            <Text style={s.title}>{cv.title}</Text>
            {cv.credentials ? <Text style={s.credentials}>{cv.credentials}</Text> : null}
          </View>
          <Text style={s.summary}>{cv.summary}</Text>
        </View>

        <View style={s.contacts}>
          {cv.contacts.map((c) =>
            c.href ? (
              <Link key={c.text} src={c.href} style={s.contact}>
                {c.text}
              </Link>
            ) : (
              <Text key={c.text}>{c.text}</Text>
            )
          )}
        </View>

        <View style={s.divider} />

        <Section title="Experience" first>
          {cv.experience.map((job) => (
            <View key={job.role + job.company} style={s.job} wrap={false}>
              <View style={s.row}>
                <Text style={s.itemTitle}>
                  {job.role} <Text style={s.company}>— {job.company}</Text>
                </Text>
                <Text style={s.date}>{job.period}</Text>
              </View>
              <Text style={s.location}>{job.location}</Text>
              <View style={s.bullets}>
                {job.bullets.map((b) => (
                  <View key={b} style={s.bullet}>
                    <Text style={s.bulletDot}>•</Text>
                    <Text style={s.bulletText}>{b}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </Section>

        {cv.projects.length > 0 && (
          <View wrap={false}>
            <Section title="Projects">
              <View style={s.projects}>
                {cv.projects.map((p) => (
                  <View key={p.name} style={s.project}>
                    {p.href && p.href !== "#" ? (
                      <Link src={p.href} style={[s.itemTitle, { textDecoration: "none" }]}>
                        {p.name}
                      </Link>
                    ) : (
                      <Text style={s.itemTitle}>{p.name}</Text>
                    )}
                    <Text style={s.paragraph}>{p.description}</Text>
                    <View style={s.tags}>
                      {p.tags.map((t) => (
                        <Text key={t} style={s.tag}>
                          {t}
                        </Text>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </Section>
          </View>
        )}

        <View style={s.columns} wrap={false}>
          <View style={s.half}>
            <Section title="Education">
              {cv.education.map((ed) => (
                <View key={ed.degree} style={{ marginBottom: 8 }}>
                  <View style={s.row}>
                    <Text style={s.itemTitle}>{ed.degree}</Text>
                    <Text style={s.date}>{ed.period}</Text>
                  </View>
                  <View style={s.row}>
                    <Text style={s.itemSub}>{ed.school}</Text>
                    <Text style={s.location}>{ed.location}</Text>
                  </View>
                  {ed.summary ? <Text style={s.paragraph}>{ed.summary}</Text> : null}
                </View>
              ))}
            </Section>
          </View>
          <View style={s.half}>
            <Section title="Technical Skills">
              {cv.skills.map((sk) => (
                <View key={sk.label} style={s.skillRow}>
                  <Text style={s.skillLabel}>{sk.label}</Text>
                  <Text style={s.skillValue}>{sk.value}</Text>
                </View>
              ))}
            </Section>
          </View>
        </View>

        {(cv.certifications.length > 0 || cv.interests.length > 0) && (
          <View style={s.columns} wrap={false}>
            <View style={s.half}>
              {cv.certifications.length > 0 && (
                <Section title="Certifications">
                  {cv.certifications.map((c) => (
                    <View key={c} style={s.bullet}>
                      <Text style={s.bulletDot}>•</Text>
                      <Text style={s.bulletText}>{c}</Text>
                    </View>
                  ))}
                </Section>
              )}
            </View>
            <View style={s.half}>
              {cv.interests.length > 0 && (
                <Section title="Interests">
                  <Text style={s.paragraph}>{cv.interests.join(" · ")}</Text>
                </Section>
              )}
            </View>
          </View>
        )}

        {cv.references ? <Text style={s.references}>References: {cv.references}</Text> : null}
      </Page>
    </Document>
  );
}
