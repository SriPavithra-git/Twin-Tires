import React from "react";

export default function BikeCard({ bike, toggleWishlist, inWishlist, onBook }) {
  return (
    <article className="bg-[#151515] border border-[rgba(255,136,0,0.06)] rounded-xl overflow-hidden shadow-[0_8px_28px_rgba(0,0,0,0.55)] flex flex-col justify-between transition hover:-translate-y-1.5 hover:shadow-[0_18px_42px_rgba(0,0,0,0.6)]">
      {/* image */}
      <div className="w-full h-[220px] bg-[#0f0f0f]">
        <img
          src={bike.image}
          alt={bike.name}
          className="w-full h-full object-cover block"
        />
      </div>

      {/* body */}
      <div className="p-4 flex flex-col gap-2 text-[#e6e6e6] flex-auto">
        <h3 className="m-0 text-[#ffa500] text-[1.05rem] font-semibold">
          {bike.name}
        </h3>

        <div className="text-sm text-gray-400">
          {bike.year} • {bike.kms} • {bike.city}
        </div>

        <div className="text-[#ffb84d] text-lg font-bold">{bike.price}</div>

        {/* actions */}
        <div className="flex gap-3 justify-center p-3 border-t border-[rgba(255,255,255,0.05)]">
          <button
            onClick={onBook}
            className="rounded-lg font-bold bg-gradient-to-b from-[#ffb84d] to-[#ff9a1a] text-black px-4 py-2 shadow-[0_6px_16px_rgba(255,140,0,0.12)] transition hover:-translate-y-0.5"
          >
            Book Test Ride
          </button>

          <button
            onClick={toggleWishlist}
            className={`rounded-lg font-bold px-4 py-2 border transition ${
              inWishlist
                ? "bg-[#ffa500] text-black border-[rgba(255,165,0,0.2)] shadow-[0_6px_16px_rgba(255,140,0,0.12)]"
                : "bg-[#222] text-[#ffa500] border-[rgba(255,165,0,0.1)] hover:-translate-y-0.5"
            }`}
          >
            {inWishlist ? "Wishlisted" : "Add to Wishlist"}
          </button>
        </div>
      </div>
    </article>
  );
}
