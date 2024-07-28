import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import BreadCrumb from "@/components/breadCrumb";
import { Activity, DiscAlbum, ListMusic, Users } from "lucide-react";

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
                                Number of songs
                            </CardTitle>
                            <ListMusic strokeWidth={1.5} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">49</div>
                            <p className="text-xs text-muted-foreground">
                                +20.1% from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Number of artists
                            </CardTitle>
                            <Users strokeWidth={1.5} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">30</div>
                            <p className="text-xs text-muted-foreground">
                                +180.1% from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Number of albums
                            </CardTitle>
                            <DiscAlbum strokeWidth={1.5} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">34</div>
                            <p className="text-xs text-muted-foreground">
                                +19% from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Active Now
                            </CardTitle>
                            <Activity strokeWidth={1.5} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">73</div>
                            <p className="text-xs text-muted-foreground">
                                +201 since last hour
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
