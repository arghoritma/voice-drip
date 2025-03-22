/* eslint-disable @next/next/no-img-element */
import React from "react";
import { getTopPlatforms, getTrendingRequests } from "@/actions/analystic";
import { PlatformProps, TrendingRequestProps } from "@/types";

export default async function RightSideBar() {
  const topPlatformsResponse = await getTopPlatforms();
  const trendingRequestsResponse = await getTrendingRequests();
  const { data: topPlatforms } = topPlatformsResponse as {
    data: PlatformProps[];
  };
  const { data: trendingRequests } = trendingRequestsResponse as {
    data: TrendingRequestProps[];
  };

  return (
    <div className="hidden md:block md:col-span-3">
      <div className="card bg-base-100  sticky top-20">
        <div className="card-body">
          <h3 className="font-bold text-lg">Platform Feedback Stats</h3>
          <div className="space-y-4 mt-2">
            {topPlatforms.map((platform: PlatformProps) => (
              <div
                key={platform.id}
                className="flex items-center gap-3 p-3 bg-base-200 rounded-lg"
              >
                <img
                  src={platform.logo}
                  alt={platform.name}
                  className="w-8 h-8"
                />
                <div className="flex-1">
                  <p className="font-semibold">{platform.name}</p>
                  <div className="flex gap-4 text-sm text-base-content/70">
                    <span>🔄 {platform.total_requests} requests</span>
                    <span>⭐ {platform.total_votes} votes</span>
                    <span>👥 {platform.total_users} users</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-bold text-lg mt-6">Trending Requests</h3>
          <div className="space-y-4 mt-2">
            {trendingRequests.map((request: TrendingRequestProps) => (
              <div key={request.id} className="p-3 bg-base-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <p className="font-semibold">{request.title}</p>
                  <span className="badge badge-sm">{request.status}</span>
                </div>
                <div className="flex gap-4 text-sm text-base-content/70 mt-2">
                  <span>⭐ {request.vote_count} votes</span>
                  <span>💬 {request.comment_count} comments</span>
                  <span className="badge badge-ghost badge-sm">
                    {request.type}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* <h3 className="font-bold text-lg mt-6">Trending Tags</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="badge badge-primary">#Feature</div>
            <div className="badge badge-secondary">#Bug</div>
            <div className="badge badge-accent">#Improvement</div>
            <div className="badge badge-ghost">#Enhancement</div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
