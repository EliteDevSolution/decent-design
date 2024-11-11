import React, { useState, useEffect } from 'react'
import { ListboxWrapper } from './ListboxWrapper'
import { Listbox, ListboxItem } from '@nextui-org/react'

export default function TempDesignItem(props: any) {
  const items = [
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Elderberry',
    'Fig',
    'Grape',
  ]

  const [searchedItem, setSearchedItem] = useState<string[]>(items)

  useEffect(() => {
    const filteredItems = items.filter((item) =>
      item.toLowerCase().includes(props.keyword.toLowerCase()),
    )
    setSearchedItem(filteredItems)
  }, [props.keyword])

  return (
    <ListboxWrapper>
      <Listbox aria-label="Listbox Variants" variant="faded">
        {searchedItem.map((item, index) => (
          <ListboxItem key={index} className="mb-1">
            {item}
          </ListboxItem>
        ))}
      </Listbox>
    </ListboxWrapper>
  )
}
