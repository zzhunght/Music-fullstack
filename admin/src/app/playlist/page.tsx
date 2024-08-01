"use client"
import BreadCrumb from '@/components/breadCrumb'
import { TablePlaylist } from '@/components/ui/customs/dataTables/TablePlaylist'
import { AnimatePresence } from 'framer-motion'
import React from 'react'

function Playlist() {
  return (
    <AnimatePresence>
      <div className="flex-1 space-y-4 p-8 pt-6">
        {/* <div>
          <BreadCrumb path="playlist" />
        </div> */}
        <TablePlaylist />
      </div>
    </AnimatePresence>
  )
}

export default Playlist