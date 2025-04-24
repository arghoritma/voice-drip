"use server";

import db from "@/services/db";
import { PlatformProps } from "@/types";
import { TrendingRequestProps } from "@/types";

export async function getTopPlatforms(): Promise<
  { succes: boolean; data: PlatformProps[] } | { error: Error }
> {
  try {
    const topPlatforms = await db("platforms")
      .select([
        "platforms.id",
        "platforms.name",
        "platforms.logo",
        db.raw("COUNT(DISTINCT requests.id) as total_requests"),
        db.raw("COUNT(DISTINCT votes.id) as total_votes"),
        db.raw("COUNT(DISTINCT requests.user_id) as total_users"),
      ])
      .leftJoin("requests", "platforms.id", "requests.platform_id")
      .leftJoin("votes", "requests.id", "votes.request_id")
      .groupBy("platforms.id", "platforms.name")
      .orderBy([
        { column: "total_requests", order: "desc" },
        { column: "total_votes", order: "desc" },
      ])
      .limit(3);

    return {
      succes: true,
      data: topPlatforms,
    };
  } catch (error) {
    return {
      succes: false,
      error: error as Error,
    };
  }
}

export async function getTrendingRequests(): Promise<
  { succes: boolean; data: TrendingRequestProps[] } | { error: Error }
> {
  try {
    const trendingRequests = await db("requests")
      .select([
        "requests.id",
        "requests.title",
        "requests.description",
        "requests.type",
        "requests.status",
        "requests.created_at",
        "platforms.name as platform_name",
        db.raw("COUNT(DISTINCT votes.id) as vote_count"),
        db.raw("COUNT(DISTINCT comments.id) as comment_count"),
      ])
      .leftJoin("platforms", "requests.platform_id", "platforms.id")
      .leftJoin("votes", "requests.id", "votes.request_id")
      .leftJoin("comments", "requests.id", "comments.request_id")
      .groupBy(
        "requests.id",
        "requests.title",
        "requests.description",
        "requests.type",
        "requests.status",
        "requests.created_at",
        "platforms.name"
      )
      .orderBy([
        { column: "vote_count", order: "desc" },
        { column: "comment_count", order: "desc" },
        { column: "requests.created_at", order: "desc" },
      ])
      .limit(5);

    return {
      succes: true,
      data: trendingRequests,
    };
  } catch (error) {
    return {
      succes: false,
      error: error as Error,
    };
  }
}
