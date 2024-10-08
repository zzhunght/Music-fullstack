"use client";
import BreadCrumb from "@/components/breadCrumb";
import { TableArtists } from "@/components/ui/customs/dataTables/tableArtists";
import { AnimatePresence } from "framer-motion";
const Artist = () => {
    return (
        <AnimatePresence>
            <div className="flex-1 space-y-4 p-8 pt-6">
                {/* <div>
                    <BreadCrumb path="artists" />
                </div> */}
                <TableArtists />
            </div>
        </AnimatePresence>
    );
};

export default Artist;
