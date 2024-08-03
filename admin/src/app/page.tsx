import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import BreadCrumb from "@/components/breadCrumb";
import { Activity, DiscAlbum, ListMusic, Users } from "lucide-react";
import SongChart from "@/components/chart/SongViewChart";

export default function Home() {
    return (
        <>
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div>
                    <BreadCrumb path="" />
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Bài hát
                            </CardTitle>
                            <ListMusic strokeWidth={1.5} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">49</div>
                            
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Nghệ sĩ
                            </CardTitle>
                            <Users strokeWidth={1.5} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">30</div>
                            
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Album
                            </CardTitle>
                            <DiscAlbum strokeWidth={1.5} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">34</div>
                            
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Số lượng người dùng
                            </CardTitle>
                            <Users strokeWidth={1.5} />

                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">73</div>
                            
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <SongChart/>
                </div>
            </div>
        </>
    );
}
