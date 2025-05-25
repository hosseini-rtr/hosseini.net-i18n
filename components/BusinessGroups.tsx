import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { BusinessGroup } from "@/types/TPost";


export default function BusinessGroups() {
    const t = useTranslations("BusinessGroups");

    const groups: BusinessGroup[] = [
        {
            title: "Graph-inc",
            description: t("group1.description"),
            image: "/assets/groups/hober.png",
        },
        {
            title: "Neerus",
            description: t("group2.description"),
            image: "/assets/groups/hober.png",
        },
        {
            title: "Datam Dynamics",
            description: t("group3.description"),
            image: "/assets/groups/hober.png",
        },
    ];

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {groups.map((group, index) => (
                    <motion.div
                        key={index}
                        className="group relative bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-white/20 transition-all duration-500"
                        initial={{ opacity: 0, y: 50, rotateY: -15 }}
                        whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.5 }}
                        viewport={{ once: true }}
                        style={{ transformStyle: "preserve-3d" }}
                        whileHover={{ scale: 1.05, rotateY: 15 }}
                    >
                        <div className="relative h-48 w-full mb-4 overflow-hidden">
                            <Image
                                src={group.image}
                                alt={group.title}
                                fill
                                className="object-cover transform transition-transform group-hover:scale-110 duration-500"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-3 transform transition-transform group-hover:translate-z-10">
                                {group.title}
                            </h3>
                            <p className="text-gray-400 transform transition-transform group-hover:translate-z-5">
                                {group.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}