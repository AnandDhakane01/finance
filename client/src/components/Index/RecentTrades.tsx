import React from "react";

export default function RecentTrades() {
    return (
        <div className="text-sm">
            <p>
                <span className="bg-purple-600 rounded-full py-1 px-2 uppercase">
                    Bought
                </span>
                &nbsp;&nbsp;
                <span className="uppercase text-gray-500">
                    19 OCTOBER, 5:34 PM
                </span>
            </p>
            <p className="mt-2">9.822 DESP shares for $36.50 per share, $358,503 total</p>
        </div>
    );
}
