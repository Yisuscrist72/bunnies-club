import clsx from "clsx";

interface SectionLayoutProps {
	id?: string;
	className?: string;
	children: React.ReactNode;
	noPadding?: boolean;
}

export default function SectionLayout({
	id,
	className,
	children,
	noPadding,
}: SectionLayoutProps) {
	return (
		<section
			id={id}
			className={clsx(
				"flex w-full h-fit mx-auto max-w-8xl onHover",
				{
					"px-0": noPadding,
					"px-4 min-[768px]:px-6 8xl:px-0": !noPadding,
				},
				className,
			)}
		>
			{children}
		</section>
	);
}
