# Resume Project Plan

## 1. Project Goal

이 프로젝트는 Next.js로 만드는 스크롤 기반의 단일 페이지 이력서 사이트다.

목표는 다음과 같다.

- 한 페이지 안에서 나의 소개, 기술, 경험, 프로젝트, 연락처를 자연스럽게 전달하기
- 복잡한 기능보다 읽기 쉬운 정보 구조와 깔끔한 인상을 우선하기
- DB 없이 정적인 콘텐츠 중심으로 빠르고 가벼운 이력서 사이트 만들기

## 2. Core Principles

- DB는 사용하지 않는다
- 백엔드는 붙이지 않는다
- 모든 이력서 콘텐츠는 코드 안에 직접 작성한다
- 페이지는 `/` 단일 라우트만 사용한다
- 시맨틱 HTML 구조를 우선한다
- 스크롤 흐름과 가독성을 가장 중요하게 본다

## 3. Page Flow

페이지는 아래 순서로 구성한다.

1. Hero
2. About
3. Skills
4. Experience / Projects
5. Contact

각 섹션은 독립적으로 읽혀야 하지만, 위에서 아래로 내려갈수록 나를 더 구체적으로 이해할 수 있는 흐름으로 설계한다.

## 4. Content Strategy

### Hero

- 이름
- 한 줄 소개
- 핵심 역할 또는 직무
- 짧은 CTA
- GitHub, 블로그, 이메일 같은 주요 링크

### About

- 나는 어떤 사람인지
- 어떤 방식으로 일하는지
- 어떤 분야에 관심이 있는지

### Skills

- 주력 기술
- 사용 가능한 도구
- 익숙한 프레임워크와 협업 환경

### Experience / Projects

- 경력과 프로젝트를 분리하거나, 한 섹션 안에서 묶어서 보여주기
- 각 항목에는 역할, 기간, 핵심 성과, 사용 기술 포함
- 텍스트가 길어지지 않도록 핵심 위주로 요약

### Contact

- 이메일
- GitHub
- 블로그 / 포트폴리오 링크
- 마지막 인사 또는 협업 제안 문구

## 5. Recommended File Structure

```text
src/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    layout/
      site-header.tsx
      site-footer.tsx
      section-shell.tsx
    sections/
      hero-section.tsx
      about-section.tsx
      skills-section.tsx
      experience-section.tsx
      projects-section.tsx
      contact-section.tsx
    common/
      section-title.tsx
      social-link.tsx
      skill-badge.tsx
      timeline-item.tsx
      project-card.tsx
  data/
    resume.ts
  types/
    resume.ts
```

초기에는 구조를 너무 쪼개지 않아도 된다.  
첫 단계에서는 `page.tsx`와 `sections` 폴더 중심으로 시작하고, 공통 UI가 반복되면 그때 `common`으로 분리한다.

## 6. Component Plan

### page.tsx

- 단일 페이지의 전체 흐름을 조립하는 역할
- 각 섹션 컴포넌트를 순서대로 렌더링

### site-header.tsx

- 상단 고정 또는 상단 배치 내비게이션
- 각 섹션으로 이동하는 앵커 링크 제공

### section-shell.tsx

- 섹션 공통 여백
- 최대 너비 제한
- id와 제목 연결

### hero-section.tsx

- 첫 인상 담당
- 가장 짧고 강한 메시지를 보여주는 영역

### about-section.tsx

- 자기소개와 일하는 방식 설명

### skills-section.tsx

- 기술을 카테고리별로 구분해서 표시

### experience-section.tsx

- 경력, 활동, 경험을 시간 흐름 중심으로 표시

### projects-section.tsx

- 대표 프로젝트를 카드 또는 리스트 형태로 표시

### contact-section.tsx

- 연락 수단과 마지막 메시지 정리

## 7. Data Strategy

DB를 사용하지 않으므로 이력서 데이터는 정적 파일로 관리한다.

추천 방식:

- `src/data/resume.ts`에 객체 형태로 저장
- 섹션 컴포넌트는 해당 데이터를 받아 렌더링

예상 데이터 범위:

- profile
- about
- skills
- experiences
- projects
- contact

이 구조를 쓰면 텍스트 수정과 UI 수정을 분리할 수 있다.

## 8. Implementation Order

### Phase 1. Base Setup

- 메타데이터 정리
- 전역 스타일 방향 정의
- 페이지 전체 최대 너비와 기본 간격 규칙 설정

### Phase 2. Skeleton Layout

- `page.tsx`에 섹션 순서만 먼저 배치
- 각 섹션에 임시 제목과 앵커 id 추가
- 상단 내비게이션 연결

### Phase 3. Static Content Structure

- `resume.ts`에 더미 데이터 또는 실제 데이터 입력
- Hero, About, Skills 순서로 우선 구현

### Phase 4. Experience / Projects

- 경력과 프로젝트 표현 방식 결정
- 리스트형인지 카드형인지 선택
- 텍스트 양과 시각적 밀도 조정

### Phase 5. Contact and Finish

- 연락처 링크 정리
- 하단 마무리 문구 추가
- 최종 정보 흐름 점검

### Phase 6. Polish

- 반응형 레이아웃 보정
- 스크롤 이동 UX 개선
- 미세한 타이포, 간격, 컬러 조정

## 9. Design Guidelines

- 첫 화면에서 "누구인지" 바로 보여야 한다
- 장식보다 정보 전달을 우선한다
- 한 섹션의 텍스트 길이는 짧고 명확하게 유지한다
- 흰 배경 중심의 깔끔한 레이아웃부터 시작한다
- 포인트 컬러는 1개만 사용해서 과하지 않게 가져간다

## 10. Verification Plan

### Development Check

- `npm run lint`
- `npm run build`

### UI Check

- 데스크톱에서 섹션 간 간격이 안정적인지
- 모바일에서 텍스트 줄바꿈이 자연스러운지
- 상단 앵커 이동이 정상 동작하는지

### Content Check

- Hero에서 직무와 강점이 바로 보이는지
- Skills가 단순 나열이 아니라 읽기 쉽게 정리됐는지
- Experience / Projects가 중복 설명 없이 구분되는지
- Contact가 실제 행동으로 이어질 수 있게 구성됐는지

### Accessibility Check

- `header`, `nav`, `main`, `section`, `footer` 등 시맨틱 태그 사용
- 제목 계층이 올바른지
- 링크 텍스트가 명확한지
- 키보드로 주요 링크 이동이 가능한지

## 11. Definition of Done

아래 조건을 만족하면 첫 번째 완성 버전으로 본다.

- `/` 한 페이지 안에 모든 핵심 섹션이 존재한다
- 실제 이력서 텍스트가 모두 들어가 있다
- 모바일과 데스크톱에서 읽기 어렵지 않다
- `npm run lint`와 `npm run build`가 모두 통과한다
- 연락처 링크가 실제로 동작한다

## 12. Immediate Next Step

가장 먼저 할 일은 `src/data/resume.ts`에 들어갈 데이터 구조를 정하고,  
그 다음 `page.tsx`에 섹션 순서만 있는 뼈대를 만드는 것이다.
