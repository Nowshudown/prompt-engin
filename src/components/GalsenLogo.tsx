import { SVGProps } from "react";

interface GalsenLogoProps extends SVGProps<SVGSVGElement> {
  showText?: boolean;
  textSize?: "sm" | "md" | "lg" | "xl";
  variant?: "light" | "dark";
  className?: string;
}

export default function GalsenLogo({ 
  showText = true, 
  textSize = "md", 
  variant = "dark",
  className = "",
  ...props 
}: GalsenLogoProps) {
  // Nodes layout of the lion head from the authentic logo
  const lionNodes = [
    // Forehead & Crown
    { id: 1, x: 230, y: 70 },
    { id: 2, x: 270, y: 110 },
    { id: 3, x: 210, y: 120 },
    
    // Nose / Snout
    { id: 4, x: 310, y: 150 },
    { id: 5, x: 375, y: 195 },
    { id: 6, x: 390, y: 315 },
    { id: 7, x: 410, y: 350 },
    
    // Eye & Cheek
    { id: 8, x: 290, y: 220 },
    { id: 9, x: 335, y: 200 },
    { id: 10, x: 345, y: 275 },
    { id: 11, x: 370, y: 410 },
    
    // Jaw & Lower Face
    { id: 12, x: 315, y: 395 },
    { id: 13, x: 295, y: 470 },
    { id: 14, x: 335, y: 530 },
    
    // Mane Outer Left / Back of head
    { id: 15, x: 120, y: 150 },
    { id: 16, x: 160, y: 110 },
    { id: 17, x: 110, y: 230 },
    { id: 18, x: 150, y: 210 },
    { id: 19, x: 80, y: 320 },
    { id: 20, x: 145, y: 320 },
    { id: 21, x: 75, y: 450 },
    { id: 22, x: 135, y: 450 },
    { id: 23, x: 145, y: 505 },
    { id: 24, x: 190, y: 560 },
    { id: 25, x: 245, y: 580 },
    
    // Back neck outer
    { id: 26, x: 210, y: 615 },
    { id: 27, x: 285, y: 640 },
    { id: 28, x: 350, y: 560 },
    { id: 29, x: 370, y: 520 },
    { id: 30, x: 390, y: 475 },
    { id: 31, x: 420, y: 450 }
  ];

  // Connections (connected nodes) mimicking the neural net lion head
  const connections = [
    [1, 2], [1, 3], [1, 15], [1, 16],
    [2, 3], [2, 4], [2, 9],
    [3, 15], [3, 18], [3, 8],
    [4, 9], [4, 5],
    [5, 9], [5, 10], [5, 6],
    [6, 10], [6, 7], [6, 31],
    [7, 31], [7, 30],
    [8, 18], [8, 10], [8, 11], [8, 12],
    [9, 10],
    [10, 11], [10, 12],
    [11, 12], [11, 29], [11, 30],
    [12, 13], [12, 28],
    [13, 14], [13, 23], [13, 25],
    [14, 25], [14, 27], [14, 28],
    [15, 16], [15, 17], [15, 18],
    [17, 18], [17, 19], [17, 20],
    [19, 20], [19, 21], [19, 22],
    [21, 22], [21, 23],
    [23, 22], [23, 24],
    [24, 25], [24, 26], [24, 27],
    [26, 27],
    [27, 28],
    [29, 30]
  ];

  const strokeColor = "#10b981"; // Vibrant green line
  const nodeColor = "#10b981";   // Vibrant green nodes

  // Text sizes
  const titleSizes = {
    sm: "text-lg",
    md: "text-2xl sm:text-3xl",
    lg: "text-4xl sm:text-5xl",
    xl: "text-5xl sm:text-7xl lg:text-8xl"
  };

  const subtitleSizes = {
    sm: "text-[9px]",
    md: "text-xs sm:text-sm",
    lg: "text-sm sm:text-base",
    xl: "text-lg sm:text-2xl"
  };

  const textCol = "text-slate-100";

  return (
    <div className={`flex items-center gap-4 select-none ${className}`}>
      {/* Icon Lion Constance */}
      <svg
        viewBox="50 50 400 610"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 sm:w-20 sm:h-20 shrink-0"
        {...props}
      >
        {/* Draw Line Connections */}
        {connections.map(([from, to], i) => {
          const nFrom = lionNodes.find(n => n.id === from);
          const nTo = lionNodes.find(n => n.id === to);
          if (!nFrom || !nTo) return null;
          return (
            <line
              key={i}
              x1={nFrom.x}
              y1={nFrom.y}
              x2={nTo.x}
              y2={nTo.y}
              stroke={strokeColor}
              strokeWidth="4"
              strokeOpacity="0.85"
            />
          );
        })}

        {/* Draw Circular Nodes */}
        {lionNodes.map(node => (
          <circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r="11"
            fill={nodeColor}
            stroke="#111827"
            strokeWidth="2.5"
            className="transition-transform duration-300 hover:scale-[1.3]"
          />
        ))}
      </svg>

      {showText && (
        <div className="flex flex-col text-left">
          {/* Main Title "GALSEN AI" */}
          <span className={`font-sans tracking-[-0.035em] font-extrabold leading-none ${titleSizes[textSize]} ${textCol}`}>
            GALSEN <span className="text-emerald-400">AI</span>
          </span>
          {/* Tagline "AI for everyone" matching Galsen AI's real logo */}
          <span className={`font-sans font-medium text-slate-400 mt-1 tracking-[-0.01em] ${subtitleSizes[textSize]}`}>
            AI for everyone
          </span>
        </div>
      )}
    </div>
  );
}
