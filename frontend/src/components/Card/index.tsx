import * as React from 'react'
import { Card, CardHeader, CardBody, Image } from '@nextui-org/react'

export function AnalizeCard() {
  return (
    <Card className="h-[160px] min-w-[240px] px-2 bg-[#343A40] border-l-[4px] rounded-small border-[#4C88EE]">
      <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
        <p className=" text-[19px] font-bold text-white">Frontend Radio</p>
      </CardHeader>
      <CardBody className="overflow-visible py-4">
        <div className="flex justify-between">
          <p className="text-white font-extrabold text-[40px]">230</p>
          <span className="self-center">
            <svg
              className="w-9 h-9 text-[#4C88EE] text-[20px] "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="M16 0H4a2 2 0 0 0-2 2v1H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM13.929 17H7.071a.5.5 0 0 1-.5-.5 3.935 3.935 0 1 1 7.858 0 .5.5 0 0 1-.5.5Z" />
            </svg>
          </span>
        </div>
      </CardBody>
    </Card>
  )
}
