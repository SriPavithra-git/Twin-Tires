import React from "react";

export default function BikeCard({ bike, toggleWishlist, inWishlist, onBook }) {
  return (
    <article className="flex min-h-[340px] flex-col overflow-hidden rounded-[12px] border border-[rgba(255,102,0,0.06)] bg-[linear-gradient(180deg,#0f0f0f,#141414)] shadow-[0_12px_30px_rgba(0,0,0,0.5)] transition-transform duration-200 hover:-translate-y-1.5 hover:shadow-[0_28px_50px_rgba(0,0,0,0.6)]">
      {/* media */}
      <div className="h-48 w-full bg-black/70 sm:h-52">
        <img
          src={bike.image}
          alt={bike.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col gap-2 px-4 py-3 text-[#dddddd]">
        <h3 className="m-0 text-[18px] font-semibold text-[#ff6600]">
          {bike.name}
        </h3>

        <div className="text-[13px] text-[#bdbdbd]">
          {bike.year} • {bike.kms} • {bike.city}
        </div>

        <div className="mt-1 text-[18px] font-extrabold text-[#ffcc00]">
          {bike.price}
        </div>

        {/* actions */}
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={onBook}
            className="w-full rounded-md bg-[linear-gradient(180deg,#ff9a1a,#ff6600)] px-4 py-2.5 font-bold text-[#111] shadow-[0_6px_16px_rgba(255,140,0,0.12)] transition hover:brightness-105 sm:w-auto"
          >
            Book Test Ride
          </button>

          <button
            onClick={toggleWishlist}
            className={
              inWishlist
                ? "w-full rounded-md bg-[linear-gradient(180deg,#ff9a1a,#ff6600)] px-4 py-2.5 font-bold text-[#111] shadow-[0_6px_16px_rgba(255,140,0,0.12)] transition hover:brightness-105 sm:w-auto"
                : "w-full rounded-md border-2 border-[#ff6600] px-4 py-2.5 font-semibold text-[#ff6600] transition hover:-translate-y-0.5 hover:bg-[#ff6600] hover:text-white hover:shadow-[0_4px_10px_rgba(255,102,0,0.4)] sm:w-auto"
            }
          >
            {inWishlist ? "Wishlisted" : "Add to Wishlist"}
          </button>
        </div>
      </div>
    </article>
  );
}
