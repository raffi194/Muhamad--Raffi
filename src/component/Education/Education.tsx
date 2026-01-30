import React from "react";
import DetailEducation from "./DetailEducation";
import Directions from "../Directions";

const Education = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <>
      {/* Komponen SVG Utama */}
      <DetailEducation {...props} />

      <foreignObject x={0} y={0} width={2645} height={1480}>
        <div className="w-full h-full relative">
          <div className="scale-120 bg-white/20 backdrop-blur-md border border-white/30 shadow-lg p-2 rounded-4xl -translate-y-8 pointer-events-none absolute bottom-0 translate-x-175 z-">
            <Directions />
          </div>
        </div>
      </foreignObject>
    </>
  );
};

export default Education;