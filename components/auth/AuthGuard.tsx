"use client";

import React from "react";

// 인증 검사 없이 무조건 통과시키는 가짜 가드
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}