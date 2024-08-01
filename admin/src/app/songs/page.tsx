"use client";

import BreadCrumb from "@/components/breadCrumb";
import { TableSongs } from "@/components/ui/customs/dataTables/tableSongs";

const Songs = () => {

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            {/* <div>
                <BreadCrumb path="Songs" />
            </div> */}
            <TableSongs />
        </div>
    );
};

export default Songs;
