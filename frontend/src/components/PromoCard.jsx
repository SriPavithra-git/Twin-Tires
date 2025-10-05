// PromoCard.jsx
import React from "react";

export default function PromoCard({ promo = {}, onWishlist = () => {} }) {
  return (
    <div className="flex items-stretch gap-2 rounded-[10px] border border-[rgba(255,103,20,0.12)] bg-[#111] p-0 text-white shadow-[0_6px_18px_rgba(0,0,0,0.06)]">
      {/* Media */}
      <div className="relative w-[120px] shrink-0 overflow-hidden rounded-l-[10px]">
        <img
          src={promo.img}
          alt={promo.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        {promo.drop && (
          <div className="absolute left-2 top-2 rounded-md bg-[#ff6600] px-2 py-1 text-[12px] font-extrabold text-white">
            {promo.drop}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col justify-center gap-2 p-3">
        <div className="flex items-center justify-between gap-3">
          <h4 className="m-0 line-clamp-1 text-[15px] font-semibold">{promo.title}</h4>
          {promo.price && (
            <div className="text-[16px] font-extrabold text-[#ffcc00]">
              {promo.price}
            </div>
          )}
        </div>

        <div className="mt-1 flex flex-wrap gap-2">
          <button
            onClick={onWishlist}
            className="rounded-md border-2 border-[#ff6600] px-3 py-1.5 text-[14px] font-semibold text-[#ff6600] transition hover:-translate-y-0.5 hover:bg-[#ff6600] hover:text-white hover:shadow-[0_4px_10px_rgba(255,102,0,0.4)]"
          >
            Wishlist
          </button>
          <button className="rounded-md bg-[linear-gradient(180deg,#ff9a1a,#ff6600)] px-3 py-1.5 text-[14px] font-bold text-[#111] shadow-[0_6px_16px_rgba(255,140,0,0.12)] transition hover:brightness-105">
            View
          </button>
        </div>
      </div>
    </div>
  );
}
