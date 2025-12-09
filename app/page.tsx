"use client";

import React, { useState } from 'react';
// AuthGuard는 껍데기만 남겨뒀으므로 import 해도 괜찮습니다.
import AuthGuard from "@/components/auth/AuthGuard";
import { LayoutDashboard, LogOut, User } from 'lucide-react';

export default function ScaleKingV2() {
  // [핵심] user를 null이 아니라 '가짜 데이터'로 초기화하여 로그인된 것처럼 속입니다.
  const [user, setUser] = useState<any>({
      uid: "test_admin_id",
      email: "test@admin.com",
      displayName: "테스트 관리자"
  });
  
  const [activeTab, setActiveTab] = useState("dashboard");

  // [중요] onAuthStateChanged(로그인 감지) useEffect를 아예 삭제했습니다.
  // 이걸 남겨두면 Firebase가 "너 로그인 안 했잖아" 하고 user를 null로 바꿔버립니다.

  const handleLogout = () => {
    alert("테스트 버전입니다. 로그아웃되지 않습니다.");
  };

  // user가 있으므로 이 로그인 화면은 절대 나오지 않습니다.
  if (!user) {
    return <div>로그인 화면...</div>;
  }

  // --- 메인 대시보드 ---
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
            <p>로그인 없이 바로 기능을 테스트할 수 있습니다.</p>
          </div>
        )}
        
        {activeTab === 'patients' && <div>환자 관리 컴포넌트 준비중...</div>}
        {activeTab === 'scales' && <div>척도 라이브러리 컴포넌트 준비중...</div>}
        
      </main>
    </div>
  );
}