"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Cookies from "js-cookie";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        Cookies.set("hospital_auth_token", token, { expires: 1, path: '/' });
        setIsAuthenticated(true);
      } else {
        Cookies.remove("hospital_auth_token", { path: '/' });
        setIsAuthenticated(false);
        // 테스트용이므로 로그인 페이지 리다이렉트는 일단 뺍니다.
        // 대신 로그인 버튼을 보여주는 식으로 처리할 예정입니다.
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <div className="h-screen flex items-center justify-center">로딩중...</div>;
  }

  // 로그인이 안되어 있으면 로그인 유도 화면 표시 (간단 버전)
  if (!isAuthenticated) {
     return (
        <div className="h-screen flex flex-col items-center justify-center gap-4">
            <h2 className="text-xl font-bold">로그인이 필요합니다</h2>
            <p className="text-gray-500">이전 프로젝트의 메인 화면에서 로그인을 먼저 해주세요.</p>
            <a href="https://www.mentalhospital.co.kr" className="px-4 py-2 bg-indigo-600 text-white rounded">메인으로 이동</a>
        </div>
     );
  }

  return <>{children}</>;
}