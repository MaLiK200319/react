import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import { cn } from "../../lib/utils";

export const FloatingDock = ({ items, className }) => {
    let mouseX = useMotionValue(Infinity);

    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className={cn(
                "mx-auto flex h-16 items-end gap-4 rounded-2xl bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 px-4 pb-3 shadow-2xl",
                className
            )}
        >
            {items.map((item) => (
                <IconContainer mouseX={mouseX} key={item.title} {...item} />
            ))}
        </motion.div>
    );
};

function IconContainer({ mouseX, title, icon, href, onClick }) {
    let ref = useRef(null);

    let distance = useTransform(mouseX, (val) => {
        let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

    let width = useSpring(widthTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });
    let height = useSpring(heightTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    const [hovered, setHovered] = useState(false);

    const content = (
        <motion.div
            ref={ref}
            style={{ width, height }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
            className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative cursor-pointer shadow-lg hover:bg-blue-500 dark:hover:bg-blue-600 transition-colors group"
        >
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: 2, x: "-50%" }}
                        className="px-2 py-0.5 whitespace-pre rounded-md bg-white dark:bg-neutral-900 border dark:border-neutral-800 text-neutral-700 dark:text-neutral-200 absolute left-1/2 -translate-x-1/2 -top-10 w-fit text-xs font-semibold shadow-xl"
                    >
                        {title}
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="flex items-center justify-center text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors duration-200">
                {icon}
            </div>
        </motion.div>
    );

    if (href) {
        return (
            <Link to={href} smooth={true} duration={500} offset={-100}>
                {content}
            </Link>
        );
    }

    return content;
}
