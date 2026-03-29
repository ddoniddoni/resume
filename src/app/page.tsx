import { ThemeToggle } from "@/components/theme-toggle";
import styles from "./page.module.css";

const navigationItems = [
  { id: "about", label: "About Me" },
  { id: "skills", label: "Skills" },
  { id: "archiving", label: "Archiving" },
  { id: "projects", label: "Projects" },
  { id: "career", label: "Career" },
  { id: "education", label: "Education" },
];

const profileFacts = [
  { label: "이름", value: "홍길동" },
  { label: "직무", value: "Frontend Developer" },
  { label: "위치", value: "Seoul, South Korea" },
  { label: "이메일", value: "hello@example.com", href: "mailto:hello@example.com" },
  { label: "GitHub", value: "github.com/username", href: "https://github.com/username" },
  { label: "블로그", value: "blog.example.com", href: "https://blog.example.com" },
];

const skillGroups = [
  {
    category: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "App Router", "Responsive UI"],
  },
  {
    category: "State & Data",
    items: ["TanStack Query", "Zustand", "Form Handling", "REST API", "SEO"],
  },
  {
    category: "Collaboration",
    items: ["Figma Handoff", "Design QA", "Documentation", "Code Review", "Lighthouse"],
  },
];

const archivingLinks = [
  {
    title: "GitHub",
    href: "https://github.com/username",
    description: "프로젝트 소스 코드와 실험 기록을 정리하는 저장소",
  },
  {
    title: "Blog",
    href: "https://blog.example.com",
    description: "트러블슈팅, 구현 과정, 회고를 문서로 남기는 기술 블로그",
  },
  {
    title: "Resume PDF",
    href: "#",
    description: "공유용 이력서 PDF 또는 노션 링크를 연결하는 자리",
  },
];

const projects = [
  {
    name: "Resume Portfolio",
    period: "2026.03",
    team: "개인 프로젝트",
    summary: "채용 담당자가 빠르게 훑을 수 있도록 설계한 이력서형 포트폴리오 웹사이트",
    bullets: [
      "상단 소개, 아카이빙, 프로젝트, 커리어를 하나의 흐름으로 연결했습니다.",
      "모바일과 데스크톱에서 모두 안정적으로 읽히도록 레이아웃을 설계했습니다.",
      "샘플 데이터를 실제 경력으로 쉽게 교체할 수 있도록 정적 데이터 구조로 정리했습니다.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    links: [
      { label: "Live", href: "#" },
      { label: "GitHub", href: "https://github.com/username" },
    ],
  },
  {
    name: "Operations Dashboard",
    period: "2025.11 - 2026.01",
    team: "사내 프로젝트",
    summary: "운영팀이 핵심 데이터를 더 빠르게 확인하도록 개선한 관리자용 대시보드",
    bullets: [
      "반복 사용되는 필터와 상태 UI를 공통 컴포넌트로 정리했습니다.",
      "데이터 조회 흐름을 단순화해 실무 처리 시간을 줄였습니다.",
      "차트와 표를 함께 배치해 확인과 액션 사이의 이동을 줄였습니다.",
    ],
    stack: ["React", "TypeScript", "Charts", "Design System"],
    links: [{ label: "Case Study", href: "#" }],
  },
  {
    name: "Marketing Landing Pages",
    period: "2025.06 - 2025.09",
    team: "마케팅 협업",
    summary: "캠페인별 메시지와 CTA를 빠르게 검증할 수 있도록 만든 랜딩 페이지 세트",
    bullets: [
      "섹션 템플릿을 공통화해 신규 페이지 제작 속도를 높였습니다.",
      "SEO와 성능을 함께 고려해 유입 품질을 안정적으로 관리했습니다.",
      "디자인 QA 체크리스트를 문서화해 배포 후 수정 비용을 줄였습니다.",
    ],
    stack: ["Next.js", "Analytics", "A/B Testing"],
    links: [{ label: "Overview", href: "#" }],
  },
];

const careerItems = [
  {
    company: "Example Company",
    period: "2023.03 - 현재",
    summary: "브랜드 경험과 운영 효율을 함께 개선하는 웹 제품을 개발했습니다.",
    roles: ["Frontend 개발", "UI 시스템 정리", "디자인 QA"],
    details: [
      {
        title: "서비스 랜딩 페이지 리뉴얼",
        period: "2025년 하반기",
        description: "핵심 메시지 전달력과 전환 동선을 개선하기 위해 전체 구조를 재설계했습니다.",
      },
      {
        title: "운영용 대시보드 개선",
        period: "2024년 하반기",
        description: "운영팀이 자주 사용하는 화면을 중심으로 정보 위계와 인터랙션을 정리했습니다.",
      },
    ],
  },
  {
    company: "Startup Studio",
    period: "2021.07 - 2023.02",
    summary: "초기 제품과 브랜드 사이트를 빠르게 만들며 마케팅, 디자인과 밀접하게 협업했습니다.",
    roles: ["Web Publisher", "Frontend 개발", "콘텐츠 페이지 제작"],
    details: [
      {
        title: "채용 페이지 제작",
        period: "2022년",
        description: "브랜드 톤과 팀 문화를 전달하는 구조로 채용 페이지를 설계했습니다.",
      },
      {
        title: "캠페인 페이지 템플릿화",
        period: "2021년 하반기",
        description: "반복 제작되던 이벤트 페이지를 재사용 가능한 섹션 단위로 정리했습니다.",
      },
    ],
  },
];

const educationItems = [
  {
    period: "2017 - 2021",
    title: "OO대학교 디지털미디어학과",
    detail: "디자인과 개발을 함께 다루며 인터랙티브 웹 경험에 관심을 키웠습니다.",
  },
  {
    period: "2024",
    title: "UX Writing / Accessibility Study",
    detail: "사용자 문구와 접근성 관점에서 화면 구조를 점검하는 실무 스터디를 진행했습니다.",
  },
];

const heroHighlights = [
  { label: "Experience", value: "4+ Years" },
  { label: "Projects", value: "10+" },
  { label: "Focus", value: "Readable UI" },
];

export default function Home() {
  return (
    <main className={styles.resumeShell}>
      <nav className={styles.resumeTopbar}>
        <div className={styles.resumeTopbarInner}>
          <a className={styles.resumeBrand} href="#top">
            HONG GILDONG
          </a>
          <div className={styles.resumeTopbarActions}>
            <div className={styles.resumeNav}>
              {navigationItems.map((item) => (
                <a key={item.id} href={`#${item.id}`}>
                  {item.label}
                </a>
              ))}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div id="top" className={styles.resumeContainer}>
        <section className={styles.resumeHero}>
          <div className={styles.resumeHeroCopy}>
            <div className={`${styles.resumeHeroOrbit} ${styles.resumeHeroOrbitOne}`} />
            <div className={`${styles.resumeHeroOrbit} ${styles.resumeHeroOrbitTwo}`} />
            <p className={styles.resumeEyebrow}>Frontend Developer Portfolio</p>
            <h1>
              읽기 쉬운 구조와
              <br />
              신뢰감을 주는 화면을 만듭니다.
            </h1>
            <p className={styles.resumeHeroDescription}>
              제품의 메시지를 더 명확하게 전달하고, 사용자가 망설이지 않도록 화면의
              흐름을 설계하는 프론트엔드 개발자입니다. 포트폴리오도 같은 기준으로,
              처음 보는 사람이 빠르게 이해할 수 있게 구성했습니다.
            </p>
            <div className={styles.resumeHeroActions}>
              <a
                className={`${styles.resumeButton} ${styles.resumeButtonPrimary}`}
                href="#projects"
              >
                프로젝트 보기
              </a>
              <a
                className={`${styles.resumeButton} ${styles.resumeButtonSecondary}`}
                href="#career"
              >
                경력 보기
              </a>
            </div>
            <div className={styles.resumeHeroNote}>
              <span>Selected Work</span>
              <p>브랜딩, 운영, 성능, 문서화를 함께 다루는 프론트엔드 포트폴리오</p>
            </div>
          </div>

          <aside className={styles.resumeHeroPanel}>
            <div className={styles.resumeHeroPanelHeader}>
              <p>Quick Profile</p>
              <span>2026 Portfolio</span>
            </div>
            <ul className={styles.resumeFacts}>
              {profileFacts.map((item) => (
                <li key={item.label}>
                  <span>{item.label}</span>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer">
                      {item.value}
                    </a>
                  ) : (
                    <strong>{item.value}</strong>
                  )}
                </li>
              ))}
            </ul>
            <div className={styles.resumeHighlightGrid}>
              {heroHighlights.map((item) => (
                <article key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </article>
              ))}
            </div>
          </aside>
        </section>

        <section id="about" className={styles.resumeSection}>
          <div className={styles.resumeSectionHeading}>
            <p>About Me</p>
            <h2>핵심 정보를 빠르게 읽히게 정리한 소개 섹션</h2>
          </div>
          <div className={styles.resumeAboutGrid}>
            {profileFacts.map((item) => (
              <article key={item.label} className={styles.resumeInfoCard}>
                <span>{item.label}</span>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.value}
                  </a>
                ) : (
                  <strong>{item.value}</strong>
                )}
              </article>
            ))}
          </div>
          <p className={styles.resumeSectionDescription}>
            레퍼런스 사이트처럼 첫 번째 본문 섹션은 이력서의 기본 정보가 한 번에 정리되도록
            두었습니다. 이름, 직무, 위치, 연락처, 아카이빙 링크를 빠르게 훑을 수 있어
            채용 담당자가 초반에 필요한 정보를 놓치지 않습니다.
          </p>
        </section>

        <section id="skills" className={styles.resumeSection}>
          <div className={styles.resumeSectionHeading}>
            <p>Skills</p>
            <h2>기술 스택을 카테고리 중심으로 묶은 섹션</h2>
          </div>
          <div className={styles.resumeSkillsGrid}>
            {skillGroups.map((group) => (
              <article key={group.category} className={styles.resumeSkillCard}>
                <h3>{group.category}</h3>
                <div className={styles.resumeTagList}>
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="archiving" className={styles.resumeSection}>
          <div className={styles.resumeSectionHeading}>
            <p>Archiving</p>
            <h2>신뢰를 보강하는 외부 링크 섹션</h2>
          </div>
          <div className={styles.resumeArchiveGrid}>
            {archivingLinks.map((item) => (
              <a
                key={item.title}
                className={styles.resumeArchiveCard}
                href={item.href}
                target="_blank"
                rel="noreferrer"
              >
                <span>{item.title}</span>
                <strong>{item.href === "#" ? "링크 연결 예정" : item.href.replace("https://", "")}</strong>
                <p>{item.description}</p>
              </a>
            ))}
          </div>
        </section>

        <section id="projects" className={styles.resumeSection}>
          <div className={styles.resumeSectionHeading}>
            <p>Projects</p>
            <h2>프로젝트를 가장 큰 비중으로 보여주는 메인 섹션</h2>
          </div>
          <div className={styles.resumeProjectList}>
            {projects.map((project) => (
              <article key={project.name} className={styles.resumeProjectCard}>
                <div className={styles.resumeProjectMeta}>
                  <span>{project.period}</span>
                  <span>{project.team}</span>
                </div>
                <h3>{project.name}</h3>
                <p className={styles.resumeProjectSummary}>{project.summary}</p>
                <ul className={styles.resumeProjectBullets}>
                  {project.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <div className={styles.resumeProjectFooter}>
                  <div className={styles.resumeTagList}>
                    {project.stack.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                  <div className={styles.resumeLinkRow}>
                    {project.links.map((link) => (
                      <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="career" className={styles.resumeSection}>
          <div className={styles.resumeSectionHeading}>
            <p>Career</p>
            <h2>회사 중심으로 신뢰를 쌓는 경력 타임라인</h2>
          </div>
          <div className={styles.resumeTimeline}>
            {careerItems.map((item) => (
              <article key={`${item.company}-${item.period}`} className={styles.resumeTimelineItem}>
                <div className={styles.resumeTimelineHead}>
                  <div>
                    <p>{item.period}</p>
                    <h3>{item.company}</h3>
                  </div>
                  <div className={styles.resumeRoleList}>
                    {item.roles.map((role) => (
                      <span key={role}>{role}</span>
                    ))}
                  </div>
                </div>
                <p className={styles.resumeTimelineSummary}>{item.summary}</p>
                <div className={styles.resumeDetailList}>
                  {item.details.map((detail) => (
                    <div key={`${detail.title}-${detail.period}`} className={styles.resumeDetailCard}>
                      <div className={styles.resumeDetailHead}>
                        <h4>{detail.title}</h4>
                        <span>{detail.period}</span>
                      </div>
                      <p>{detail.description}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className={styles.resumeSection}>
          <div className={styles.resumeSectionHeading}>
            <p>Education</p>
            <h2>학력과 학습 이력</h2>
          </div>
          <div className={styles.resumeEducationGrid}>
            {educationItems.map((item) => (
              <article key={`${item.title}-${item.period}`} className={styles.resumeEducationCard}>
                <span>{item.period}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
