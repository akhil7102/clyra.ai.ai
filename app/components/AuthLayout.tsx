import type React from 'react'

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="relative flex items-center justify-center p-6 md:p-10 bg-white">
        <div className="w-full max-w-md">{children}</div>
      </div>
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 text-white p-10">
        <div className="max-w-md space-y-4">
          <div className="text-4xl font-extrabold">Welcome</div>
          <div className="text-lg opacity-90">Build with clean, minimal UI and smooth interactions.</div>
        </div>
      </div>
    </div>
  )
}