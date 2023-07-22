import { PartMenu } from '@/components/part-menu'
import { ThemeToggle } from '@/components/theme-toggle'

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col gap-2 items-center justify-start p-2 md:p-12">
            <div className="flex items-center justify-between w-full">
                <div className="font-bold text-xl">
                    AC <span className="font-light">{`// GARAGE`}</span>
                </div>
                <ThemeToggle />
            </div>
            <div className="flex grow w-full h-full gap-2">
                <PartMenu
                    part="HEAD"
                    options={['XRT-420_HEAD', '69420_!XR-HEAD']}
                />
                <PartMenu
                    part="CORE"
                    options={['XRT-420_CORE', '69420_!XR-CORE']}
                />
            </div>
        </main>
    )
}
