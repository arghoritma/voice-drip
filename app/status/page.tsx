/* eslint-disable @next/next/no-img-element */
import React from "react";
import { getTopPlatforms, getTrendingRequests } from "@/actions/analystic";
import { PlatformProps, TrendingRequestProps } from "@/types";

export default async function Page() {
  const topPlatformsResponse = await getTopPlatforms();
  const trendingRequestsResponse = await getTrendingRequests();
  const { data: topPlatforms } = topPlatformsResponse as {
    data: PlatformProps[];
  };
  const { data: trendingRequests } = trendingRequestsResponse as {
    data: TrendingRequestProps[];
  };

  return (
    <div className="p-4 md:hidden">
      <div>
        <h3 className="font-bold text-xl mb-4">Platform Feedback Stats</h3>
        <div className="space-y-3">
          {topPlatforms.map((platform: PlatformProps) => (
            <div
              key={platform.id}
              className="flex items-center gap-3 p-4 border-b"
            >
              <img
                src={platform.logo}
                alt={platform.name}
                className="w-10 h-10"
              />
              <div className="flex-1">
                <p className="font-semibold text-lg">{platform.name}</p>
                <div className="flex flex-wrap gap-3 text-sm text-base-content/70 mt-1">
                  <span>🔄 {platform.total_requests}</span>
                  <span>⭐ {platform.total_votes}</span>
                  <span>👥 {platform.total_users}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="font-bold text-xl mt-8 mb-4">Trending Requests</h3>
        <div className="space-y-3">
          {trendingRequests.map((request: TrendingRequestProps) => (
            <div key={request.id} className="p-4 border-b">
              <div className="flex justify-between items-start gap-2">
                <p className="font-semibold text-lg">{request.title}</p>
                <span className="badge badge-primary">{request.status}</span>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-base-content/70 mt-3">
                <span>⭐ {request.vote_count}</span>
                <span>💬 {request.comment_count}</span>
                <span className="badge badge-ghost">{request.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
