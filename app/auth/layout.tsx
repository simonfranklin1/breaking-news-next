import React from "react"

const layout = ({ children }: { children: React.ReactNode}) => {
  return (
    <div className="w-screen h-screen flex-center bg-slate-200 fixed top-0 left-0 z-50 overflow-hidden">
        {children}
    </div>
  )
}

export default layout