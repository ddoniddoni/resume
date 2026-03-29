# Product Requirements Document (PRD)

# SkyEagles Live Baccarat Platform

**Version:** 1.0
**Last Updated:** 2025-12-04
**Document Owner:** Development Team

---

## 1. Executive Summary

### 1.1 Product Overview

SkyEagles는 실시간 바카라 게임을 제공하는 웹 기반 온라인 카지노 플랫폼입니다. 고품질 라이브 스트리밍, 실시간 베팅, 멀티 테이블 지원, 그리고 고급 자동 베팅 시스템을 핵심 기능으로 제공합니다.

### 1.2 Target Users

- **Primary**: 온라인 바카라 게임을 즐기는 성인 사용자
- **Secondary**: 멀티 테이블 베팅을 선호하는 하이롤러(High Roller)
- **Tertiary**: 오토베팅 전략을 활용하는 전문 베터

### 1.3 Key Objectives

- 실시간 라이브 딜러 바카라 게임 제공
- 매끄러운 멀티 테이블 베팅 경험 구현
- 고급 오토베팅 시스템으로 사용자 편의성 극대화
- 다국어 지원 (한국어, 영어, 중국어, 일본어, 태국어, 베트남어)
- 반응형 디자인으로 데스크톱 및 모바일 지원

---

## 2. Technical Architecture

### 2.1 Technology Stack

#### Frontend

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript 5 (Strict Mode)
- **State Management**:
  - Jotai (클라이언트 상태)
  - TanStack Query (서버 상태/캐싱)
- **Styling**: SCSS with CSS Logical Properties
- **Internationalization**: next-intl (6개 언어 지원)
- **Authentication**: next-auth (JWT 기반)
- **Real-time Communication**: react-use-websocket
- **Forms**: react-hook-form + Zod validation
- **Animation**: Motion (Framer Motion 기반), GSAP
- **Audio**: Howler.js
- **Charts**: Chart.js + React-ChartJS-2

#### Development Tools

- **Code Generation**: openapi-generator-cli (API 타입 자동 생성)
- **Code Quality**: ESLint, Stylelint, Prettier
- **Component Development**: Storybook

### 2.2 Architecture Patterns

#### State Management Architecture

```
Global State (Jotai Atoms)
├── authAtom - 인증 토큰
├── userStatusAtom - 사용자 프로필/잔액/통화
├── appStatusAtom - UI 상태 (전체화면, 채팅 등)
├── settingsAtom - 사용자 환경설정
├── tableRoundsAtom - 전체 테이블 라운드 데이터
├── tableRoundAtomFamily(id) - 개별 테이블 상태
├── betActionAtom - 현재 베팅 액션
├── autobetSettingStatusAtom - 전역 오토벳 설정
└── autobetTableStatusAtomFamily(id) - 테이블별 오토벳 추적
```

#### API Integration Pattern

- OpenAPI/Swagger 스펙에서 TypeScript 타입 자동 생성
- Custom hooks로 API 호출 추상화
- TanStack Query로 캐싱 및 상태 관리

#### WebSocket Communication Pattern

- 줄바꿈으로 구분된 JSON 메시지 (프레임당 다중 메시지)
- 메시지 포맷: `{ type: string, status: number, payload: any }`
- 자동 재연결 지원
- 테이블별 독립적인 소켓 연결

### 2.3 Project Structure

```
app/
├── [locale]/                    # 다국어 라우팅
│   ├── (auth)/                  # 비인증 라우트
│   │   ├── signin/              # 로그인
│   │   ├── signout/             # 로그아웃
│   │   └── expired/             # 세션 만료
│   └── (default-layout)/        # 인증된 라우트
│       ├── lobby/               # 테이블 선택 로비
│       └── games/               # 게임 화면
│           └── baccarat/        # 바카라 게임
├── components/                  # Atomic Design 패턴
│   ├── @atoms/                  # 기본 UI 요소
│   ├── @forms/                  # 폼 컨트롤
│   ├── @molecules/              # 조합 컴포넌트
│   ├── @layout/                 # 페이지 레이아웃
│   └── @provider/               # Context Providers
├── hooks/                       # Custom React Hooks
├── lib/
│   ├── states/                  # Jotai Atoms
│   ├── @swagger/                # 자동 생성 API 타입
│   │   ├── apis/                # API 서비스 클래스
│   │   └── models/              # TypeScript 인터페이스
│   └── hooks/                   # 공용 훅
└── assets/
    ├── styles/                  # SCSS 파일
    └── svgs/                    # SVG 아이콘
```

---

## 3. Core Features

### 3.1 Authentication & User Management

#### 3.1.1 Token-based Authentication

**Description**: JWT 기반 토큰 인증 시스템

**User Flow**:

1. 사용자가 URL 파라미터로 토큰 수신 (`?token=xxx`)
2. 미들웨어가 토큰 추출 및 검증
3. 백엔드 API 호출로 토큰 유효성 확인
4. 쿠키에 세션 정보 저장
5. 인증된 사용자는 게임 화면 접근 가능

**Technical Details**:

- 인증 엔드포인트: `/v1/auth/signin/token`
- 검증 엔드포인트: `/v1/auth/validatetoken2`
- 쿠키 저장: `SESSION_TOKEN`, `SESSION_EXPIRE`, `validateToken`, `NEXT_LOCALE`
- 모든 API 요청에 `Authorization: Bearer ${token}` 헤더 포함

**Security Requirements**:

- IP 주소 검증
- 플랫폼 정보 수집
- Referrer 확인
- 토큰 만료 시 자동 로그아웃

#### 3.1.2 User Profile & Balance Management

**Description**: 사용자 프로필, 잔액, 통화 정보 관리

**State Structure** (app/lib/states/user.ts):

```typescript
{
  currency: string; // 통화 (KRW, USD, CNY 등)
  balance: number; // 현재 잔액
  uid: number; // 사용자 고유 ID
  nickname: string; // 닉네임
  avatar: string; // 아바타 이미지
}
```

**Features**:

- 실시간 잔액 업데이트 (WebSocket 통해)
- 다중 통화 지원
- 베팅 한도 설정 (사용자별/테이블별)

### 3.2 Lobby & Table Selection

#### 3.2.1 Lobby Interface

**Description**: 사용가능한 바카라 테이블 목록 및 선택 화면

**Key Features**:

- 카지노별 테이블 필터링
- 실시간 테이블 상태 표시
  - 라운드 진행 상황
  - 현재 베팅 가능 여부
  - 테이블 최소/최대 베팅 한도
- 테이블 미리보기 (Road Map)
- 즐겨찾기 테이블

**API Endpoints**:

- `/v1/table/list` - 테이블 목록 조회
- `/v1/table/{tableid}` - 테이블 상세 정보

**WebSocket**:

- `ws://{host}/lobby` - 로비 실시간 업데이트

#### 3.2.2 Multi-Table Navigation

**Description**: 여러 테이블 동시 관리 및 전환

**Technical Implementation** (app/hooks/use-table-navigation.ts):

- URL 쿼리 파라미터로 열린 테이블 관리
- 최적 그리드 레이아웃 자동 계산
- 16:9 비율 유지
- 동적 리사이징 지원

**User Actions**:

- 테이블 추가/제거
- 테이블 간 전환
- 테이블 순서 변경

### 3.3 Live Baccarat Game

#### 3.3.1 Game Interface Components

**Description**: 실시간 바카라 게임 화면 구성 요소

**Core Components**:

1. **Video Stream**
   - 라이브 딜러 비디오 스트리밍
   - 적응형 비트레이트
   - 전체화면 지원

2. **Betting Area**
   - Player 베팅 영역
   - Banker 베팅 영역
   - Tie 베팅 영역
   - Pair 베팅 영역 (Player Pair, Banker Pair)
   - Super 6 베팅 영역 (특정 테이블)

3. **Chip Selection**
   - 다양한 액면가 칩
   - 사용자 커스텀 칩
   - 드래그 앤 드롭 베팅 지원

4. **Road Map**
   - Bead Plate (구슬판)
   - Big Road (육매|본매)
   - Big Eye Boy (중국점 1군)
   - Small Road (중국점 2군)
   - Cockroach Pig (중국점 3군)

5. **Game Statistics**
   - Player/Banker/Tie 승률
   - Pair 출현율
   - 연속 승리 기록

6. **Timer**
   - 베팅 가능 시간 표시
   - 게임 페이즈별 타이머

#### 3.3.2 Betting System

**Description**: 베팅 로직 및 검증 시스템

**Betting Flow**:

1. 사용자 칩 선택
2. 베팅 영역 클릭/드래그
3. 베팅 액션 생성 (app/lib/states/betting.ts)
4. 베팅 검증
   - 잔액 확인
   - 베팅 한도 확인
   - 양방 베팅 방지
5. 서버로 베팅 전송 (WebSocket)
6. 서버 응답 수신
7. 베팅 결과 UI 업데이트

**Bet Action Types**:

```typescript
interface BetAction {
  mode?: string; // 베팅 모드
  tableid: string; // 테이블 ID
  market: string; // 베팅 시장 (player, banker, tie 등)
  value: number; // 베팅 위치 코드
  amount: number; // 베팅 금액
  info?: {
    autobet?: AutobetBetAction; // 오토벳 정보
  };
}

interface CancelBetAction {
  tableid: string;
  value: number;
}

interface ResetBetAction {
  tableid: string;
  mode: string;
}
```

**Betting Positions** (BET_POSITION):

- 1: Player
- 2: Banker
- 3: Player Pair
- 4: Banker Pair
- 5: Tie
- 6: Super 6

**Betting Codes** (BET_CODE):

- 1: Normal (일반 베팅)
- 2: Insurance (보험)
- 3: Tip (팁)

**Validation Rules**:

- 잔액 >= 총 베팅 금액
- 각 마켓 베팅 금액 >= 최소 한도
- 각 마켓 베팅 금액 <= 최대 한도
- Player + Banker 양방 베팅 방지
- 베팅 가능 시간 내 베팅

**Utility Functions** (betUtils):

- `successfulBets()` - 성공한 베팅 필터링
- `cancelledBets()` - 취소된 베팅 필터링
- `settledBets()` - 정산된 베팅 필터링
- `failedBets()` - 실패한 베팅 필터링
- `categorizeBets()` - 베팅 분류
- `totalBetAmounts()` - 총 베팅 금액 계산
- `calcFinalBetLimit()` - 최종 베팅 한도 계산
- `isConflictingMainBets()` - 양방 베팅 체크

#### 3.3.3 Game Phases

**Description**: 게임 진행 단계

**Phases**:

1. **Betting Phase** (페이즈 1)
   - 베팅 접수
   - 타이머 카운트다운
   - 베팅 취소 가능

2. **No More Bets** (페이즈 2)
   - 베팅 마감
   - 카드 딜링 시작

3. **Card Dealing** (페이즈 2-3)
   - Player 카드 2장
   - Banker 카드 2장
   - 3번째 카드 규칙 적용

4. **Result** (페이즈 4)
   - 승패 결정
   - 베팅 정산
   - Road Map 업데이트

5. **Round End** (페이즈 5)
   - 다음 라운드 준비
   - 베팅 히스토리 기록

**Phase Transitions**:

- WebSocket 메시지로 페이즈 변경 통지
- UI 상태 자동 업데이트
- 애니메이션 효과 적용

### 3.4 Autobet System

#### 3.4.1 Autobet Overview

**Description**: 패턴 기반 자동 베팅 시스템

**Key Features**:

- 사용자 정의 베팅 패턴
- 마팅게일 전략 지원
- 승/패 연속 추적
- 수익/손실 목표 설정
- 자동 베팅 일시정지

#### 3.4.2 Autobet Configuration

**State Structure** (app/lib/states/autobet.ts):

**Global Settings**:

```typescript
interface IAutobetSettingStatus {
  betAmount: number; // 초기 베팅 금액
  targetAmount: number; // 목표 수익
  lossLimitAmount: number; // 손실 한도
  bettingMethodInfo: TypeAutobetBetMethodInfo[]; // 베팅 방식
  lossSequence: {
    count: number; // 낙첨 횟수
    rest: number; // 쉬어가기 횟수
    active: boolean; // 활성화 여부
  };
  winSequence: {
    count: number; // 당첨 횟수
    rest: number; // 쉬어가기 횟수
    active: boolean; // 활성화 여부
  };
  activePatterns: number[]; // 활성 패턴 ID
  patternList: TypeAutobetPattern[]; // 패턴 리스트
}
```

**Table-Specific Status**:

```typescript
interface IAutobetTableStatus {
  isStart: boolean; // 오토벳 시작 여부
  isRest: boolean; // 쉬어가기 상태
  isCancel: boolean; // 취소 여부
  isOverBalance: boolean; // 잔액 초과 여부
  currentBetAmount: number; // 현재 베팅 금액
  startBalance: number; // 시작 잔액
  revenueAmount: number; // 수익 금액
  winStreak: number; // 연속 당첨 횟수
  loseStreak: number; // 연속 낙첨 횟수
  betInfo: {
    patternUid: number | null; // 패턴 ID
    betting: string | null; // 베팅 위치
  };
}
```

**Betting Method Info**:

```typescript
interface TypeAutobetBetMethodInfo {
  winning: boolean; // true: 당첨시, false: 낙첨시
  multiple: number; // 배수 (1, 2, 3, 5, 10 등)
  streakCount: number; // 연속 횟수 (0: 매번 적용)
  active: boolean; // 활성화 여부
}
```

#### 3.4.3 Pattern Matching

**Description**: Road Map 패턴 인식 및 매칭

**Pattern Structure**:

```typescript
interface TypeAutobetPattern {
  uid: number; // 패턴 고유 ID
  name: string; // 패턴 이름
  pattern: string[]; // 패턴 배열 (P, B, T)
  betting: 'player' | 'banker' | 'tie'; // 베팅 위치
  active: boolean; // 활성화 여부
}
```

**Pattern Matching Logic** (app/hooks/use-autobet.ts):

1. 최근 Road Map 데이터 가져오기
2. 각 활성 패턴과 비교
3. 패턴 매칭 시 해당 베팅 위치 선택
4. 베팅 금액 계산 (베팅 방식 적용)
5. 자동 베팅 실행

**Example Patterns**:

- `['B', 'B', 'B']` → Banker 연승 3회 후 Player 베팅
- `['P', 'B', 'P', 'B']` → 교차 패턴 후 특정 베팅
- `['T', 'P', 'P']` → Tie 이후 Player 연승 패턴

#### 3.4.4 Autobet Execution Flow

1. **Initialization**
   - 사용자 설정 로드
   - 시작 잔액 기록
   - 오토벳 상태 초기화

2. **Round Start**
   - Road Map 분석
   - 패턴 매칭
   - 베팅 위치 결정

3. **Bet Calculation**
   - 현재 베팅 금액 계산
   - 연속 승/패에 따른 배수 적용
   - 잔액 확인

4. **Bet Execution**
   - 베팅 액션 생성
   - WebSocket으로 베팅 전송
   - 서버 응답 대기

5. **Result Processing**
   - 승/패 판정
   - 수익/손실 계산
   - 연속 카운터 업데이트
   - 쉬어가기 체크

6. **Condition Checks**
   - 목표 수익 달성 시 중단
   - 손실 한도 도달 시 중단
   - 잔액 부족 시 중단
   - 쉬어가기 조건 충족 시 일시정지

7. **Next Round**
   - 다음 라운드 대기
   - 또는 오토벳 종료

### 3.5 Multibet (Multi-Table Betting)

#### 3.5.1 Multibet Overview

**Description**: 여러 테이블에 동일한 베팅을 동시에 적용

**Key Features**:

- 한 번의 베팅으로 여러 테이블 베팅
- 테이블별 베팅 선택/해제
- 테이블별 베팅 금액 개별 조정 가능
- 실시간 베팅 가능 상태 표시

#### 3.5.2 Multibet Interface

**Components**:

- 테이블 목록 (체크박스)
- 칩 선택 UI
- 베팅 영역 (Player, Banker, Tie, Pairs)
- 총 베팅 금액 표시
- 베팅 확인/취소 버튼

**State Management** (app/lib/states/multibet.ts):

```typescript
interface MultibetState {
  selectedTables: string[]; // 선택된 테이블 ID
  bets: Record<string, BetAction[]>; // 테이블별 베팅
  totalAmount: number; // 총 베팅 금액
}
```

#### 3.5.3 Multibet Workflow

1. 사용자가 여러 테이블 선택
2. 베팅 영역 및 금액 선택
3. 각 테이블 베팅 가능 여부 확인
4. 멀티벳 확인 버튼 클릭
5. 선택된 모든 테이블에 베팅 전송
6. 각 테이블별 베팅 결과 수신
7. UI 업데이트

**Validation**:

- 각 테이블 베팅 페이즈 확인
- 테이블별 베팅 한도 확인
- 총 잔액 충분 여부 확인

### 3.6 Road Map & Statistics

#### 3.6.1 Road Map Types

**Description**: 바카라 게임 결과 시각화

**1. Bead Plate (구슬판)**

- 가장 기본적인 Road Map
- 빨강(Banker), 파랑(Player), 초록(Tie)
- 좌→우, 위→아래 순서

**2. Big Road (대로)**

- 가장 많이 사용되는 Road Map
- 연속 결과를 열로 표시
- Tie는 선으로 표시

**3. Derived Roads (파생 로드맵)**

- Big Eye Boy (대안로)
- Small Road (소로)
- Cockroach Pig (갑로)
- 패턴 예측에 활용

**Implementation**:

- GSAP 애니메이션 (app/hooks/use-roadmap-motion.ts)
- SVG 기반 렌더링
- 실시간 업데이트

#### 3.6.2 Game Statistics

**Metrics**:

- Player 승률
- Banker 승률
- Tie 승률
- Player Pair 출현율
- Banker Pair 출현율
- 최장 연승 기록
- 최근 N게임 통계

**Visualization**:

- Chart.js 차트
- 실시간 업데이트
- 다양한 차트 타입 (파이, 바, 라인)

### 3.7 Chat System

#### 3.7.1 Live Chat

**Features**:

- 실시간 채팅
- 이모지 지원
- 사용자 멘션 (@username)
- 채팅 히스토리
- 금지어 필터링

**State** (app/lib/states/chats.ts):

```typescript
interface ChatMessage {
  uid: number;
  username: string;
  message: string;
  timestamp: string;
  avatar?: string;
}
```

**WebSocket Events**:

- `CHAT_MESSAGE` - 채팅 메시지 수신
- `CHAT_SEND` - 채팅 메시지 전송

#### 3.7.2 Chat Moderation

- 스팸 방지
- 욕설 필터
- 사용자 차단
- 관리자 공지

### 3.8 Sound & Audio

#### 3.8.1 Sound System

**Implementation** (app/hooks/use-sounds.ts):

- Howler.js 기반
- 다국어 사운드 지원
- 볼륨 조절
- 음소거 기능

**Sound Types**:

- BGM (배경음악)
- 베팅 효과음
- 승리 효과음
- 알림음
- 버튼 클릭음

**Sound Files**:

```
public/sounds/{locale}/
├── bet.mp3          // 베팅 시
├── win.mp3          // 승리 시
├── lose.mp3         // 패배 시
├── timer.mp3        // 타이머 경고
├── chip.mp3         // 칩 선택
└── notification.mp3 // 알림
```

#### 3.8.2 BGM Management

**Features** (app/hooks/use-bgm.ts):

- 자동 재생
- 반복 재생
- 페이드 인/아웃
- 사용자 설정 저장

### 3.9 Settings & Preferences

#### 3.9.1 User Settings

**Categories**:

**1. Display Settings**

- 테마 (Light/Dark)
- 화면 모드 (일반/전체화면)
- Road Map 표시 옵션
- 통계 표시 옵션

**2. Audio Settings**

- BGM 볼륨
- 효과음 볼륨
- 음소거

**3. Game Settings**

- 베팅 확인 팝업
- 빠른 베팅 모드
- 칩 기본값
- 애니메이션 속도

**4. Notification Settings**

- 베팅 결과 알림
- 잔액 부족 알림
- 오토벳 완료 알림

**State** (app/lib/states/settings.ts):

```typescript
interface SettingsState {
  theme: 'light' | 'dark';
  screenMode: 'normal' | 'fullscreen';
  soundMute: boolean;
  bgmVolume: number;
  effectVolume: number;
  showRoadMap: boolean;
  showStatistics: boolean;
  quickBet: boolean;
  confirmBet: boolean;
  defaultChip: number;
  animationSpeed: 'slow' | 'normal' | 'fast';
  notifications: {
    betResult: boolean;
    lowBalance: boolean;
    autobetComplete: boolean;
  };
}
```

#### 3.9.2 Pet System

**Description**: 사용자 아바타/펫 시스템

**Features**:

- Spine 애니메이션 (@esotericsoftware/spine-player)
- 다양한 펫 캐릭터
- 펫 선택/변경
- 펫 애니메이션 (Idle, Win, Lose)

---

## 4. Real-time Communication

### 4.1 WebSocket Architecture

#### 4.1.1 Connection Management

**Endpoints**:

- `ws://{host}/lobby` - 로비 소켓
- `ws://{host}/{tableid}` - 테이블별 소켓

**Connection Flow**:

1. 사용자 인증 후 소켓 연결
2. 인증 토큰 전송
3. 서버 인증 확인
4. 연결 유지 (Heartbeat)
5. 재연결 로직 (자동)

**Implementation** (app/hooks/use-filtered-socket.ts):

```typescript
useWebSocket(url, {
  share: true, // 연결 공유
  shouldReconnect: () => true, // 자동 재연결
  onOpen: (event) => {}, // 연결 시
  onClose: (event) => {}, // 종료 시
  onError: (event) => {}, // 에러 시
  onMessage: (event) => {}, // 메시지 수신 시
});
```

#### 4.1.2 Message Protocol

**Message Format**:

```json
{
  "type": "MESSAGE_TYPE",
  "status": 200,
  "payload": {}
}
```

**Message Types**:

**Lobby Messages**:

- `TABLE_LIST` - 테이블 목록
- `TABLE_UPDATE` - 테이블 상태 업데이트
- `USER_BALANCE` - 잔액 업데이트

**Game Messages**:

- `ROUND_START` - 라운드 시작
- `BETTING_OPEN` - 베팅 시작
- `BETTING_CLOSE` - 베팅 마감
- `CARD_DEAL` - 카드 딜링
- `ROUND_RESULT` - 라운드 결과
- `BET_RESPONSE` - 베팅 응답
- `BET_CANCEL` - 베팅 취소
- `BALANCE_UPDATE` - 잔액 업데이트

**Chat Messages**:

- `CHAT_MESSAGE` - 채팅 메시지
- `CHAT_HISTORY` - 채팅 히스토리

#### 4.1.3 Message Handling

**Split Messages**:

- 한 프레임에 여러 메시지 포함 가능
- 줄바꿈(`\n`)으로 구분
- 각 메시지 개별 파싱

**Example**:

```javascript
const messages = frame.data.split('\n');
const parsed = messages.map((msg) => JSON.parse(msg));
```

**Filtering**:

- 메시지 타입별 필터링
- 컴포넌트별 필요한 메시지만 구독

### 4.2 State Synchronization

#### 4.2.1 Server → Client

**Update Flow**:

1. 서버에서 WebSocket 메시지 전송
2. 클라이언트 메시지 파싱
3. Jotai atom 업데이트
4. React 컴포넌트 자동 리렌더링

**Example**:

```typescript
// WebSocket 메시지 수신
{ type: 'BALANCE_UPDATE', payload: { balance: 10000 } }

// Atom 업데이트
setUserStatus(prev => ({ ...prev, balance: 10000 }))

// UI 자동 업데이트
const user = useAtomValue(userStatusAtom);
return <div>{user.balance}</div>;
```

#### 4.2.2 Client → Server

**Action Flow**:

1. 사용자 액션 (베팅 등)
2. BetAction 생성
3. Validation (클라이언트)
4. WebSocket 전송
5. 서버 응답 대기
6. 성공/실패 처리

**Example**:

```typescript
// 베팅 액션 생성
const betActions: BetAction[] = [
  { tableid: 'T001', market: 'player', value: 1, amount: 1000 },
];

// Atom 트리거
triggerBet(betActions);

// WebSocket 전송
sendJsonMessage({ type: 'BET', payload: betActions });
```

---

## 5. Responsive Design & Mobile Support

### 5.1 Breakpoints

**Screen Sizes**:

- **Desktop**: ≥ 1280px
- **Tablet**: 768px - 1279px
- **Mobile**: < 768px

**Implementation** (app/hooks/use-responsive.ts):

```typescript
const { isMobile, isTablet, isDesktop, isPhoneDevice } = useResponsive();
```

### 5.2 Mobile-Specific Features

#### 5.2.1 Fullscreen Swipe Mode

**Description**: 모바일에서 스와이프로 전체화면 전환

**Implementation** (app/hooks/use-fullscreen-swipe.ts):

- 위로 스와이프 → 전체화면 진입
- 아래로 스와이프 → 전체화면 해제
- 스크롤 이벤트 감지

#### 5.2.2 Touch Interactions

- 터치 베팅
- 드래그 베팅
- 스와이프 네비게이션
- Pull-to-refresh 비활성화

#### 5.2.3 Mobile Layouts

- Single table view (한 번에 1개 테이블)
- Bottom sheet UI (설정, 멀티벳)
- 가로/세로 모드 지원
- Safe area 처리

### 5.3 Performance Optimization

#### 5.3.1 Code Splitting

- Route-based code splitting (Next.js 자동)
- Dynamic imports
- Lazy loading components

#### 5.3.2 Image Optimization

- Next.js Image component
- WebP 포맷
- Responsive images
- Lazy loading

#### 5.3.3 Rendering Optimization

- React.memo (필요한 경우만)
- useMemo, useCallback
- Virtual scrolling (react-virtuoso)
- Deferred values (useDeferredValue)

#### 5.3.4 Asset Caching

```javascript
// Static asset caching
fonts: 1 day
images: 10 minutes
videos: streaming
```

---

## 6. Internationalization (i18n)

### 6.1 Supported Languages

- **ko**: 한국어 (기본)
- **en**: English
- **zh**: 中文 (중국어)
- **ja**: 日本語 (일본어)
- **th**: ไทย (태국어)
- **vi**: Tiếng Việt (베트남어)

### 6.2 Implementation

**Library**: next-intl

**Routing**:

- Locale은 URL에 표시 안 함 (`localePrefix: 'never'`)
- 쿠키에 locale 저장 (`NEXT_LOCALE`)

**Usage**:

```typescript
// Server Components
const t = await getTranslations('namespace');

// Client Components
const t = useTranslations('namespace');

// 번역
<p>{t('key.subkey')}</p>
```

**Translation Files**:

```
messages/
├── ko/
│   └── translation.json
├── en/
│   └── translation.json
├── zh/
│   └── translation.json
├── ja/
│   └── translation.json
├── th/
│   └── translation.json
└── vi/
    └── translation.json
```

### 6.3 Translation Management

#### 6.3.1 Workflow

1. **Scan**: `npm run scan:i18n` - 코드에서 번역 키 스캔
2. **Upload**: `npm run upload:i18n` - Google Sheets에 업로드
3. **Translate**: Google Sheets에서 번역 작업
4. **Download**: `npm run download:i18n` - 번역 다운로드

#### 6.3.2 Google Sheets Integration

- 중앙 집중식 번역 관리
- 번역가 협업 지원
- 버전 관리

---

## 7. Security & Compliance

### 7.1 Security Measures

#### 7.1.1 Authentication Security

- JWT token with expiration
- Token refresh mechanism
- IP validation
- Platform verification
- Referrer check

#### 7.1.2 Input Validation

- XSS 방지 (xss library)
- SQL Injection 방지 (서버측)
- Zod schema validation
- Form validation

#### 7.1.3 Communication Security

- HTTPS only (production)
- WSS (secure WebSocket)
- CORS 설정
- Rate limiting

#### 7.1.4 Client-side Security

- No sensitive data in localStorage
- Secure cookie flags
- Content Security Policy (CSP)
- Sanitize user input

### 7.2 Data Protection

- 개인정보 암호화 (서버측)
- 최소 권한 원칙
- 감사 로그 (서버측)
- GDPR 준수 (해당되는 경우)

### 7.3 Responsible Gaming

- 베팅 한도 설정
- 손실 한도 설정
- 자가 제외 옵션 (서버측)
- 시간 제한 알림

---

## 8. Service Configuration

### 8.1 Avatar Service

**Description**: 아바타 서비스 전용 플랫폼

**Environment Variable**:

```env
NEXT_PUBLIC_TARGET=avatar
```

**Service Characteristics**:

- Authentication: `/v1/auth/signin/token`
- Validation: `/v1/auth/validatetoken2`
- 특정 카지노 브랜드 UI
- 특화된 기능 세트 (Multibet, Autobet, Road Map 등)

### 8.2 Environment Configurations

**Environments**:

- `local` - 로컬 개발
- `dev` - 개발 서버
- `stage` - 스테이징 서버
- `production` - 프로덕션 서버

**Environment Files**:

```
_env.local
_env.dev
_env.stage
_env.production
```

**Build Commands**:

```bash
npm run build          # dev
npm run build:stage    # stage
npm run build:prod     # production
```

---

## 9. Analytics & Monitoring

### 9.1 User Analytics

**Metrics**:

- 사용자 활동 추적
- 베팅 패턴 분석
- 게임 세션 시간
- 테이블 선호도
- 기능 사용률

### 9.2 Performance Monitoring

**Metrics**:

- FPS (개발 환경)
- 페이지 로드 시간
- API 응답 시간
- WebSocket 연결 상태
- 에러 발생률

### 9.3 Error Tracking

- Console error logging
- WebSocket error tracking
- API error tracking
- User-reported issues

---

## 10. Testing Strategy

### 10.1 Testing Levels

**Unit Testing**:

- Utility functions (betUtils 등)
- State management (atoms)
- Custom hooks

**Component Testing**:

- Storybook으로 컴포넌트 개발
- 격리된 환경에서 테스트

**Integration Testing**:

- API integration
- WebSocket communication
- State synchronization

**E2E Testing**:

- Critical user flows
- Betting workflow
- Multibet workflow
- Autobet workflow

### 10.2 Test Environment

- Storybook for component testing
- Jest for unit testing (설정 필요)
- Testing Library for React components (설정 필요)
- Playwright or Cypress for E2E (설정 필요)

---

## 11. Deployment & DevOps

### 11.1 Build Process

**Steps**:

1. Code quality checks
   ```bash
   npm run stylelint:clear  # SCSS 검사
   npm run lint            # ESLint
   ```
2. Environment selection
   ```bash
   cp _env.{env}.{variant} .env.production
   ```
3. Build
   ```bash
   next build
   ```
4. Start
   ```bash
   next start
   ```

### 11.2 CSS Logical Properties Enforcement

**CRITICAL**: 물리적 CSS 속성 사용 금지

**Stylelint 규칙**:

- `width` → `inline-size`
- `height` → `block-size`
- `margin-top` → `margin-block-start`
- `padding-right` → `padding-inline-end`
- `top` → `inset-block-start`

**Pre-build Check**:

```bash
npm run stylelint:clear  # 빌드 전 자동 실행
```

**Fail on Warnings**:

```bash
--max-warnings 0  # 경고도 빌드 실패 처리
```

### 11.3 Deployment Checklist

- [ ] Environment variables configured
- [ ] Stylelint check passed
- [ ] ESLint check passed
- [ ] Build successful
- [ ] API endpoints verified
- [ ] WebSocket endpoints verified
- [ ] Translation files up to date
- [ ] Static assets uploaded
- [ ] SSL certificate valid
- [ ] Performance tested
- [ ] Security headers configured

---

## 12. Future Enhancements

### 12.1 Planned Features

- **Multi-game Support**: Roulette, Blackjack, Sicbo
- **Tournament Mode**: 토너먼트 베팅 이벤트
- **Social Features**: 친구 시스템, 리더보드
- **Advanced Analytics**: 개인 베팅 통계 대시보드
- **Mobile App**: React Native 앱
- **VR Support**: VR 바카라 경험

### 12.2 Technical Improvements

- Server-Side Rendering 최적화
- GraphQL API (optional)
- Micro-frontend architecture
- Progressive Web App (PWA)
- Offline mode support
- Advanced caching strategies

### 12.3 UX Improvements

- Gesture-based controls
- Voice commands
- Customizable UI themes
- Accessibility enhancements (WCAG)
- Tutorial mode
- AI-powered betting suggestions

---

## 13. Appendix

### 13.1 Glossary

- **Baccarat**: 바카라 카드 게임
- **Road Map**: 게임 결과 시각화 차트
- **Autobet**: 자동 베팅 시스템
- **Multibet**: 멀티 테이블 베팅
- **Atom**: Jotai 상태 단위
- **Derived Road**: 파생 로드맵 (Big Eye Boy, Small Road, Cockroach Pig)
- **Martingale**: 마팅게일 베팅 전략 (패배 시 배팅액 증가)
- **Super 6**: 특정 바카라 게임 규칙

### 13.2 API Documentation

- Swagger/OpenAPI Spec: `/api-docs`
- Generated Types: `app/lib/@swagger/`

### 13.3 Component Storybook

- URL: `http://localhost:6006`
- Command: `npm run storybook`

### 13.4 Development Resources

- Next.js 15 Docs: https://nextjs.org/docs
- React 19 Docs: https://react.dev
- Jotai Docs: https://jotai.org
- TanStack Query Docs: https://tanstack.com/query
- next-intl Docs: https://next-intl-docs.vercel.app

### 13.5 Code Style Guide

- **TypeScript**: Strict mode
- **Components**: Named exports (`export function ComponentName`)
- **Hooks**: `use-kebab-case.ts`
- **Atoms**: `kebab-case.ts` (코드에서 `*Atom` 접미사)
- **SCSS**: CSS Logical Properties only
- **Formatting**: Prettier (2 spaces, single quotes)

### 13.6 Path Aliases

```typescript
@/*                   // 루트 디렉토리
@i18n/*              // i18n/
@styles/*            // app/assets/styles/
@svgs/*              // app/assets/svgs/
@components          // app/components
@components/*        // app/components/
@hooks               // app/hooks
@lib/*               // app/lib/
@states              // app/lib/states
```

---

## 14. Version History

| Version | Date       | Changes              | Author           |
| ------- | ---------- | -------------------- | ---------------- |
| 1.0     | 2025-12-04 | Initial PRD creation | Development Team |

---

## 15. Contact & Support

**Development Team**

- Technical Lead: [Name]
- Product Manager: [Name]
- Email: dev@skyeagles.com

**Issue Tracking**

- GitHub Issues (if applicable)
- JIRA (if applicable)

---

**Document Status**: ✅ Approved
**Next Review Date**: TBD
