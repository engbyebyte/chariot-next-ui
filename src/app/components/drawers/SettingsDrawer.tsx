import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { drawerAtom } from "@/atoms/drawerAtom";
import {
    Drawer,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
    Settings,
    ChevronDown,
    Moon,
    Sun,
    Computer,
    ChevronRight,
} from "lucide-react";
import { useTranslations } from "next-intl";
import ThemeDrawer from "./ThemeDrawer";
import LanguageDrawer from "./LanguageDrawer";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Divider from "../Divider";
import { TSelectableItem } from "@/constants/types";

function SettingsDrawer() {
    const { theme } = useTheme();
    const t = useTranslations("Settings");
    const pathname = usePathname();
    const currentLanguage = pathname.split("/")[1] || "en";
    const [isThemeDrawerOpen, setIsThemeDrawerOpen] = useState(false);
    const [isLanguageDrawerOpen, setIsLanguageDrawerOpen] = useState(false);
    const [currentDrawer, setCurrentDrawer] = useAtom(drawerAtom);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (currentDrawer && currentDrawer.type !== "settings") {
            setIsOpen(false);
        }
    }, [currentDrawer]);

    const getLanguageIcon = (lang: string) => {
        const baseClasses =
            "size-8 rounded-full flex items-center justify-center text-xs font-medium bg-primary-850 dark:bg-primary-150 text-white dark:text-gray-900 uppercase";
        return <div className={baseClasses}>{lang}</div>;
    };

    const getThemeIcon = () => {
        if (theme === "dark") {
            return (
                <Moon
                    size={32}
                    className="stroke-primary-850 dark:stroke-primary-150"
                />
            );
        } else if (theme === "light") {
            return (
                <Sun
                    size={32}
                    className="stroke-primary-850 dark:stroke-primary-150"
                />
            );
        }
        return (
            <Computer
                size={32}
                className="stroke-primary-850 dark:stroke-primary-150"
            />
        );
    };

    const handleItemChange = (value: string) => {
        if (value === "theme") {
            setIsThemeDrawerOpen(true);
            setCurrentDrawer({ type: "theme" });
            setIsOpen(false);
        } else if (value === "language") {
            setIsLanguageDrawerOpen(true);
            setCurrentDrawer({ type: "language" });
            setIsOpen(false);
        }
    };

    const selectableItems: TSelectableItem[] = [
        {
            title: t("theme.tab"),
            value: "theme",
            description: "",
            logo: getThemeIcon(),
        },
        {
            title: t("language.tab"),
            value: "language",
            description: "",
            logo: getLanguageIcon(currentLanguage),
        },
    ];

    return (
        <>
            <Drawer
                open={isOpen}
                onOpenChange={(open) => {
                    setIsOpen(open);
                    setCurrentDrawer(open ? { type: "settings" } : null);
                }}
            >
                <DrawerTrigger asChild>
                    <Button>
                        <Settings
                            size={24}
                            strokeWidth={1.5}
                            className="stroke-primary-850 dark:stroke-primary-150"
                        />
                        <span className="capitalize hidden min-[450px]:block">
                            {t("title")}
                        </span>
                        <ChevronDown className="ml-1" size={20} />
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="px-3 w-full">
                    <div className="py-5 gap-y-3 flex flex-col w-full">
                        <DrawerTitle className="font-control opacity-70 dark:opacity-90 py-3 mb-2">
                            {t("title")}
                        </DrawerTitle>
                        <Divider />
                        <div className="flex flex-col md:flex-row md:justify-center md:items-start w-full gap-4 md:gap-6">
                            {selectableItems.map((item) => (
                                <button
                                    key={item.value}
                                    onClick={() => handleItemChange(item.value)}
                                    className="flex items-center justify-between w-full p-3 rounded-md cursor-pointer"
                                >
                                    <div className="flex items-center space-x-2">
                                        <div>{item.logo}</div>
                                        <div className="flex flex-col px-2 md:px-0">
                                            <span className="text-lg font-semibold text-primary-850 dark:text-primary-50 capitalize">
                                                {item.title}
                                            </span>
                                            <span className="text-sm text-primary-800 dark:text-primary-100">
                                                {item.description}
                                            </span>
                                        </div>
                                    </div>
                                    <ChevronRight
                                        size={20}
                                        className="stroke-primary-850 dark:stroke-primary-150"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>

            <ThemeDrawer
                isOpen={isThemeDrawerOpen}
                onClose={() => setIsThemeDrawerOpen(false)}
            />

            <LanguageDrawer
                isOpen={isLanguageDrawerOpen}
                onClose={() => setIsLanguageDrawerOpen(false)}
            />
        </>
    );
}

export default SettingsDrawer;
