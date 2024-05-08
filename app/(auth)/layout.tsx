import React from "react"

const layout = ({ children }: { children: React.ReactNode}) => {
  return (
    <div className="w-screen h-screen flex-center bg-slate-200">
        {children}
    </div>
  )
}

export default layout