import * as React from "react";
// Mengimpor gambar dari folder assets (naik 2 level dari src/component/Skill)
import CharacterImg from "../../assets/Character.png";

const Character = (props: React.SVGProps<SVGImageElement>) => {
  return (
    <image
      href={CharacterImg}
      // Koordinat sesuai elemen <rect> asli
      x={998}
      y={210}
      width={257}
      height={363.345}
      // preserveAspectRatio="none" akan memaksa gambar memenuhi kotak (bisa gepeng).
      // Ubah ke "xMidYMid meet" jika ingin mempertahankan rasio asli gambar.
      preserveAspectRatio="none" 
      
      // Anda bisa menambahkan class Tailwind v4.1 di sini untuk efek (misal: hover)      
      {...props}
    />
  );
};

export default Character;