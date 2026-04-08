"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  IconFacebook,
  IconInstagram,
  IconSpotify,
  IconX,
} from "../atoms/icons/SocialIcons";
import Jersey from "../atoms/texts/Jersey";
import SpaceText from "../atoms/texts/SpaceText";
import { useLanguage } from "@/context/LanguageContext";

interface FooterProps {
  variant?: "light" | "dark";
}

export default function Footer({ variant = "light" }: FooterProps) {
  const { t } = useLanguage();
  const isDark = variant === "dark";
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={`w-full ${isDark ? "bg-black border-white/20" : "bg-nav-bg border-black"} border-t-[3px] py-10 md:py-16 mt-20 md:mt-32 z-40 relative overflow-hidden`}
    >
      {/* Fondo decorativo con logo BUNNIES CLUB */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden">
        <span
          className={`font-jersey text-[8rem] md:text-[14rem] leading-none ${isDark ? "text-white" : "text-black"} whitespace-nowrap font-bold tracking-tighter`}
        >
          {t.footer.title || "BUNNIES CLUB"}
        </span>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div
                className={`w-6 h-6 ${isDark ? "bg-white" : "bg-black"} animate-pulse`}
              />
              <Jersey
                tag="span"
                text={t.footer.system_name}
                size="32|40"
                className={`${isDark ? "text-white" : "text-black"} font-bold`}
              />
            </div>

            <div className="flex flex-col gap-5">
              <SpaceText
                text={t.footer.description}
                size="18|22"
                className={`${isDark ? "text-white" : "text-black"} font-bold leading-tight uppercase`}
              />

              <div className="flex flex-col gap-4">
                <SpaceText
                  text={t.footer.about_1}
                  size="16|16"
                  className={`${isDark ? "text-white" : "text-black"} font-medium leading-relaxed`}
                />

                <SpaceText
                  text={t.footer.about_2}
                  size="12|12"
                  className={`${isDark ? "text-white/80" : "text-black/80"} max-w-[600px] leading-snug`}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-10 items-start md:items-end justify-start">
            <div className="flex flex-col gap-4 items-start md:items-end">
              <Jersey
                tag="h4"
                text={t.footer.external_links}
                size="20|24"
                className={`${isDark ? "text-white" : "text-black"} font-bold underline decoration-pink-500 underline-offset-8`}
              />
              <div className="flex gap-4">
                {[
                  {
                    icon: <IconInstagram className="w-6 h-6" />,
                    key: "ig",
                    href: "https://www.instagram.com/newjeans_official/",
                  },
                  {
                    icon: <IconSpotify className="w-6 h-6" />,
                    key: "spotify",
                    href: "https://open.spotify.com/intl-es/artist/6HvZYsbFfjnjFrWF950C9d?si=oQgVc1_jQoSybMp7ou3krQ",
                  },
                  {
                    icon: <IconX className="w-6 h-6" />,
                    key: "x",
                    href: "https://twitter.com/NewJeans_ADOR",
                  },
                  {
                    icon: <IconFacebook className="w-6 h-6" />,
                    key: "fb",
                    href: "https://www.facebook.com/official.newjeans/",
                  },
                ].map((item) => (
                  <Link key={item.key} href={item.href} target="_blank">
                    <motion.div
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: isDark ? "#222" : "#FFF",
                      }}
                      whileTap={{ x: 4, y: 4, boxShadow: "0px 0px 0px #000" }}
                      transition={{ duration: 0.1 }}
                      className={`w-12 h-12 ${isDark ? "bg-white/10 border-white/40" : "bg-white border-black"} border-[3px] flex items-center justify-center shadow-v2k-sm cursor-pointer ${isDark ? "text-white" : "text-black"}`}
                    >
                      {item.icon}
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-5 w-full">
              <div
                className={`flex flex-col items-start md:items-end border-l-4 md:border-l-0 md:border-r-4 ${isDark ? "border-white/20" : "border-black"} pl-4 md:pl-0 md:pr-4 py-1`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                  <Jersey
                    tag="span"
                    text={t.footer.status_online}
                    size="14|14"
                    className={`${isDark ? "text-green-400" : "text-black"} font-bold`}
                  />
                </div>
                <Jersey
                  tag="span"
                  text={`${t.footer.last_update}: 2026.02.19`}
                  size="12|12"
                  className={`${isDark ? "text-white/60" : "text-black opacity-60"}`}
                />
              </div>

              <div className="flex flex-col items-start md:items-end gap-8">
                <motion.button
                  onClick={scrollToTop}
                  initial={{
                    backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "#FFF",
                    color: isDark ? "#FFF" : "#000",
                  }}
                  whileHover={{
                    backgroundColor: isDark ? "#FFF" : "#000",
                    color: isDark ? "#000" : "#FFF",
                    scale: 1.05,
                  }}
                  whileTap={{ x: 4, y: 4, boxShadow: "0px 0px 0px #000" }}
                  transition={{ duration: 0.1, ease: "linear" }}
                  className={`px-8 py-2 border-[3px] ${isDark ? "border-white/40" : "border-black"} shadow-v2k-sm flex items-center justify-center group`}
                >
                  <Jersey tag="span" text={t.footer.back_to_top} size="14|14" />
                </motion.button>

                <div className="flex flex-col items-start md:items-end gap-1.5">
                  <SpaceText
                    text={t.footer.contact}
                    size="14|14"
                    className={`${isDark ? "text-white/50" : "text-black opacity-50"} uppercase tracking-widest font-bold`}
                  />
                  <a
                    href="mailto:contact.bunnies.dev@gmail.com"
                    className="hover:text-pink-600 transition-colors duration-200"
                  >
                    <SpaceText
                      text="contact.bunnies.dev@gmail.com"
                      size="14|14"
                      className={`${isDark ? "text-white" : "text-black"} font-bold lowercase tracking-tighter underline underline-offset-4 decoration-black/10`}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`pt-8 border-t-[3px] ${isDark ? "border-white/20" : "border-black"} flex flex-col md:flex-row justify-between items-center gap-8`}
        >
          <div className="flex flex-col items-center md:items-start">
            {isDark ? (
              <SpaceText
                text={t.footer.copyright}
                size="12|12"
                className="text-white font-bold tracking-tight"
              />
            ) : (
              <Jersey
                tag="p"
                text={t.footer.copyright}
                size="14|14"
                className="text-black font-bold tracking-tight"
              />
            )}
            <SpaceText
              text={t.footer.stable_version}
              size="12|12"
              className={`${isDark ? "text-white/40" : "text-black/50"}`}
            />
          </div>

          <div className="flex gap-8">
            <Link href="/privacy">
              {isDark ? (
                <SpaceText
                  text={t.footer.privacy}
                  size="12|12"
                  className="text-white/60 cursor-pointer hover:text-white hover:underline transition-all"
                />
              ) : (
                <Jersey
                  tag="span"
                  text={t.footer.privacy}
                  size="12|12"
                  className="text-black opacity-60 cursor-pointer hover:opacity-100 hover:underline transition-all"
                />
              )}
            </Link>
            <Link href="/terms">
              {isDark ? (
                <SpaceText
                  text={t.footer.terms}
                  size="12|12"
                  className="text-white/60 cursor-pointer hover:text-white hover:underline transition-all"
                />
              ) : (
                <Jersey
                  tag="span"
                  text={t.footer.terms}
                  size="12|12"
                  className="text-black opacity-60 cursor-pointer hover:opacity-100 hover:underline transition-all"
                />
              )}
            </Link>
            <Link href="/copyright">
              {isDark ? (
                <SpaceText
                  text={t.footer.copyright_info}
                  size="12|12"
                  className="text-white/60 cursor-pointer hover:text-white hover:underline transition-all"
                />
              ) : (
                <Jersey
                  tag="span"
                  text={t.footer.copyright_info}
                  size="12|12"
                  className="text-black opacity-60 cursor-pointer hover:opacity-100 hover:underline transition-all"
                />
              )}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
