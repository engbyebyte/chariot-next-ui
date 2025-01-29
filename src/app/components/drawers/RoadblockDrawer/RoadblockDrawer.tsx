import React from "react";
import {
    Drawer,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { TrafficConeIcon, Info } from "lucide-react";
import Roadblock from "./Roadblock";
import Divider from "../../Divider";
import { Switch } from "@/components/ui/switch";
import { roadBlockAtom } from "@/atoms/road-block";
import { drawerAtom } from "@/atoms/drawer";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { Analytics } from "@/utils/mixpanel";

function RoadblockDrawer() {
    const [isDisplayedOnMap, setIsDisplayedOnMap] = useAtom(roadBlockAtom);
    const [currentDrawer, setCurrentDrawer] = useAtom(drawerAtom);
    const t = useTranslations();

    const handleVisibilityChange = (newState: boolean) => {
        Analytics.track("Roadblock Visibility Changed", {
            action: newState ? "show" : "hide",
            timestamp: new Date().toISOString(),
            visibilityState: newState,
        });
        setIsDisplayedOnMap(newState);
    };

    const roads = [
        {
            streetName: "Jalan Kebun Bunga / Lorong Air Terjun",
            duration: "10/02/2025 - 12/02/2025",
            type: "closure",
        },
        {
            streetName: "Lorong Air Terjun / Jalan Gottlieb",
            duration: "10/02/2025 - 12/02/2025",
            type: "closure",
        },
        {
            streetName: "Jalan Utama / Jalan Macalister",
            duration: "10/02/2025 - 12/02/2025",
            type: "closure",
        },
        {
            streetName: "Jalan Gotlieb / Jalan Burma",
            duration: "10/02/2025 - 12/02/2025",
            type: "control",
        },
        {
            streetName: "Jalan Brown / Jalan Tunku Abdul Rahman",
            duration: "10/02/2025 - 12/02/2025",
            type: "control",
        },
        {
            streetName: "Lorong Air Terjun",
            duration: "10/02/2025 - 12/02/2025",
            type: "control",
        },
        {
            streetName: "Jalan D.S Ramanathan / Jalan Gottlieb",
            duration: "10/02/2025 - 12/02/2025",
            type: "control",
        },
        {
            streetName: "Jalan D.S Ramanathan / Jalan Brown",
            duration: "10/02/2025 - 12/02/2025",
            type: "control",
        },
        {
            streetName: "Jalan Tunku Abdul Rahman / Jalan Brown",
            duration: "10/02/2025 - 12/02/2025",
            type: "control",
        },
        {
            streetName: "Jalan Cantonment / Jalan Tunku Abdul Rahman",
            duration: "10/02/2025 - 12/02/2025",
            type: "control",
        },
        {
            streetName: "Jalan Utama / Jalan Nunn",
            duration: "10/02/2025 - 12/02/2025",
            type: "control",
        },
    ];

    return (
        <Drawer
            open={currentDrawer === "roadblock"}
            onOpenChange={(open) => {
                setCurrentDrawer(open ? "roadblock" : null);
            }}
        >
            <DrawerTrigger asChild>
                <button>
                    <TrafficConeIcon className="stroke-primary-850 dark:stroke-primary-150 size-4 lg:size-6" />
                </button>
            </DrawerTrigger>
            <DrawerContent className="px-3 w-full">
                <div className="py-5 gap-y-3 flex flex-col w-full overflow-y-auto max-h-[50%]">
                    <DrawerTitle className="py-3 flex justify-between items-center">
                        <span className="font-control opacity-70 dark:opacity-90">
                            {t("Roadblock.drawer.title")}
                        </span>
                        <div className="flex items-center space-x-2">
                            <Switch
                                checked={isDisplayedOnMap}
                                onCheckedChange={handleVisibilityChange}
                                className="
                  relative inline-flex h-5 w-10 shrink-0 cursor-pointer 
                  rounded-full border-2 border-transparent 
                  transition-colors duration-200 ease-in-out
                  data-[state=checked]:bg-primary-500 
                  data-[state=unchecked]:bg-gray-200
                  data-[state=checked]:dark:bg-primary-600
                  data-[state=unchecked]:dark:bg-primary-150
                "
                            />
                            <label className="text-sm font-control">
                                {isDisplayedOnMap
                                    ? t("common.switch.hide")
                                    : t("common.switch.show")}
                            </label>
                        </div>
                    </DrawerTitle>
                    <Divider />
                    <div className="flex flex-col gap-y-4">
                        {roads.map((type) => (
                            <Roadblock
                                key={type.streetName}
                                streetName={type.streetName}
                                type={type.type as "closure" | "control"}
                                duration={type.duration}
                            />
                        ))}
                    </div>
                    <div className="pt-4">
                        <a
                            href="https://www.mkn.gov.my/web/ms/2023/02/02/kenyataan-media-ketua-polis-pulau-pinang-sempena-perayaan-thaipusam-tahun-2023/"
                            target="_blank"
                            className="text-sm text-blue-500 underline flex items-center gap-1"
                        >
                            <Info size={14} />
                            <span>{t("Roadblock.drawer.statement")}</span>
                        </a>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}

export default RoadblockDrawer;
