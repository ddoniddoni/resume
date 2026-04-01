import { ThemeToggle } from '@/components/theme-toggle';
import styles from './page.module.css';

const navigationItems = [
  { id: 'about', label: 'About Me' },
  { id: 'skills', label: 'Skills' },
  { id: 'archiving', label: 'Archiving' },
  { id: 'career', label: 'Career' },
  { id: 'education', label: 'Education' },
];

const profileFacts = [
  { label: '이름', value: '박상돈' },
  { label: '직무', value: '4년 차 Frontend Developer' },
  { label: '위치', value: 'South Korea' },
  {
    label: '이메일',
    value: 'psdkei@naver.com',
    href: 'mailto:psdkei@naver.com',
  },
  {
    label: 'GitHub',
    value: 'github.com/ddoniddoni',
    href: 'https://github.com/ddoniddoni',
  },
];

const skillGroups = [
  {
    category: 'Framework',
    items: ['Next.js', 'React', 'Angular', 'TypeScript', 'JavaScript', 'App Router'],
  },
  {
    category: 'UI & State',
    items: ['Recoil', 'Sass', 'CSS Modules', 'Responsive UI', 'REST API', 'i18n'],
  },
  {
    category: 'Strength',
    items: [
      'UI/UX 개선',
      '성능 최적화',
      '공통 컴포넌트 설계',
      '관리자 페이지 개발',
      '운영 이슈 대응',
      '문서화',
    ],
  },
];

const archivingLinks = [
  {
    title: 'GitHub',
    href: 'https://github.com/ddoniddoni',
    description: '개인 학습과 실험, 프론트엔드 구현 기록을 정리하는 아카이브입니다.',
  },
];

const careerItems = [
  {
    company: '더블다운게임즈',
    period: '2024.06 - 2025.04',
    summary:
      'Next.js, React 기반 플랫폼 웹 애플리케이션을 개발하며 서비스와 관리자 페이지의 UI/UX 개선, 성능 최적화, 공통 컴포넌트 구조 설계를 담당했습니다.',
    roles: ['Next.js', 'React', 'TypeScript', 'Recoil', 'Sass'],
    details: [
      {
        title: '커스텀 방 만들기 기능 개발',
        period: '2024.08 - 2024.11',
        description:
          '사용자 커스텀 방 생성, 수정, 삭제 UI를 구현하고 친구 목록, 쪽지, 선물, 방 관리 기능까지 연계해 사용자 참여 경험과 운영 효율을 함께 높였습니다.',
      },
      {
        title: '렌더링 병목 및 UX 흐름 개선',
        period: '2024 하반기',
        description:
          '초기 로딩 지연과 불필요한 리렌더 구간을 분석해 렌더링 구조와 클라이언트 상태를 정리했고, 주요 화면의 체감 성능과 안정성을 개선했습니다.',
      },
      {
        title: '공통 컴포넌트 구조화 및 운영 화면 고도화',
        period: '2024 - 2025',
        description:
          '중복 UI 로직을 공통 컴포넌트 구조로 재설계하고 관리자 페이지 신규 기능과 오류 케이스를 정리해 유지보수성과 사용 편의성을 높였습니다.',
      },
    ],
  },
  {
    company: '나임네트웍스',
    period: '2020.11 - 2023.11',
    summary:
      'SDDC 솔루션 프론트엔드 개발과 유지보수를 맡아 가상화 및 클라우드 인프라 관리 화면, 물리·논리 인프라 구조 시각화, 다국어 UI를 구현했습니다.',
    roles: ['Angular', 'TypeScript', 'Sass', 'Visualization', 'i18n'],
    details: [
      {
        title: '서울대병원 SDDC 솔루션 구축',
        period: '2021.06 - 2022.01',
        description:
          'Excel 기반 자산 일괄 등록, 수정, Export 기능과 Rack 실장도를 구현해 대규모 인프라 자산을 직관적으로 관리할 수 있는 UI를 개발했습니다.',
      },
      {
        title: '한국수력원자력 납품 및 테마 기능 개발',
        period: '2022.08',
        description:
          '사용자별 theme 값 기반 디자인 전환 구조를 설계하고 현장 구축과 테스트까지 수행해 고객 요구사항 대응과 서비스 안정성 검증을 함께 진행했습니다.',
      },
      {
        title: '공통 UI 구조화와 화면 최적화',
        period: '2020.11 - 2023.11',
        description:
          '차트, Drag & Drop, 대시보드 구성 요소를 개발하고 공통 UI 컴포넌트를 정리해 코드 일관성, 재사용성, 확장성을 높였습니다.',
      },
    ],
  },
];

const educationItems = [
  {
    period: '2011 - 2018',
    title: '신한대학교 컴퓨터공학 학사',
    detail: '2011년 입학, 2018년 졸업 / 학점 4.12 / 4.5',
  },
  {
    period: '2019.05.22',
    title: '정보처리기사',
    detail: '국가공인 자격 취득',
  },
  {
    period: '2025.06',
    title: 'TOEIC Speaking IM2',
    detail: '영어 회화 자격',
  },
];

const heroHighlights = [
  { label: 'Experience', value: '4 Years' },
  { label: 'Domain', value: 'Platform / SDDC' },
  { label: 'Focus', value: 'UI/UX + Perf' },
];

export default function Home() {
  return (
    <main className={styles.resumeShell}>
      <nav className={styles.resumeTopbar}>
        <div className={styles.resumeTopbarInner}>
          <a className={styles.resumeBrand} href="#top">
            PARK SANGDON
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
            <div
              className={`${styles.resumeHeroOrbit} ${styles.resumeHeroOrbitOne}`}
            />
            <div
              className={`${styles.resumeHeroOrbit} ${styles.resumeHeroOrbitTwo}`}
            />
            <p className={styles.resumeEyebrow}>Frontend Developer Resume</p>
            <h1>
              사용자의 필요를 넘어
              <br />
              기대까지 고려하는
              <br />
              프론트엔드를 만듭니다.
            </h1>
            <p className={styles.resumeHeroDescription}>
              안녕하세요. 4년 차 프론트엔드 개발자 박상돈입니다. Next.js, React,
              Angular 기반 서비스에서 UI/UX 개선, 성능 최적화, 공통 컴포넌트 설계,
              운영 이슈 대응을 꾸준히 맡아왔습니다.
            </p>
            <div className={styles.resumeHeroActions}>
              <a
                className={`${styles.resumeButton} ${styles.resumeButtonPrimary}`}
                href="#skills"
              >
                기술 보기
              </a>
              <a
                className={`${styles.resumeButton} ${styles.resumeButtonSecondary}`}
                href="#career"
              >
                경력 보기
              </a>
            </div>
            <div className={styles.resumeHeroNote}>
              <span>Career Snapshot</span>
              <p>
                플랫폼 서비스와 인프라 솔루션을 오가며 화면 구조, 사용성,
                유지보수성을 함께 다뤄온 프론트엔드 이력서 포트폴리오입니다.
              </p>
            </div>
          </div>

          <aside className={styles.resumeHeroPanel}>
            <div className={styles.resumeHeroPanelHeader}>
              <p>Quick Profile</p>
              <span>Frontend Resume</span>
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
            <h2>기본 정보와 핵심 강점을 한 번에 보는 소개</h2>
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
            어느 환경에서도 빠르게 적응하며, 사용자의 need를 넘어 want까지 고려하는
            방향으로 화면을 설계해왔습니다. 서비스 페이지부터 관리자 화면,
            인프라 관리 UI까지 다양한 맥락에서 읽기 쉬운 구조와 안정적인 사용
            흐름을 만드는 데 집중해왔습니다.
          </p>
        </section>

        <section id="skills" className={styles.resumeSection}>
          <div className={styles.resumeSectionHeading}>
            <p>Skills</p>
            <h2>실무에서 자주 다룬 기술과 업무 강점</h2>
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
            <h2>코드와 기록을 확인할 수 있는 링크</h2>
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
                <strong>{item.href.replace('https://', '')}</strong>
                <p>{item.description}</p>
              </a>
            ))}
          </div>
        </section>

        <section id="career" className={styles.resumeSection}>
          <div className={styles.resumeSectionHeading}>
            <p>Career</p>
            <h2>회사와 프로젝트 중심으로 정리한 경력</h2>
          </div>
          <div className={styles.resumeTimeline}>
            {careerItems.map((item) => (
              <article
                key={`${item.company}-${item.period}`}
                className={styles.resumeTimelineItem}
              >
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
                    <div
                      key={`${detail.title}-${detail.period}`}
                      className={styles.resumeDetailCard}
                    >
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
            <h2>학력과 자격 정보</h2>
          </div>
          <div className={styles.resumeEducationGrid}>
            {educationItems.map((item) => (
              <article
                key={`${item.title}-${item.period}`}
                className={styles.resumeEducationCard}
              >
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
