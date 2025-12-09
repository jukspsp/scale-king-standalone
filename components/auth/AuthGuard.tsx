"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Cookies from "js-cookie";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // 로그인 폼 상태
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        Cookies.set("hospital_auth_token", token, { expires: 1, path: '/' });
        setIsAuthenticated(true);
      } else {
        Cookies.remove("hospital_auth_token", { path: '/' });
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // 로그인 성공 시 onAuthStateChanged가 감지하여 화면을 전환함
    } catch (err: any) {
      setError("로그인 실패: 이메일과 비밀번호를 확인해주세요.");
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // 로그인이 안 되어 있으면 로그인 폼을 보여줌 (리다이렉트 X)
  if (!isAuthenticated) {
     return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-indigo-900">척도왕 (DEV)</h1>
                    <p className="text-xs text-slate-400 mt-1">테스트 환경 로그인</p>
                </div>
                
                {error && <div className="p-3 bg-rose-50 text-rose-600 text-xs rounded-lg">{error}</div>}
                
                <div>
                    <label className="text-xs font-bold text-slate-500 block mb-1">이메일</label>
                    <input 
                        type="email" 
                        className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@test.com"
                    />
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-500 block mb-1">비밀번호</label>
                    <input 
                        type="password" 
                        className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                    />
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors">
                    로그인하고 시작하기
                </button>
            </form>
        </div>
     );
  }

  return <>{children}</>;
}