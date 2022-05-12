import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../Loading";

interface ScreenshotButtonProps {
   screenshot: string | null;
   onScreenshotTook: (screenshot: string | null) => void;
}

export function ScreenshotButton({
   screenshot,
   onScreenshotTook
}: ScreenshotButtonProps) {
   const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

   async function handleTakenScreenshot() {
      setIsTakingScreenshot(true);

      const canvas = await html2canvas(document.querySelector('html')!);/* vai tirar uma print da tela */
      const base64image = canvas.toDataURL('image/png');/* vai converter a imagem para formato de texto */

      onScreenshotTook(base64image);
      setIsTakingScreenshot(false);
   }

   if (screenshot) {
      return (
         <button
            type="button"
            className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
            onClick={() => onScreenshotTook(null)}
            style={{
               backgroundImage: `url(${screenshot})`,
               /* vai tirar printe do quanto direito inferior da tela, caso eu quiser a tela toda é só tirar esta duas propriedade abaixo */
               backgroundPosition: 'right bottom',
               backgroundSize: 180
            }}
         >
            <Trash weight="fill" />
         </button>
      )
   }

   return (
      <button
         type="button"
         onClick={handleTakenScreenshot}
         className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
      >
         {/* Se clicar para tirar a printe mostra o Loading, se não tiver mostra o icone */}
         {isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6" />}
      </button>
   )
}