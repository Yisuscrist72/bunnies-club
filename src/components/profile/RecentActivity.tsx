"use client";

import SpaceText from "@/components/atoms/texts/SpaceText";
import ProfileSection from "./ProfileSection";

interface Activity {
  id: string;
  text: string;
  timestamp: number | string | Date;
  points?: number;
}

interface RecentActivityProps {
  activities?: Activity[];
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <ProfileSection title="ACTIVIDAD RECIENTE 🕒" titleUnderlineColor="decoration-v2k-cyan-soft">
      <div className="space-y-3">
        {activities && activities.length > 0 ? (
          activities.map((activity) => (
            <div 
              key={activity.id} 
              className="flex items-center justify-between p-3 border-2 border-black rounded-xl bg-v2k-gray-soft/10 hover:bg-v2k-cyan-soft/5 transition-colors"
            >
              <div className="flex flex-col">
                <SpaceText text={activity.text} size="14|14" className="font-bold text-black" />
                <span className="text-[10px] text-gray-400 font-bold uppercase">
                  {new Date(activity.timestamp).toLocaleDateString('es-ES', { 
                    day: '2-digit', 
                    month: 'short', 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
              {activity.points && (
                <div className="bg-v2k-pink-hot text-white px-3 py-1 border-2 border-black rounded-full text-[10px] font-black shadow-[2px_2px_0px_#000]">
                  +{activity.points} XP
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="py-8 text-center border-2 border-dashed border-black/20 rounded-2xl bg-v2k-gray-soft/5">
            <SpaceText text="Aún no tienes actividad registrada. ¡Empieza a explorar el club!" size="14|14" className="text-gray-400 italic" />
          </div>
        )}
      </div>
    </ProfileSection>
  );
}
