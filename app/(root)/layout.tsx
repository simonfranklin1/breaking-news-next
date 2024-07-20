import { Footer, Navbar } from '@/components'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            <div className="max-w-[1100px] mx-auto px-6 sm:px-8 xl:px-0">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default layout