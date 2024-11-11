import { Providers } from '@/components/MainLayout'
import { AnalizeCard } from '@/components/Card'
import { AnalizeTable } from '@/components/Table'
export default function Dashboard() {
  return (
    <Providers>
      <div className="w-full h-[calc(100vh-63.99px)] bg-[#24292D] px-[85px] pt-16">
        <div className="grid grid-cols-4 gap-8 w-full">
          <AnalizeCard />
          <AnalizeCard />
          <AnalizeCard />
          <AnalizeCard />
        </div>

        <div className="grid grid-cols-4 gap-8 w-full pt-9">
          <AnalizeCard />
          <AnalizeTable />
        </div>
      </div>
    </Providers>
  )
}
