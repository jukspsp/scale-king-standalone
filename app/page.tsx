"use client";

import React, { useState, useEffect } from 'react';
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { LayoutDashboard, LogOut, User } from 'lucide-react';

// 기능별 컴포넌트 (나중에 파일을 만들어서 import 할 것입니다)
// import ScaleLibrary from '@/components/ScaleLibrary';
// import PatientList from '@/components/PatientList';

export default function ScaleKingV2() {
  // [핵심 수정] user 초기값을 null이 아니라 '가짜 유저 객체'로 설정합니다.
  const [user, setUser] = useState<any>({
      uid: "guest_tester_123",
      email: "guest@test.com",
      displayName: "테스트 관리자"
  });
  
  // ... (나머지 state들은 그대로 유지) ...

  // [수정] useEffect에서 실제 로그인 체크 로직을 주석 처리하거나 제거합니다.
  /* useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // 여기 로직은 실제 로그인 때만 필요하므로 주석 처리
    });
    return () => unsubscribe();
  }, []);
  */

  // [수정] 로그아웃 버튼도 사실상 필요 없지만, 누르면 알림만 뜨게 변경
  const handleLogout = async () => {
    alert("테스트 모드입니다. 로그아웃되지 않습니다.");
  };

  // --- 1. 로그인 화면 (비로그인 시) --- 
  // user가 이미 가짜 값으로 채워져 있으므로 이 부분은 절대 실행되지 않습니다.
  // (코드 삭제 또는 그대로 두셔도 무방합니다.)

  // --- 2. 메인 대시보드 (로그인 후) ---
  // 여기부터 렌더링 됩니다.
  return (
    <div className="flex h-screen overflow-hidden">
      {/* 사이드바 */}
      <aside className="w-64 bg-[#1e1b4b] text-indigo-100 flex flex-col">
        <div className="p-6 font-bold text-xl text-white border-b border-indigo-800 flex items-center gap-2">
          <LayoutDashboard/> 척도왕 V2
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab("dashboard")} className={`w-full text-left p-3 rounded-lg transition-colors ${activeTab==='dashboard' ? 'bg-indigo-600 text-white' : 'hover:bg-white/10'}`}>
            대시보드
          </button>
          <button onClick={() => setActiveTab("patients")} className={`w-full text-left p-3 rounded-lg transition-colors ${activeTab==='patients' ? 'bg-indigo-600 text-white' : 'hover:bg-white/10'}`}>
            환자 관리
          </button>
          <button onClick={() => setActiveTab("scales")} className={`w-full text-left p-3 rounded-lg transition-colors ${activeTab==='scales' ? 'bg-indigo-600 text-white' : 'hover:bg-white/10'}`}>
            척도 라이브러리
          </button>
          <button onClick={() => setActiveTab("sets")} className={`w-full text-left p-3 rounded-lg transition-colors ${activeTab==='sets' ? 'bg-indigo-600 text-white' : 'hover:bg-white/10'}`}>
            세트 관리
          </button>
          <button onClick={() => setActiveTab("cycles")} className={`w-full text-left p-3 rounded-lg transition-colors ${activeTab==='cycles' ? 'bg-indigo-600 text-white' : 'hover:bg-white/10'}`}>
            주기 관리
          </button>
        </nav>
        <div className="p-4 border-t border-indigo-800">
          <div className="flex items-center gap-2 mb-3 text-xs text-indigo-300">
            <User size={14}/> {user.email}
          </div>
          <button onClick={handleLogout} className="w-full py-2 bg-indigo-900 hover:bg-rose-600 text-white rounded-lg text-sm flex items-center justify-center gap-2 transition-colors">
            <LogOut size={16}/> 로그아웃
          </button>
        </div>
      </aside>

      {/* 메인 컨텐츠 영역 */}
      <main className="flex-1 bg-slate-50 p-8 overflow-y-auto">
        {activeTab === 'dashboard' && (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <LayoutDashboard size={64} className="mb-4 opacity-20"/>
            <h2 className="text-2xl font-bold text-slate-600">척도왕 V2 개발 환경</h2>
            <p>좌측 메뉴를 선택하여 기능을 개발/테스트하세요.</p>
          </div>
        )}
        
        {/* 여기에 나중에 컴포넌트를 하나씩 끼워넣을 겁니다 */}
        {activeTab === 'patients' && <div>환자 관리 컴포넌트가 들어갈 자리</div>}
        {activeTab === 'scales' && <div>척도 라이브러리 컴포넌트가 들어갈 자리</div>}
        
      </main>
    </div>
  );
}