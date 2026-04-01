# Resume

<div align="center">

### Codex와 함께 만드는 개인 이력서 포트폴리오

Next.js App Router 기반으로 만든 프론트엔드 이력서 웹사이트입니다.  
실제 경력, 기술 스택, 학력 정보를 읽기 쉬운 단일 페이지 구조로 정리했습니다.

</div>

---

## Overview

이 프로젝트는 개인 브랜딩과 채용 제출용으로 함께 활용할 수 있는 이력서 포트폴리오입니다.

현재 페이지에는 다음 정보가 반영되어 있습니다.

- 기본 소개와 핵심 프로필
- 기술 스택
- GitHub 아카이빙 링크
- 회사별 경력과 주요 수행 내용
- 학력, 자격증, 어학 정보

## Stack

- Next.js 16
- React 19
- TypeScript
- CSS Modules
- next-themes
- Tailwind CSS 4
- ESLint

## Sections

- `About Me`
- `Skills`
- `Archiving`
- `Career`
- `Education`

## Project Structure

- `src/app/page.tsx`
  현재 이력서 데이터와 메인 페이지 구조를 관리합니다.
- `src/app/page.module.css`
  메인 페이지 스타일을 담당합니다.
- `src/components/theme-toggle.tsx`
  라이트/다크 테마 전환 버튼 컴포넌트입니다.
- `src/components/theme-toggle.module.css`
  테마 토글 스타일을 담당합니다.
- `src/app/globals.css`
  전역 토큰과 공통 스타일을 관리합니다.

## Getting Started

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000` 으로 접속하면 됩니다.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Status

- 현재 작업 브랜치: `develop`
- 실제 이력서 데이터 반영 완료
- 단일 페이지 이력서 포트폴리오 형태로 운영 중
