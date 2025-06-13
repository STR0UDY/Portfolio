"use client";
import React from "react";

interface CardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  imageUrl?: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, icon, imageUrl, className = "" }) => {
  return (
    <div className={`relative group ${className} min-h-[250px]`}>
      {/* Card content with glassmorphism and strong contrast */}
      <div className="h-full relative bg-black/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10 hover:border-white/20 hover:bg-black/80">
        {icon && (
          <div className="mb-4 p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white text-3xl shadow-lg">
            {icon}
          </div>
        )}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="mb-4 w-20 h-20 object-cover rounded-full border-3 border-blue-500 shadow-xl"
          />
        )}
        <h3 className="text-xl font-bold mb-3 text-white drop-shadow-lg">{title}</h3>
        <div className="text-gray-200 text-sm leading-relaxed font-medium">{children}</div>
      </div>
    </div>
  );
};

export default Card;