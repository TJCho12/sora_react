import React from 'react';

export default function ProjectStructureDiagram() {
  return (
    <div className="w-full p-8 bg-gradient-to-br from-pink-50 via-orange-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl mb-8 text-center text-gray-800">
          🏥 SoRa Clinic - 프로젝트 구조도
        </h1>
        
        {/* 전체 아키텍처 */}
        <div className="mb-12">
          <h2 className="text-2xl mb-6 text-gray-700">📋 전체 아키텍처</h2>
          <div className="bg-white rounded-lg p-6 shadow-lg border">
            <div className="text-center">
              <div className="inline-block bg-tiffany text-white px-4 py-2 rounded-lg mb-4">
                App.tsx (Main Entry Point)
              </div>
              
              <div className="flex justify-center items-center gap-8 mt-8">
                <div className="text-center">
                  <div className="bg-pink-100 border-2 border-pink-300 rounded-lg p-4 mb-2">
                    <strong>Frontend (React)</strong>
                    <div className="text-sm mt-2">Navigation, Pages, Components</div>
                  </div>
                </div>
                
                <div className="text-2xl">↔️</div>
                
                <div className="text-center">
                  <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-4 mb-2">
                    <strong>Backend (Supabase)</strong>
                    <div className="text-sm mt-2">Auth, Database, Edge Functions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 컴포넌트 계층 구조 */}
        <div className="mb-12">
          <h2 className="text-2xl mb-6 text-gray-700">🏗️ 컴포넌트 계층 구조</h2>
          <div className="bg-white rounded-lg p-6 shadow-lg border">
            {/* App.tsx 레벨 */}
            <div className="text-center mb-8">
              <div className="inline-block bg-tiffany text-white px-6 py-3 rounded-lg text-lg">
                App.tsx
              </div>
            </div>

            {/* 메인 컴포넌트들 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="bg-purple-100 border-2 border-purple-300 rounded-lg p-4">
                  <div className="font-semibold text-purple-800 mb-2">🧭 Navigation</div>
                  <div className="text-sm text-purple-600">
                    • 햄버거 메뉴<br/>
                    • 반응형 네비게이션<br/>
                    • 페이지 라우팅
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4">
                  <div className="font-semibold text-green-800 mb-2">📱 Pages (동적)</div>
                  <div className="text-sm text-green-600">
                    • HomePage<br/>
                    • EventPage<br/>
                    • AboutPage<br/>
                    • TreatmentsPage<br/>
                    • AdminPage
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-orange-100 border-2 border-orange-300 rounded-lg p-4">
                  <div className="font-semibold text-orange-800 mb-2">🦶 Footer</div>
                  <div className="text-sm text-orange-600">
                    • 연락처 정보<br/>
                    • 소셜 미디어<br/>
                    • 회사 정보
                  </div>
                </div>
              </div>
            </div>

            {/* 오버레이 컴포넌트들 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="bg-red-100 border-2 border-red-300 rounded-lg p-4">
                  <div className="font-semibold text-red-800 mb-2">📅 BookingModal</div>
                  <div className="text-sm text-red-600">
                    • 예약 폼<br/>
                    • Supabase 연동<br/>
                    • 유효성 검사
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-4">
                  <div className="font-semibold text-yellow-800 mb-2">🔔 Toaster</div>
                  <div className="text-sm text-yellow-600">
                    • 알림 시스템<br/>
                    • 성공/오류 메시지<br/>
                    • 사용자 피드백
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 페이지별 상세 구조 */}
        <div className="mb-12">
          <h2 className="text-2xl mb-6 text-gray-700">📄 페이지별 컴포넌트 구조</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* HomePage */}
            <div className="bg-white rounded-lg p-6 shadow-lg border">
              <h3 className="text-lg font-semibold mb-4 text-tiffany">🏠 HomePage</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-gray-100 p-2 rounded">• Hero Section (메인 비주얼)</div>
                <div className="bg-gray-100 p-2 rounded">• BeautyCarousel (트리트먼트 소개)</div>
                <div className="bg-gray-100 p-2 rounded">• ContactSection (연락처)</div>
                <div className="bg-gray-100 p-2 rounded">• PageLayout (공통 레이아웃)</div>
              </div>
            </div>

            {/* AdminPage */}
            <div className="bg-white rounded-lg p-6 shadow-lg border">
              <h3 className="text-lg font-semibold mb-4 text-tiffany">⚙️ AdminPage</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-gray-100 p-2 rounded">• 예약 관리 대시보드</div>
                <div className="bg-gray-100 p-2 rounded">• 문의 관리 시스템</div>
                <div className="bg-gray-100 p-2 rounded">• 통계 및 차트</div>
                <div className="bg-gray-100 p-2 rounded">• Supabase 백엔드 연동</div>
              </div>
            </div>

            {/* EventPage */}
            <div className="bg-white rounded-lg p-6 shadow-lg border">
              <h3 className="text-lg font-semibold mb-4 text-tiffany">🎉 EventPage</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-gray-100 p-2 rounded">• 이벤트 목록</div>
                <div className="bg-gray-100 p-2 rounded">• 프로모션 정보</div>
                <div className="bg-gray-100 p-2 rounded">• 특별 혜택</div>
              </div>
            </div>

            {/* TreatmentsPage */}
            <div className="bg-white rounded-lg p-6 shadow-lg border">
              <h3 className="text-lg font-semibold mb-4 text-tiffany">💄 TreatmentsPage</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-gray-100 p-2 rounded">• 뷰티 팁 섹션</div>
                <div className="bg-gray-100 p-2 rounded">• K-beauty 트렌드</div>
                <div className="bg-gray-100 p-2 rounded">• 스킨케어 가이드</div>
              </div>
            </div>
          </div>
        </div>

        {/* 백엔드 구조 */}
        <div className="mb-12">
          <h2 className="text-2xl mb-6 text-gray-700">🔧 백엔드 아키텍처 (Supabase)</h2>
          <div className="bg-white rounded-lg p-6 shadow-lg border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-4">
                  <div className="font-semibold text-blue-800 mb-2">🗄️ Database</div>
                  <div className="text-sm text-blue-600">
                    • kv_store_3336005e<br/>
                    • 예약 데이터<br/>
                    • 문의 데이터
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-indigo-100 border-2 border-indigo-300 rounded-lg p-4">
                  <div className="font-semibold text-indigo-800 mb-2">⚡ Edge Functions</div>
                  <div className="text-sm text-indigo-600">
                    • /supabase/functions/server/<br/>
                    • API 라우팅<br/>
                    • 데이터 처리
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-cyan-100 border-2 border-cyan-300 rounded-lg p-4">
                  <div className="font-semibold text-cyan-800 mb-2">🔐 Auth & Utils</div>
                  <div className="text-sm text-cyan-600">
                    • 인증 시스템<br/>
                    • /utils/supabase/info<br/>
                    • 환경 변수
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 디렉토리 구조 */}
        <div className="mb-12">
          <h2 className="text-2xl mb-6 text-gray-700">📁 파일 디렉토리 구조</h2>
          <div className="bg-white rounded-lg p-6 shadow-lg border">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-3 text-gray-700">📂 /components</h4>
                <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-1">
                  <div>• <strong>pages/</strong> - 페이지 컴포넌트들</div>
                  <div>• <strong>ui/</strong> - shadcn UI 라이브러리</div>
                  <div>• <strong>constants/</strong> - 데이터 상수</div>
                  <div>• BeautyCarousel.tsx</div>
                  <div>• BookingModal.tsx</div>
                  <div>• Navigation.tsx</div>
                  <div>• Footer.tsx</div>
                  <div>• ContactSection.tsx</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-gray-700">📂 /styles & /utils</h4>
                <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-1">
                  <div>• <strong>/styles/</strong></div>
                  <div>&nbsp;&nbsp;- globals.css (Tailwind V4)</div>
                  <div>• <strong>/utils/supabase/</strong></div>
                  <div>&nbsp;&nbsp;- info.tsx</div>
                  <div>• <strong>/supabase/functions/</strong></div>
                  <div>&nbsp;&nbsp;- server/index.tsx</div>
                  <div>&nbsp;&nbsp;- server/kv_store.tsx</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 주요 기능 및 기술 스택 */}
        <div className="mb-12">
          <h2 className="text-2xl mb-6 text-gray-700">🛠️ 기술 스택 & 주요 기능</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-lg border">
              <h3 className="text-lg font-semibold mb-4 text-tiffany">🎨 Frontend</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-tiffany rounded-full"></span>
                  React 18 + TypeScript
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-tiffany rounded-full"></span>
                  Tailwind CSS v4 (Airy Minimalism)
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-tiffany rounded-full"></span>
                  shadcn/ui 컴포넌트
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-tiffany rounded-full"></span>
                  Lucide React 아이콘
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-tiffany rounded-full"></span>
                  Motion (애니메이션)
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg border">
              <h3 className="text-lg font-semibold mb-4 text-tiffany">⚙️ Backend & Features</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Supabase (Database + Auth)
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  실시간 예약 시스템
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  관리자 대시보드
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  문의 접수 시스템
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  반응형 모바일 지원
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 데이터 플로우 */}
        <div>
          <h2 className="text-2xl mb-6 text-gray-700">🔄 데이터 플로우</h2>
          <div className="bg-white rounded-lg p-6 shadow-lg border">
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-pink-100 border-2 border-pink-300 rounded-lg p-4 text-center">
                <strong>사용자 액션</strong><br/>
                <span className="text-sm">(예약, 문의, 페이지 이동)</span>
              </div>
              
              <div className="text-2xl">⬇️</div>
              
              <div className="bg-purple-100 border-2 border-purple-300 rounded-lg p-4 text-center">
                <strong>React 컴포넌트</strong><br/>
                <span className="text-sm">(이벤트 핸들링, 상태 관리)</span>
              </div>
              
              <div className="text-2xl">⬇️</div>
              
              <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-4 text-center">
                <strong>Supabase API</strong><br/>
                <span className="text-sm">(데이터베이스 처리, 인증)</span>
              </div>
              
              <div className="text-2xl">⬇️</div>
              
              <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4 text-center">
                <strong>UI 업데이트</strong><br/>
                <span className="text-sm">(피드백, 데이터 표시)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}