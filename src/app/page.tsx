import SectionLayout from "../components/Sectionlayout"; 
import Jersey from "../components/atoms/texts/Jersey";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <SectionLayout>
        <div className="flex flex-col gap-8 py-20">
          
          {/* Prueba 1: Título Gigante (Tamaño máximo de tu mapa) */}
          <Jersey 
            tag="h1" 
            text="BUNNIES CLUB" 
            size="68|94" 
            className="text-pink-500 text-center"
          />

          {/* Prueba 2: Subtítulo con HTML (Para probar DOMPurify) */}
          <Jersey 
            tag="p" 
            text="SISTEMA OPERATIVO <span style='color: #00ff00'>VERSIÓN 1.0</span>" 
            size="20|24" 
            className="text-white text-center"
          />

          {/* Prueba 3: Párrafo estándar */}
          <Jersey 
            tag="p" 
            text="Si ves esto con estilo retro pixelado, la fuente Jersey 10 está funcionando correctamente." 
            size="16|16" 
            className="text-gray-400 text-center"
          />

        </div>
      </SectionLayout>
    </main>
  );
}