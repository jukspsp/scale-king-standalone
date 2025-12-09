"use client";

import React, { useState, useEffect } from 'react';
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { LayoutDashboard, LogOut, User } from 'lucide-react';

// 기능별 컴포넌트 (나중에 파일을 만들어서 import 할 것입니다)
// import ScaleLibrary from '@/components/ScaleLibrary';
// import PatientList from '@/components/PatientList';

export default function ScaleKingV2() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");

  // 로그인 상태 확인
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // 로그인 핸들러
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      alert("로그인 실패: " + error.message);
    }
  };

  // 로그아웃 핸들러
  const handleLogout = async () => {
    await signOut(auth);
  };

  // --- 1. 로그인 화면 (비로그인 시) ---
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4">
          <h1 className="text-2xl font-bold text-center text-indigo-700">척도왕 V2 (Dev)</h1>
          <p className="text-center text-slate-400 text-sm">독립 개발 환경입니다.</p>
          <input 
            type="email" placeholder="이메일" value={email} onChange={e=>setEmail(e.target.value)}
            className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input 
            type="password" placeholder="비밀번호" value={password} onChange={e=>setPassword(e.target.value)}
            className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700">
            로그인 / 회원가입 자동체크
          </button>
        </form>
      </div>
    );
  }

  // --- 2. 메인 대시보드 (로그인 후) ---
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