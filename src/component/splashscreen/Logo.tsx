import * as React from "react";
// Pastikan path import gambar benar
import LogoBg from "../../assets/Logobg.png";

// Definisi tipe props agar bisa menerima fungsi callback
interface LogoProps extends React.SVGProps<SVGSVGElement> {
  onFinish?: () => void; // Fungsi opsional untuk dipanggil setelah animasi selesai
}

const Logo = ({ onFinish, ...props }: LogoProps) => {
  
  // LOGIKA TIMER: Pindah halaman setelah 3 detik
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (onFinish) {
        onFinish();
      }
    }, 3000); // 3000ms = 3 detik (Sesuai durasi animasi CSS)

    return () => clearTimeout(timer); // Bersihkan timer jika komponen di-unmount
  }, [onFinish]);

  return (
    <svg
      width={206}
      height={206}
      viewBox="0 0 206 206"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <style>
        {`
          /* Animasi Menggambar (3 detik) */
          @keyframes drawStroke {
            0% { stroke-dashoffset: 1000; fill-opacity: 0; }
            60% { stroke-dashoffset: 0; fill-opacity: 0; }
            100% { stroke-dashoffset: 0; fill-opacity: 1; }
          }

          /* Animasi Floating (Hiasan) */
          @keyframes float {
            0%, 100% { transform: translate(68.67px, 51.5px) scale(0.3333, 0.5); }
            50% { transform: translate(68.67px, 45px) scale(0.3333, 0.5); }
          }

          .animated-logo-path {
            stroke: #F0FDFF;
            stroke-width: 2;
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            fill: #F0FDFF;
            fill-opacity: 0;
            /* Durasi animasi 3s -> Sinkron dengan timer useEffect */
            animation: drawStroke 3s ease-in-out forwards;
          }

          .floating-group {
            /* Posisi default di tengah */
            transform: translate(68.67px, 51.5px) scale(0.3333, 0.5);
            /* Mulai floating setelah draw selesai (opsional) */
            animation: float 6s ease-in-out 3s infinite;
          }
        `}
      </style>

      {/* Background Image */}
      <image
        href={LogoBg}
        width="206"
        height="206"
        x="0"
        y="0"
        preserveAspectRatio="none"
      />

      {/* Grup Path dengan Animasi */}
      <g className="floating-group">
        <path
          className="animated-logo-path"
          style={{ animationDelay: "0s" }}
          d="M43.9831 0.680729C23.5187 4.33963 7.05364 19.4858 1.86309 39.3971C-0.00891066 46.5873 -0.136547 50.7993 0.0761803 106.576C0.203817 157.801 0.246362 158.992 1.09727 162.949C5.81982 184.264 20.966 199.453 42.494 204.473C45.302 205.112 48.8758 205.239 71.8929 205.367C95.7184 205.537 98.186 205.495 98.8242 204.856C99.4624 204.218 99.5049 196.007 99.5049 102.917C99.5049 33.9087 99.3773 1.404 99.0795 0.808369C98.654 0.0425453 97.9307 3.8147e-06 72.9991 0.0425453C52.7475 0.0850868 46.6635 0.212727 43.9831 0.680729ZM82.4867 102.79V188.987L65.1707 188.774C49.2162 188.604 47.5144 188.519 44.3235 187.711C30.6238 184.179 73.7589 136.202 70.9083 122.46C69.9723 118.163 13.049 79.1162 15.9083 61.9603C17.9083 49.9603 28.4115 23.6553 39.6009 19.188C45.2169 16.9331 47.8122 16.6778 66.0216 16.6353L82.4867 16.5927V102.79Z"
        />
        <path
          className="animated-logo-path"
          style={{ animationDelay: "0.2s" }}
          d="M47.6419 42.588C44.9616 43.0986 40.8772 45.1407 38.7074 47.0553C34.2401 50.9269 32.0277 56.4153 32.3681 62.8822C32.5383 66.2433 32.751 67.1367 34.1125 69.8596C36.1121 73.9866 39.1328 77.0073 43.2597 79.0495C46.1103 80.4535 46.8336 80.6236 50.535 80.7513C53.8961 80.8789 55.0874 80.7513 57.3423 79.9855C66.5747 76.8796 72.1481 67.9026 70.5739 58.7127C68.7445 47.7786 58.3634 40.4607 47.6419 42.588Z"
        />
        <path
          className="animated-logo-path"
          style={{ animationDelay: "0.4s" }}
          d="M120.224 0.297825C120.054 0.425465 119.927 46.5447 119.927 102.79C119.927 195.581 119.969 204.984 120.607 205.239C121.756 205.665 154.771 205.495 158.856 205.069C176.129 203.112 191.36 192.603 199.657 176.989C200.72 174.989 147.186 157.045 147.909 154.96C150.589 146.962 205.443 163.672 205.443 102.535C205.443 53.7349 205.358 46.4596 204.762 43.3538C200.55 21.1876 183.66 4.46727 161.451 0.638187C158.473 0.127644 153.878 3.8147e-06 139.072 3.8147e-06C128.861 3.8147e-06 120.352 0.127644 120.224 0.297825ZM165.663 92.9618C172.3 94.7062 177.746 99.7691 179.958 106.236C181.362 110.235 181.32 116.107 179.916 119.765C177.32 126.488 172.215 131.21 165.663 132.955C155.027 135.72 143.71 129.296 140.604 118.744C139.668 115.511 139.71 110.065 140.774 106.747C143.965 96.3229 155.027 90.1964 165.663 92.9618Z"
        />
      </g>
    </svg>
  );
};

export default Logo;